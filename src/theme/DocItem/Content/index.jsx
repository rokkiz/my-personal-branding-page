import React, { useState } from 'react';
import clsx from 'clsx';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';

import DocPageEditor from '../../../components/Editor/DocPageEditor';
import { getPageRepoPath } from '../../../components/Editor/githubEditorConfig';

function useSyntheticTitle() {
  const { metadata, frontMatter, contentTitle } = useDoc();
  return !frontMatter.hide_title && typeof contentTitle === 'undefined'
    ? metadata.title
    : null;
}

export default function DocItemContent({ children }) {
  const { metadata } = useDoc();
  const syntheticTitle = useSyntheticTitle();
  const filePath = getPageRepoPath(metadata.source);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <BrowserOnly fallback={null}>
        {() => (
          <DocPageEditor
            filePath={filePath}
            title={metadata.title}
            onEditingChange={setIsEditing}
          />
        )}
      </BrowserOnly>
      {!isEditing && (
        <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
          {syntheticTitle && (
            <header>
              <Heading as="h1">{syntheticTitle}</Heading>
            </header>
          )}
          <MDXContent>{children}</MDXContent>
        </div>
      )}
    </>
  );
}
