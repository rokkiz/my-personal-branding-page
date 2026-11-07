import React from 'react';
import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { getMdxIslandSource } from './mdxSerialization';

function getIslandLabel(raw) {
  if (/^---(?:\r?\n|$)/.test(raw)) return 'Front matter';
  if (/^\s*:{2,}/.test(raw)) return 'Docusaurus directive';

  const tag = raw.match(/<\/?([\w.:-]+)/);
  const imported = raw.match(/\b(?:import|export)\b/);
  if (tag) return `<${tag[1]}>`;
  if (imported) return 'MDX import/export';
  return 'MDX expression';
}

function MdxIslandView({ node }) {
  return (
    <NodeViewWrapper
      as="span"
      className="mdx-island"
      contentEditable={false}
      title={node.attrs.raw}
    >
      {getIslandLabel(node.attrs.raw)}
    </NodeViewWrapper>
  );
}

const inlineTokenPattern = /^MDXINLINE_[A-Za-z0-9]+_\d+_END/;
const blockTokenPattern = /^MDXBLOCK_[A-Za-z0-9]+_\d+_END/;

export const MdxIsland = Node.create({
  name: 'mdxIsland',
  group: 'inline',
  inline: true,
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      raw: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-raw') || '',
        renderHTML: (attrs) => ({ 'data-raw': attrs.raw || '' }),
      },
      placeholder: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-placeholder') || '',
        renderHTML: (attrs) => ({ 'data-placeholder': attrs.placeholder || '' }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'span[data-mdx-island]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, { 'data-mdx-island': '' }),
      getIslandLabel(HTMLAttributes.raw || ''),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MdxIslandView);
  },

  parseMarkdown(token) {
    const placeholder = token.raw ? token.raw.trim() : '';
    return {
      type: this.name,
      attrs: {
        raw: getMdxIslandSource(placeholder) || placeholder,
        placeholder,
      },
    };
  },

  renderMarkdown(node) {
    return node?.attrs?.placeholder || '';
  },

  markdownTokenizer: {
    name: 'mdxIsland',
    level: 'inline',
    start(src) {
      return src.indexOf('MDXINLINE_');
    },
    tokenize(src) {
      const match = inlineTokenPattern.exec(src);
      if (!match) return undefined;
      return { type: 'mdxIsland', raw: match[0] };
    },
  },
});

export const MdxBlockIsland = Node.create({
  name: 'mdxBlockIsland',
  group: 'block',
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      raw: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-raw') || '',
        renderHTML: (attrs) => ({ 'data-raw': attrs.raw || '' }),
      },
      placeholder: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-placeholder') || '',
        renderHTML: (attrs) => ({ 'data-placeholder': attrs.placeholder || '' }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-mdx-island-block]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-mdx-island-block': '' }),
      getIslandLabel(HTMLAttributes.raw || ''),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(({ node }) => (
      <NodeViewWrapper
        as="div"
        className="mdx-island-block"
        contentEditable={false}
        title={node.attrs.raw}
      >
        {getIslandLabel(node.attrs.raw)}
      </NodeViewWrapper>
    ));
  },

  parseMarkdown(token) {
    const placeholder = token.raw ? token.raw.trim() : '';
    return {
      type: this.name,
      attrs: {
        raw: getMdxIslandSource(placeholder) || placeholder,
        placeholder,
      },
    };
  },

  renderMarkdown(node) {
    return node?.attrs?.placeholder || '';
  },

  markdownTokenizer: {
    name: 'mdxBlockIsland',
    level: 'block',
    start(src) {
      return src.indexOf('MDXBLOCK_');
    },
    tokenize(src) {
      const match = blockTokenPattern.exec(src);
      if (!match) return undefined;
      return { type: 'mdxBlockIsland', raw: match[0] };
    },
  },
});
