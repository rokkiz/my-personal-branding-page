const { execFile } = require('node:child_process');
const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const net = require('node:net');
const path = require('node:path');
const { promisify } = require('node:util');

const execFileAsync = promisify(execFile);
const MAX_BODY_BYTES = 2 * 1024 * 1024;
const repoRoot = path.resolve(__dirname, '..');
const docsRoot = path.join(repoRoot, 'docs');

function isLoopback(address) {
  if (!address) return false;
  const normalized = address.startsWith('::ffff:')
    ? address.slice('::ffff:'.length)
    : address;
  return (
    normalized === '::1' ||
    (net.isIP(normalized) === 4 && normalized.startsWith('127.'))
  );
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(JSON.stringify(payload));
}

function validateOrigin(request) {
  const host = request.headers.host;
  if (!host) return false;

  let hostUrl;
  try {
    hostUrl = new URL(`http://${host}`);
  } catch {
    return false;
  }

  if (!['localhost', '127.0.0.1', '::1', '[::1]'].includes(hostUrl.hostname)) {
    return false;
  }

  const origin = request.headers.origin;
  if (!origin) return true;

  try {
    const originUrl = new URL(origin);
    return (
      originUrl.protocol === (request.socket.encrypted ? 'https:' : 'http:') &&
      originUrl.host === hostUrl.host &&
      ['localhost', '127.0.0.1', '[::1]'].includes(originUrl.hostname)
    );
  } catch {
    return false;
  }
}

function validateRepoPath(value) {
  if (
    typeof value !== 'string' ||
    value.length > 500 ||
    value.includes('\0') ||
    value.includes('\\') ||
    !value.startsWith('docs/')
  ) {
    throw new Error('Only Markdown files inside docs/ can be edited.');
  }

  const segments = value.split('/');
  if (
    segments.some(
      (segment) => !segment || segment === '.' || segment === '..',
    ) ||
    !/\.(md|mdx)$/i.test(value)
  ) {
    throw new Error(
      'Only existing .md or .mdx files inside docs/ can be edited.',
    );
  }

  return value;
}

async function resolveDocPath(value) {
  const repoPath = validateRepoPath(value);
  const absolutePath = path.resolve(repoRoot, ...repoPath.split('/'));
  const rootPrefix = `${docsRoot}${path.sep}`;
  if (!absolutePath.startsWith(rootPrefix)) {
    throw new Error('The requested file is outside docs/.');
  }

  const realPath = await fs.realpath(absolutePath);
  if (!realPath.startsWith(rootPrefix)) {
    throw new Error('The requested file resolves outside docs/.');
  }

  const stat = await fs.stat(realPath);
  if (!stat.isFile()) {
    throw new Error('The requested path is not a file.');
  }

  return { absolutePath: realPath, repoPath, mode: stat.mode & 0o777 };
}

async function readJson(request) {
  const contentLength = Number(request.headers['content-length'] || 0);
  if (contentLength > MAX_BODY_BYTES) {
    throw Object.assign(new Error('Request body exceeds the 2 MB limit.'), {
      status: 413,
    });
  }

  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      throw Object.assign(new Error('Request body exceeds the 2 MB limit.'), {
        status: 413,
      });
    }
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw Object.assign(new Error('Request body must be valid JSON.'), {
      status: 400,
    });
  }
}

async function writeDocFile(file, content) {
  if (typeof content !== 'string') {
    throw new Error('Document content must be a string.');
  }
  if (Buffer.byteLength(content, 'utf8') > MAX_BODY_BYTES) {
    throw Object.assign(new Error('Document content exceeds the 2 MB limit.'), {
      status: 413,
    });
  }
  if (/(?:MDXBLOCK|MDXINLINE)_[A-Za-z0-9]+_\d+_END/.test(content)) {
    throw Object.assign(
      new Error(
        'Refusing to save: document content contains un-restored MDX placeholder tokens.',
      ),
      { status: 400 },
    );
  }

  const temporaryPath = `${file.absolutePath}.${crypto.randomBytes(8).toString('hex')}.tmp`;
  try {
    await fs.writeFile(temporaryPath, content, {
      encoding: 'utf8',
      flag: 'wx',
      mode: file.mode,
    });
    await fs.rename(temporaryPath, file.absolutePath);
  } catch (error) {
    await fs.rm(temporaryPath, { force: true });
    throw error;
  }
}

async function git(args) {
  try {
    return await execFileAsync('git', args, {
      cwd: repoRoot,
      windowsHide: true,
      timeout: 120_000,
      maxBuffer: 1024 * 1024,
    });
  } catch (error) {
    const detail = error.stderr?.trim() || error.message;
    throw new Error(`Git command failed: ${detail}`);
  }
}

async function handleRequest(request, response, next) {
  const url = new URL(request.url, 'http://localhost');

  if (
    url.pathname !== '/api/doc-local' &&
    url.pathname !== '/api/doc-git-push'
  ) {
    next();
    return;
  }

  if (!isLoopback(request.socket.remoteAddress)) {
    sendJson(response, 403, {
      error: 'This local editor API is loopback-only.',
    });
    return;
  }

  if (request.method !== 'GET' && !validateOrigin(request)) {
    sendJson(response, 403, { error: 'Request origin is not allowed.' });
    return;
  }

  try {
    if (url.pathname === '/api/doc-local' && request.method === 'GET') {
      const file = await resolveDocPath(url.searchParams.get('filePath'));
      const content = await fs.readFile(file.absolutePath, 'utf8');
      const { stdout } = await git(['branch', '--show-current']);
      sendJson(response, 200, { content, branch: stdout.trim() });
      return;
    }

    if (url.pathname === '/api/doc-local' && request.method === 'POST') {
      const body = await readJson(request);
      const file = await resolveDocPath(body.filePath);
      await writeDocFile(file, body.content);
      sendJson(response, 200, { saved: true, filePath: file.repoPath });
      return;
    }

    if (url.pathname === '/api/doc-git-push' && request.method === 'POST') {
      const body = await readJson(request);
      const file = await resolveDocPath(body.filePath);
      const message =
        typeof body.message === 'string' ? body.message.trim() : '';
      const branch = typeof body.branch === 'string' ? body.branch.trim() : '';

      if (!message || message.length > 200) {
        throw new Error('A commit message of 1–200 characters is required.');
      }
      if (!branch || branch.length > 200) {
        throw new Error('A target branch is required.');
      }

      await git(['check-ref-format', '--branch', branch]);
      const { stdout } = await git(['branch', '--show-current']);
      if (stdout.trim() !== branch) {
        throw new Error(
          `The checked-out branch is "${stdout.trim() || '(detached HEAD)'}", not "${branch}".`,
        );
      }

      await git(['add', '--', file.repoPath]);
      await git(['commit', '--only', '-m', message, '--', file.repoPath]);
      await git(['push', 'origin', branch]);

      sendJson(response, 200, {
        pushed: true,
        branch,
        filePath: file.repoPath,
      });
      return;
    }

    sendJson(response, 405, { error: 'Method not allowed.' });
  } catch (error) {
    const status = error.status || (error.code === 'ENOENT' ? 404 : 400);
    sendJson(response, status, {
      error: error.message || 'The local editor request failed.',
    });
  }
}

module.exports = function localEditorApiPlugin() {
  return {
    name: 'local-editor-api',
    configureWebpack(_config, isServer) {
      if (isServer || process.env.NODE_ENV === 'production') return {};

      return {
        devServer: {
          setupMiddlewares(middlewares, devServer) {
            const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
            middlewares.unshift(evalSourceMapMiddleware(devServer));
            middlewares.unshift((request, response, next) => {
              handleRequest(request, response, next).catch((error) => {
                if (!response.headersSent) {
                  sendJson(response, 500, {
                    error: error.message || 'The local editor request failed.',
                  });
                }
              });
            });
            return middlewares;
          },
        },
      };
    },
  };
};
