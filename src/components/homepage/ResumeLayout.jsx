import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Header from './Header';

export default function ResumeLayout({ children }) {
  return (
    <Layout
      title="Resume | Tan Ngoc Tran"
      description="Professional experience, achievements, and education for Tan Ngoc Tran."
      wrapperClassName="homepage resume-page flex min-h-screen flex-col bg-slate-950 font-sans"
      noFooter
    >
      <Header />
      <main className="resume-main">
        <article className="resume-document">{children}</article>
      </main>
    </Layout>
  );
}

export function ResumeAvatar() {
  const imageUrl = useBaseUrl('/img/brand/coach_hero.jpg');
  return <img src={imageUrl} alt="Tan Ngoc Tran (Harry Tran)" />;
}

export function ResumeDownloadButton() {
  const cvUrl = useBaseUrl('/cv/Tan-Ngoc-Tran-CV-Feb-2025.pdf');
  return (
    <a
      className="resume-download-button"
      href={cvUrl}
      download="Tan-Ngoc-Tran-CV-Feb-2025.pdf"
    >
      <span>Download CV</span>
      <span aria-hidden="true">↓</span>
    </a>
  );
}
