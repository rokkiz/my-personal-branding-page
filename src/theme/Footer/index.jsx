import React from 'react';
import Footer from '@theme-original/Footer';
import Docsly from '@docsly/react';
import { useLocation } from '@docusaurus/router';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import HomeFooter from '../../components/homepage/HomeFooter';

export default function FooterWrapper(props) {
  const { pathname } = useLocation();
  const docslyStylesheet = useBaseUrl('/assets/css/docsly.min.css');

  return (
    <>
      <HomeFooter />
      {/* <Footer {...props} /> */}

      <Head>
        {/**
         * Doing it this way because importing css in docusaurus
         * reorders the css clases that messes up the docsly styling
         */}
        <link rel="stylesheet" href={docslyStylesheet} />
      </Head>

      <Docsly
        publicId="public_vzrAqhBkB7RSYu2xJ73FVYrZDBZwryg2Lkr4mluOpjUbbyp4PqVGZbs35RR6py6U"
        pathname={pathname}
      />
    </>
  );
}
