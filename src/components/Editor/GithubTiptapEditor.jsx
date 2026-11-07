import React, { useCallback, useEffect, useRef, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import { MdxBlockIsland, MdxIsland } from './MdxIslandExtension';
import {
  DEFAULT_SETTINGS,
  SETTINGS_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
  decodeBase64Utf8,
  describeGitHubError,
  encodeBase64Utf8,
} from './githubEditorConfig';
import {
  getMdxIslandSource,
  protectMdxSource,
  restoreMdxSource,
} from './mdxSerialization';
import styles from './GithubTiptapEditor.module.css';

function isLoopbackHost(hostname) {
  return (
    hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1'
  );
}

function collectMdxIslands(node, islands = []) {
  if (node.type === 'mdxIsland' || node.type === 'mdxBlockIsland') {
    const placeholder = node.attrs?.placeholder;
    const raw = node.attrs?.raw || getMdxIslandSource(placeholder) || '';
    if (placeholder) {
      islands.push({ placeholder, raw });
    }
  }
  for (const child of node.content || []) collectMdxIslands(child, islands);
  return islands;
}

function preserveLineEndings(content, reference) {
  const newline = reference.match(/\r\n|\n|\r/)?.[0] || '\n';
  return content.replace(/\r\n|\r|\n/g, newline);
}

async function localApi(path, options) {
  const response = await fetch(path, {
    cache: 'no-store',
    ...options,
    headers: {
      ...(options?.body ? { 'Content-Type': 'application/json' } : {}),
      ...options?.headers,
    },
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(
      result.error || `Local editor request failed (${response.status}).`,
    );
  }
  return result;
}

export default function GithubTiptapEditor({ filePath, title, onClose }) {
  const [token, setToken] = useState('');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isReady, setIsReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [sha, setSha] = useState('');
  const [localBranch, setLocalBranch] = useState('');
  const [source, setSource] = useState('');
  const [mode, setMode] = useState('visual');
  const [isDirty, setIsDirty] = useState(false);
  const [busy, setBusy] = useState('');
  const [lastSavedTime, setLastSavedTime] = useState('');
  const [notice, setNotice] = useState(null);
  const savedSourceRef = useRef('');
  const visualChangedRef = useRef(false);
  const editorFocusedRef = useRef(false);
  const loadedPathRef = useRef('');
  const isMdx = /\.mdx$/i.test(filePath);
  const sourceLabel = isMdx ? 'MDX source' : 'Markdown source';
  const isSaving = busy === 'save';
  const isPushing = busy === 'push';
  const isLocalEnvironment =
    typeof window !== 'undefined' && isLoopbackHost(window.location.hostname);

  const editor = useEditor({
    extensions: [StarterKit, MdxIsland, MdxBlockIsland, Markdown],
    content: '',
    contentType: 'markdown',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: styles.proseMirror,
        'aria-label': `Visual editor for ${filePath}`,
        'aria-multiline': 'true',
      },
    },
    onFocus: () => {
      editorFocusedRef.current = true;
    },
    onBlur: () => {
      editorFocusedRef.current = false;
    },
    onUpdate: ({ editor: currentEditor }) => {
      const markdown = currentEditor.getMarkdown();
      const rawSource = preserveLineEndings(
        restoreMdxSource(markdown, collectMdxIslands(currentEditor.getJSON())),
        savedSourceRef.current,
      );
      visualChangedRef.current = true;
      setSource(rawSource);
      setIsDirty(rawSource !== savedSourceRef.current);
    },
  });

  const loadContent = useCallback(
    (content, fileSha = '') => {
      const markdown = isMdx ? protectMdxSource(content).markdown : content;
      editor?.commands.setContent(markdown, {
        contentType: 'markdown',
        emitUpdate: false,
      });
      savedSourceRef.current = content;
      visualChangedRef.current = false;
      setSource(content);
      setSha(fileSha);
      setIsDirty(false);
      setLoaded(true);
    },
    [editor, isMdx],
  );

  useEffect(() => {
    try {
      setToken(window.localStorage.getItem(TOKEN_STORAGE_KEY) || '');
      const savedSettings = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({
          owner: parsedSettings.owner || DEFAULT_SETTINGS.owner,
          repo: parsedSettings.repo || DEFAULT_SETTINGS.repo,
          branch: parsedSettings.branch || DEFAULT_SETTINGS.branch,
        });
      }
    } catch (error) {
      setNotice({
        type: 'error',
        message: `Could not read the editor settings: ${describeGitHubError(error)}`,
      });
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady || !editor || !isLocalEnvironment) return;
    if (loadedPathRef.current === filePath) return;
    loadedPathRef.current = filePath;
    setBusy('load');
    setNotice(null);

    localApi(`/api/doc-local?filePath=${encodeURIComponent(filePath)}`)
      .then(({ content, branch }) => {
        if (typeof content !== 'string') {
          throw new Error('The local API returned invalid document content.');
        }
        loadContent(content);
        setLocalBranch(typeof branch === 'string' ? branch : '');
        setNotice({
          type: 'success',
          message: `Loaded ${filePath} from the local file.`,
        });
      })
      .catch((error) => {
        loadedPathRef.current = '';
        setNotice({
          type: 'error',
          message: `Could not load the local file: ${describeGitHubError(error)}`,
        });
      })
      .finally(() => setBusy(''));
  }, [editor, filePath, isLocalEnvironment, isReady, loadContent]);

  useEffect(() => {
    editor?.setEditable(loaded && !busy);
  }, [busy, editor, loaded]);

  const handleFetch = async () => {
    if (!token) {
      setNotice({
        type: 'error',
        message:
          'Add a GitHub token on the Editor settings page before loading.',
      });
      return;
    }
    if (
      isDirty &&
      !window.confirm(
        'Discard your unsaved changes and reload this page from GitHub?',
      )
    ) {
      return;
    }

    setBusy('fetch');
    setNotice(null);
    try {
      const { Octokit } = await import('@octokit/rest');
      const octokit = new Octokit({ auth: token });
      const response = await octokit.rest.repos.getContent({
        owner: settings.owner,
        repo: settings.repo,
        path: filePath,
        ref: settings.branch,
      });
      const file = response.data;
      if (Array.isArray(file) || file.type !== 'file') {
        throw new Error('GitHub did not return a file for this page.');
      }
      if (file.encoding !== 'base64' || typeof file.content !== 'string') {
        throw new Error(
          'GitHub did not return Base64 file content. The Contents API supports files up to 1 MB.',
        );
      }

      loadContent(decodeBase64Utf8(file.content), file.sha);
      setNotice({
        type: 'success',
        message: `Loaded ${filePath} from ${settings.owner}/${settings.repo} (${settings.branch}).`,
      });
    } catch (error) {
      setSha('');
      setNotice({
        type: 'error',
        message: `Could not load this page from GitHub: ${describeGitHubError(error)}`,
      });
    } finally {
      setBusy('');
    }
  };

  const getCurrentSource = () => {
    if (mode === 'source' || !editor) return source;
    return preserveLineEndings(
      restoreMdxSource(
        editor.getMarkdown(),
        collectMdxIslands(editor.getJSON()),
      ),
      savedSourceRef.current,
    );
  };

  const handleModeChange = (nextMode) => {
    if (nextMode === mode || !editor) return;
    if (nextMode === 'visual') {
      try {
        const markdown = isMdx ? protectMdxSource(source).markdown : source;
        editor.commands.setContent(markdown, {
          contentType: 'markdown',
          emitUpdate: false,
        });
        visualChangedRef.current = false;
      } catch (error) {
        setNotice({
          type: 'error',
          message: `Could not open visual mode: ${describeGitHubError(error)}`,
        });
        return;
      }
    } else {
      const markdown = visualChangedRef.current ? getCurrentSource() : source;
      setSource(markdown);
      setIsDirty(markdown !== savedSourceRef.current);
    }
    setMode(nextMode);
  };

  const handleSaveLocal = async () => {
    if (!isLocalEnvironment || !loaded || !isDirty) return;
    setBusy('save');
    setNotice(null);
    try {
      const content = getCurrentSource();
      if (/(?:MDXBLOCK|MDXINLINE)_[A-Za-z0-9]+_\d+_END/.test(content)) {
        throw new Error(
          'Cannot save: document contains un-restored MDX placeholder tokens.',
        );
      }
      await localApi('/api/doc-local', {
        method: 'POST',
        body: JSON.stringify({ filePath, content }),
      });
      savedSourceRef.current = content;
      visualChangedRef.current = false;
      setSource(content);
      setIsDirty(false);
      const savedAt = new Date();
      setLastSavedTime(savedAt.toLocaleTimeString());
      setNotice({
        type: 'success',
        message: `Saved to local file at ${savedAt.toLocaleTimeString()}.`,
      });
    } catch (error) {
      setNotice({
        type: 'error',
        message: `Could not save the local file: ${describeGitHubError(error)}`,
      });
    } finally {
      setBusy('');
    }
  };

  const handleCommit = async () => {
    if (!loaded || !editor) return;
    const commitMessage = window.prompt(`Commit message for ${filePath}:`);
    if (commitMessage === null) return;
    if (!commitMessage.trim()) {
      setNotice({ type: 'error', message: 'A commit message is required.' });
      return;
    }

    setBusy(isLocalEnvironment ? (isDirty ? 'save' : 'push') : 'commit');
    setNotice(null);
    try {
      const content = getCurrentSource();
      if (/(?:MDXBLOCK|MDXINLINE)_[A-Za-z0-9]+_\d+_END/.test(content)) {
        throw new Error(
          'Cannot save: document contains un-restored MDX placeholder tokens.',
        );
      }
      if (isLocalEnvironment) {
        if (isDirty) {
          await localApi('/api/doc-local', {
            method: 'POST',
            body: JSON.stringify({ filePath, content }),
          });
          savedSourceRef.current = content;
          visualChangedRef.current = false;
          setSource(content);
          setIsDirty(false);
          setLastSavedTime(new Date().toLocaleTimeString());
        }

        setBusy('push');
        await localApi('/api/doc-git-push', {
          method: 'POST',
          body: JSON.stringify({
            filePath,
            branch: localBranch,
            message: commitMessage.trim(),
          }),
        });
        setNotice({
          type: 'success',
          message: `Committed and pushed ${filePath} to ${localBranch}.`,
        });
        return;
      }

      if (!token || !sha) {
        throw new Error('Load this page from GitHub before committing it.');
      }
      const { Octokit } = await import('@octokit/rest');
      const octokit = new Octokit({ auth: token });
      const response = await octokit.rest.repos.createOrUpdateFileContents({
        owner: settings.owner,
        repo: settings.repo,
        path: filePath,
        branch: settings.branch,
        message: commitMessage.trim(),
        content: encodeBase64Utf8(content),
        sha,
      });
      setSha(response.data.content?.sha || sha);
      savedSourceRef.current = content;
      visualChangedRef.current = false;
      setSource(content);
      setIsDirty(false);
      setNotice({
        type: 'success',
        message: `Committed ${filePath} to ${settings.branch}.`,
      });
    } catch (error) {
      setNotice({
        type: 'error',
        message: `Could not commit this page: ${describeGitHubError(error)}`,
      });
    } finally {
      setBusy('');
    }
  };

  const confirmClose = () => {
    if (
      !isDirty ||
      window.confirm('Close the editor and discard your unsaved changes?')
    ) {
      onClose();
    }
  };

  return (
    <section className={styles.editorPanel} aria-label={`Edit ${title}`}>
      <header className={styles.editorHeader}>
        <div>
          <h2>Edit {title}</h2>
          <p className={styles.filePath}>{filePath}</p>
        </div>
        <div className={styles.headerActions}>
          <Link className={styles.settingsLink} to={useBaseUrl('/editor-settings')}>
            Editor settings
          </Link>
          <button
            className={styles.closeButton}
            type="button"
            onClick={confirmClose}
            aria-label="Close page editor"
          >
            Close
          </button>
        </div>
      </header>

      {isLocalEnvironment ? (
        <p className={styles.setupMessage} role="status">
          Editing the local file on branch{' '}
          <strong>{localBranch || 'unavailable'}</strong>. Git push uses this
          checkout’s configured credentials and only stages this document.
        </p>
      ) : (
        !token &&
        isReady && (
          <p className={styles.setupMessage} role="status">
            GitHub editing requires a token. Add it on the{' '}
            <Link to={useBaseUrl('/editor-settings')}>Editor settings</Link> page.
          </p>
        )
      )}

      <div className={styles.editorActions}>
        <div
          className={styles.modeTabs}
          role="tablist"
          aria-label="Editor mode"
        >
          <button
            className={mode === 'visual' ? styles.activeTab : ''}
            id="visual-tab"
            role="tab"
            aria-selected={mode === 'visual'}
            type="button"
            onClick={() => handleModeChange('visual')}
            disabled={!loaded || !editor || Boolean(busy)}
          >
            Visual
          </button>
          <button
            className={mode === 'source' ? styles.activeTab : ''}
            id="source-tab"
            role="tab"
            aria-selected={mode === 'source'}
            type="button"
            onClick={() => handleModeChange('source')}
            disabled={!loaded || Boolean(busy)}
          >
            {sourceLabel}
          </button>
        </div>
        <div className={styles.primaryActions}>
          {!isLocalEnvironment && (
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={handleFetch}
              disabled={!isReady || Boolean(busy)}
            >
              {busy === 'fetch'
                ? 'Loading…'
                : sha
                  ? 'Reload from GitHub'
                  : 'Load from GitHub'}
            </button>
          )}
          {isLocalEnvironment && (
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={handleSaveLocal}
              disabled={!loaded || !isDirty || Boolean(busy)}
            >
              {isSaving ? 'Saving…' : 'Save to Local'}
            </button>
          )}
          <button
            className={styles.primaryButton}
            type="button"
            onClick={handleCommit}
            disabled={
              !loaded ||
              (isLocalEnvironment && !localBranch) ||
              (!isLocalEnvironment && (!sha || !isDirty)) ||
              Boolean(busy)
            }
          >
            {isPushing
              ? 'Committing & pushing…'
              : busy === 'commit'
                ? 'Committing…'
                : 'Commit & Push'}
          </button>
        </div>
      </div>

      {isMdx && (
        <p className={styles.sourceWarning}>
          JSX, imports, expressions, and front matter are kept as protected
          components in visual mode. Use {sourceLabel} mode to edit that syntax
          directly.
        </p>
      )}

      {mode === 'source' ? (
        <textarea
          className={styles.sourceEditor}
          aria-label={`${sourceLabel} for ${filePath}`}
          value={source}
          onChange={(event) => {
            setSource(event.target.value);
            setIsDirty(
              preserveLineEndings(
                event.target.value,
                savedSourceRef.current,
              ) !== savedSourceRef.current,
            );
          }}
          disabled={!loaded || Boolean(busy)}
          placeholder={
            isLocalEnvironment
              ? 'Loading the local file…'
              : 'Load this page from GitHub to edit its source.'
          }
          spellCheck={false}
          wrap="off"
        />
      ) : (
        <>
          <div
            className={styles.toolbar}
            role="toolbar"
            aria-label="Text formatting"
          >
            <button
              type="button"
              aria-label="Heading level 1"
              disabled={!loaded || Boolean(busy)}
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              H1
            </button>
            <button
              type="button"
              aria-label="Heading level 2"
              disabled={!loaded || Boolean(busy)}
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              H2
            </button>
            <button
              type="button"
              aria-label="Bold"
              disabled={!loaded || Boolean(busy)}
              onClick={() => editor?.chain().focus().toggleBold().run()}
            >
              <strong>B</strong>
            </button>
            <button
              type="button"
              aria-label="Italic"
              disabled={!loaded || Boolean(busy)}
              onClick={() => editor?.chain().focus().toggleItalic().run()}
            >
              <em>I</em>
            </button>
            <button
              type="button"
              aria-label="Bulleted list"
              disabled={!loaded || Boolean(busy)}
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
            >
              Bullets
            </button>
            <button
              type="button"
              aria-label="Numbered list"
              disabled={!loaded || Boolean(busy)}
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            >
              Numbered
            </button>
            <button
              type="button"
              aria-label="Blockquote"
              disabled={!loaded || Boolean(busy)}
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            >
              Quote
            </button>
            <button
              type="button"
              aria-label="Code block"
              disabled={!loaded || Boolean(busy)}
              onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            >
              Code
            </button>
          </div>
          <div className={styles.visualSurface}>
            {editor ? (
              <EditorContent editor={editor} />
            ) : (
              <p className={styles.placeholder}>
                {busy === 'load'
                  ? 'Loading the local document…'
                  : 'Preparing the visual editor…'}
              </p>
            )}
          </div>
        </>
      )}

      {lastSavedTime && (
        <p className={styles.savedTime} role="status">
          Saved to local file at {lastSavedTime}
        </p>
      )}

      {notice && (
        <div
          className={`${styles.notice} ${notice.type === 'error' ? styles.errorNotice : styles.successNotice}`}
          role={notice.type === 'error' ? 'alert' : 'status'}
          aria-live={notice.type === 'error' ? 'assertive' : 'polite'}
        >
          {notice.message}
        </div>
      )}
    </section>
  );
}
