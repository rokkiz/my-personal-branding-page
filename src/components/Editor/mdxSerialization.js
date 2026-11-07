import { unified } from 'unified';
import remarkDirective from 'remark-directive';
import remarkMdx from 'remark-mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';

const opaqueNodeTypes = new Set([
  'mdxFlowExpression',
  'mdxJsxFlowElement',
  'mdxJsxTextElement',
  'mdxTextExpression',
  'mdxjsEsm',
  'containerDirective',
  'leafDirective',
  'toml',
  'textDirective',
  'yaml',
]);
const blockNodeTypes = new Set([
  'containerDirective',
  'leafDirective',
  'mdxFlowExpression',
  'mdxJsxFlowElement',
  'mdxjsEsm',
  'toml',
  'yaml',
]);

const currentIslandSources = new Map();
const MAX_SOURCES_CACHE = 5000;

export function getMdxIslandSource(placeholder) {
  if (!placeholder || typeof placeholder !== 'string') return undefined;
  return currentIslandSources.get(placeholder.trim());
}

export function protectMdxSource(source) {
  const tree = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkDirective)
    .use(remarkFrontmatter, ['yaml', 'toml'])
    .parse(source);
  const nodes = [];

  function collect(node) {
    if (opaqueNodeTypes.has(node.type) && node.position) {
      nodes.push({
        type: node.type,
        start: node.position.start.offset,
        end: node.position.end.offset,
        raw: source.slice(node.position.start.offset, node.position.end.offset),
      });
      return;
    }

    for (const child of node.children || []) collect(child);
  }

  collect(tree);
  const nonce = Math.random().toString(36).slice(2, 10);
  let markdown = source;
  const islands = [];

  if (currentIslandSources.size > MAX_SOURCES_CACHE) {
    const keysToDelete = Array.from(currentIslandSources.keys()).slice(
      0,
      currentIslandSources.size - 2500,
    );
    for (const key of keysToDelete) {
      currentIslandSources.delete(key);
    }
  }

  nodes
    .sort((left, right) => right.start - left.start)
    .forEach((node, index) => {
      const prefix = blockNodeTypes.has(node.type) ? 'MDXBLOCK' : 'MDXINLINE';
      const placeholder = `${prefix}_${nonce}_${index}_END`;
      markdown =
        markdown.slice(0, node.start) + placeholder + markdown.slice(node.end);
      islands.push({ placeholder, raw: node.raw });
      currentIslandSources.set(placeholder, node.raw);
    });

  return { markdown, islands };
}

export function restoreMdxSource(markdown, islands = []) {
  if (!markdown) return '';

  let result = islands.reduce(
    (source, island) => source.replaceAll(island.placeholder, island.raw),
    markdown,
  );

  // Fallback: replace any remaining placeholder tokens from cached sources
  result = result.replace(
    /(?:MDXBLOCK|MDXINLINE)_[A-Za-z0-9]+_\d+_END/g,
    (token) => {
      const cached = getMdxIslandSource(token);
      return cached !== undefined ? cached : token;
    },
  );

  // Ensure YAML frontmatter starts at the beginning of the file without leading blank lines or whitespace
  if (result.trimStart().startsWith('---')) {
    result = result.trimStart();
  }

  return result;
}
