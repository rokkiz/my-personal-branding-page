import React, { Suspense } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Layout from '@theme/Layout';

const EditorSettings = React.lazy(() => import('./EditorSettings'));

function SettingsLoading() {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '48px 28px',
        color: 'var(--ifm-font-color-base)',
      }}
      role="status"
    >
      Loading editor settings…
    </div>
  );
}

export default function EditorSettingsPage() {
  return (
    <Layout
      title="Editor settings"
      description="Configure the GitHub token and repository used by the documentation page editor."
    >
      <BrowserOnly fallback={<SettingsLoading />}>
        {() => (
          <Suspense fallback={<SettingsLoading />}>
            <EditorSettings />
          </Suspense>
        )}
      </BrowserOnly>
    </Layout>
  );
}
