export const TOKEN_STORAGE_KEY = 'github-tiptap-editor:pat';
export const SETTINGS_STORAGE_KEY = 'github-tiptap-editor:settings';

export const DEFAULT_SETTINGS = {
  owner: 'rokkiz',
  repo: 'my-personal-branding-page',
  branch: 'main',
};

export function getPageRepoPath(source) {
  if (typeof source !== 'string' || !source.startsWith('@site/')) {
    throw new Error(
      'This page does not have a supported local Markdown source file.',
    );
  }

  const repoPath = source.slice('@site/'.length);
  if (
    !repoPath.startsWith('docs/') ||
    !/\.(md|mdx)$/i.test(repoPath) ||
    repoPath.split('/').some((part) => part === '..' || part === '.')
  ) {
    throw new Error(
      'This page is not backed by a Markdown file in the docs directory.',
    );
  }

  return repoPath;
}

export function decodeBase64Utf8(content) {
  const binary = window.atob(content.replace(/\s/g, ''));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeBase64Utf8(content) {
  const bytes = new TextEncoder().encode(content);
  let binary = '';

  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(
      ...bytes.subarray(offset, Math.min(offset + 0x8000, bytes.length)),
    );
  }

  return window.btoa(binary);
}

export function describeGitHubError(error) {
  if (error?.status === 401) {
    return 'GitHub rejected this token. Check that it is valid and has not expired.';
  }
  if (error?.status === 403) {
    return 'GitHub denied this request. Check the token permissions and repository access.';
  }
  if (error?.status === 404) {
    return 'GitHub could not find this repository, branch, or file. Check the settings.';
  }
  if (error?.status === 409 || error?.status === 422) {
    return 'GitHub could not update this file. It may have changed since it was fetched; reload it and retry.';
  }
  return error instanceof Error
    ? error.message
    : 'An unexpected error occurred.';
}
