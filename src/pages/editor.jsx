import React from 'react';
import { Redirect } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function EditorRedirect() {
  return <Redirect to={useBaseUrl('/editor-settings')} />;
}
