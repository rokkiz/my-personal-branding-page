import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

import HeroSection from '../components/homepage/HeroSection.tsx';
import APIReferenceSection from '../components/homepage/APIReferenceSection';
import CommunitySection from '../components/homepage/CommunitySection';
import HomeFooter from '../components/homepage/HomeFooter';
import ResourcesSection from '../components/homepage/ResourcesSection';
import HelpSection from '../components/homepage/HelpSection';
import GuidesAndSamples from '../components/homepage/GuidesAndSamples';
import SDKs from '../components/homepage/SDKs';

export default function SDKDocumentationHomepage() {
  return (
    <Layout
      title="Dyte Documentation"
      wrapperClassName="homepage flex flex-col"
      noFooter
    >
      <Head>
        <link rel="prefetch" href="/assets/css/elements.min.css" />
      </Head>

      <HeroSection />
      <GuidesAndSamples />
      <SDKs />
      <APIReferenceSection />

      <div className="z-0">
        <ResourcesSection />
        <HelpSection className="-mb-48" />
      </div>

      <CommunitySection />
      <HomeFooter />
    </Layout>
  );
}
