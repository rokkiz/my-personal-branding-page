import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';

import {
  DEFAULT_SETTINGS,
  SETTINGS_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
  describeGitHubError,
} from './githubEditorConfig';
import styles from './EditorSettings.module.css';

export default function EditorSettings() {
  const [token, setToken] = useState('');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState(null);

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
        message: `Could not read saved editor settings: ${describeGitHubError(error)}`,
      });
    } finally {
      setReady(true);
    }
  }, []);

  const updateSettings = (field, value) => {
    setSettings((current) => ({ ...current, [field]: value }));
  };

  const handleSave = () => {
    const normalized = {
      owner: settings.owner.trim(),
      repo: settings.repo.trim(),
      branch: settings.branch.trim() || DEFAULT_SETTINGS.branch,
    };

    if (!normalized.owner || !normalized.repo) {
      setNotice({
        type: 'error',
        message: 'Repository owner and repository name are required.',
      });
      return;
    }

    try {
      if (token.trim()) {
        window.localStorage.setItem(TOKEN_STORAGE_KEY, token.trim());
      }
      window.localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify(normalized),
      );
      setToken(token.trim());
      setSettings(normalized);
      setNotice({
        type: 'success',
        message:
          'Editor settings saved in this browser. You can now edit a documentation page.',
      });
    } catch (error) {
      setNotice({
        type: 'error',
        message: `Could not save editor settings: ${describeGitHubError(error)}`,
      });
    }
  };

  const handleForgetToken = () => {
    try {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      setToken('');
      setNotice({
        type: 'success',
        message: 'The saved GitHub token was removed from this browser.',
      });
    } catch (error) {
      setNotice({
        type: 'error',
        message: `Could not remove the saved token: ${describeGitHubError(error)}`,
      });
    }
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1>Editor settings</h1>
          <p>
            Set your repository and branch once for every documentation page.
            Local editing uses your checkout and Git credentials.
          </p>
        </div>
        <Link className={styles.backLink} to="/guides/">
          Back to documentation
        </Link>
      </header>

      <section className={styles.panel} aria-labelledby="github-settings-title">
        <h2 id="github-settings-title">GitHub repository</h2>
        <p className={styles.description}>
          On localhost, save writes to disk and push uses the currently
          checked-out branch and configured Git remote. The branch setting and
          personal access token apply to GitHub API editing outside localhost.
        </p>

        <div className={styles.grid}>
          <label className={styles.field}>
            <span>Repository owner</span>
            <input
              autoComplete="off"
              value={settings.owner}
              onChange={(event) => updateSettings('owner', event.target.value)}
              disabled={!ready}
            />
          </label>
          <label className={styles.field}>
            <span>Repository name</span>
            <input
              autoComplete="off"
              value={settings.repo}
              onChange={(event) => updateSettings('repo', event.target.value)}
              disabled={!ready}
            />
          </label>
          <label className={`${styles.field} ${styles.branchField}`}>
            <span>Branch</span>
            <input
              autoComplete="off"
              value={settings.branch}
              onChange={(event) => updateSettings('branch', event.target.value)}
              disabled={!ready}
            />
          </label>
        </div>

        <label className={styles.field}>
          <span>Personal access token</span>
          <input
            autoComplete="off"
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder={
              ready ? 'Paste a GitHub token' : 'Loading saved token…'
            }
            aria-describedby="token-guidance"
            disabled={!ready}
          />
        </label>
        <p id="token-guidance" className={styles.securityNote}>
          Use a fine-grained token with Contents read and write access for this
          repository if you edit through the GitHub API. It is stored in this
          browser’s localStorage, not sent to this site’s server. Anyone with
          access to this browser profile can access it.
        </p>

        <div className={styles.actions}>
          <button
            className={styles.saveButton}
            type="button"
            onClick={handleSave}
            disabled={!ready}
          >
            Save settings
          </button>
          <button
            className={styles.forgetButton}
            type="button"
            onClick={handleForgetToken}
            disabled={!ready || !token}
          >
            Forget token
          </button>
          <a
            className={styles.tokenHelp}
            href="https://github.com/settings/personal-access-tokens"
            target="_blank"
            rel="noreferrer"
          >
            Manage GitHub tokens
          </a>
        </div>

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
    </main>
  );
}
