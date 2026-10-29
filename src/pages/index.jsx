import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

import Header from '../components/homepage/Header';
import HeroSection from '../components/homepage/HeroSection';

export default function Homepage() {
  return (
    <Layout
      title="James David | Executive & Business Leadership Coach"
      description="Unlock the Leader Within. Scale your business, align high-performance teams, and build sustainable executive momentum with James David."
      wrapperClassName="homepage home-one-page flex h-screen min-h-0 flex-col overflow-hidden bg-slate-950 font-sans"
      noFooter
    >
      <Head>
        <meta name="keywords" content="Business Coach, Executive Coaching, Leadership Mentor, Founder Scaling, Business Growth Roadmap" />
      </Head>

      <Header />
      <HeroSection />
    </Layout>
  );
}
