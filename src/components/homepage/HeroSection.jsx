import React from 'react';

export default function HeroSection() {
  return (
    <main id="hero" className="home-hero">
      <div className="home-hero__glow home-hero__glow--blue" />
      <div className="home-hero__glow home-hero__glow--cyan" />

      <div className="home-hero__inner">
        <div className="home-hero__content">
          <div className="home-hero__badge">
            <span className="home-hero__badge-dot" />
            Technical Project Manager / Scrum Master
          </div>

          <h1 className="home-hero__title">
            Driving Tech Delivery Through Data-Driven &amp; AI Innovation.
          </h1>

          <p className="home-hero__description">
            Empowering engineering teams, optimizing Agile workflows, and
            delivering high-impact IT projects with measurable metrics
          </p>

          <a
            href="mailto:contact@jamesdavidcoach.com?subject=Discovery%20call"
            className="home-hero__cta"
          >
            View my Resume
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          <div className="home-hero__rating">
            <div className="home-hero__stars" aria-label="5 out of 5 stars">
              ★★★★★
            </div>
            <p>
              <strong>4.9/5</strong>
              <span>Rated by 200+ CEOs &amp; Founders</span>
            </p>
          </div>
        </div>

        <div className="home-hero__portrait">
          <img
            src="/img/brand/coach_hero.jpg"
            alt="James David, executive and business coach"
          />
          <div className="home-hero__stat">
            <div className="home-hero__stat-icon" aria-hidden="true">
              ↗
            </div>
            <div>
              <p>98% Client Satisfaction</p>
              <span>Average 3.4x revenue growth in 12 months</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
