import React, { Suspense, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

const GithubTiptapEditor = React.lazy(() => import('./GithubTiptapEditor'));

export default function DocPageEditor({ filePath, title, onEditingChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const setOpen = (open) => {
    setIsOpen(open);
    onEditingChange?.(open);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!isOpen)}
        aria-expanded={isOpen}
        className="button button--secondary button--sm"
      >
        {isOpen ? 'Close editor' : 'Edit this page'}
      </button>
      {isOpen && (
        <BrowserOnly fallback={<p role="status">Loading the page editor…</p>}>
          {() => (
            <Suspense fallback={<p role="status">Loading the page editor…</p>}>
              <GithubTiptapEditor
                filePath={filePath}
                title={title}
                onClose={() => setOpen(false)}
              />
            </Suspense>
          )}
        </BrowserOnly>
      )}
    </div>
  );
}
