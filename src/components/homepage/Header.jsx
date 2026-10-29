import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

function SDKIcon({ name }) {
  const src = useBaseUrl(`/static/landing-page/sdk-icons/${name}`);
  return <img src={src} alt="" />;
}

function SDKDocLink({ path, icon, children, onClick }) {
  const href = useBaseUrl(path);
  return (
    <a href={href} onClick={onClick}>
      <SDKIcon name={icon} />
      {children}
    </a>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sdkMenuOpen, setSdkMenuOpen] = useState(false);
  const [sdkPlatform, setSdkPlatform] = useState('web');
  const navigationItems = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Success Stories', href: '#success-stories' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const sdkGroups = {
    web: [
      { title: 'Core SDK', subtitle: 'Video + Voice + Livestreaming', items: [
        ['JavaScript', '/web-core', 'js.png'],
        ['React', '/react-web-core', 'react.png'],
      ] },
      { title: 'UI Kit', subtitle: 'Easy to use library of UI components', items: [
        ['React', '/react-ui-kit', 'react.png'],
        ['Angular', '/angular-ui-kit', 'angular.png'],
        ['Web Components', '/ui-kit', 'html.png'],
      ] },
    ],
    mobile: [
      { title: 'Core SDK', subtitle: 'Video + Voice + Livestreaming', items: [
        ['React Native', '/rn-core', 'react.png'],
        ['Flutter', '/flutter-core', 'flutter.png'],
        ['Android', '/android-core', 'kotlin.png'],
        ['iOS', '/ios-core', 'swift.png'],
      ] },
      { title: 'UI Kit', subtitle: 'Easy to use library of UI components', items: [
        ['React Native', '/react-native', 'react.png'],
        ['Flutter', '/flutter', 'flutter.png'],
        ['Android', '/android', 'kotlin.png'],
        ['iOS', '/ios', 'swift.png'],
      ] },
    ],
  };

  const SDKMenu = () => (
    <div className="home-sdk-menu" role="region" aria-label="SDK documentation">
      <div className="home-sdk-menu__platforms">
        {[
          ['web', 'Web', 'Guides and API reference for our Web SDKs', 'resources/web.svg'],
          ['mobile', 'Mobile', 'Guides and API reference for our Mobile SDKs', 'resources/mobile.svg'],
        ].map(([platform, label, description, icon]) => (
          <button
            key={platform}
            type="button"
            className={sdkPlatform === platform ? 'is-active' : ''}
            onMouseEnter={() => setSdkPlatform(platform)}
            onFocus={() => setSdkPlatform(platform)}
            onClick={() => setSdkPlatform(platform)}
          >
            <SDKIcon name={icon} />
            <span><strong>{label}</strong><small>{description}</small></span>
          </button>
        ))}
      </div>
      <div className="home-sdk-menu__groups">
        {sdkGroups[sdkPlatform].map((group) => (
          <section key={group.title}>
            <h3>{group.title}</h3>
            <p>{group.subtitle}</p>
            <ul>
              {group.items.map(([label, path, icon]) => (
                <li key={path}>
                  <SDKDocLink
                    path={path}
                    icon={icon}
                    onClick={() => setSdkMenuOpen(false)}
                  >
                    {label}
                  </SDKDocLink>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );

  const SDKMenuButton = () => (
    <button
      type="button"
      className="home-sdk-trigger"
      aria-expanded={sdkMenuOpen}
      onClick={() => setSdkMenuOpen(!sdkMenuOpen)}
      onMouseEnter={() => setSdkMenuOpen(true)}
    >
      My Learning <span aria-hidden="true">⌄</span>
    </button>
  );

  return (
    <header className="home-header">
      <div className="home-header__inner">
        <a href="#" className="flex items-center gap-3 group text-decoration-none">
          <div className="home-header__monogram">
            HT
          </div>
          <div>
            <span className="home-header__name">
              Tan (Harry) Tran
            </span>
            <span className="home-header__subtitle">
              Technical Project Manager
            </span>
          </div>
        </a>

        <nav className="home-header__nav" aria-label="Main navigation">
          {navigationItems.map((item) => (
            <a key={item.name} href={item.href}>
              {item.name}
            </a>
          ))}
          <div
            className="home-sdk-dropdown"
            onMouseLeave={() => setSdkMenuOpen(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setSdkMenuOpen(false);
            }}
          >
            <SDKMenuButton />
            {sdkMenuOpen && <SDKMenu />}
          </div>
          <a
            href="mailto:contact@jamesdavidcoach.com?subject=Discovery%20call"
            className="home-header__cta"
          >
            View my Resume
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </nav>

        <button
          type="button"
          className="home-header__menu-toggle"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="home-mobile-navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          id="home-mobile-navigation"
          className="home-header__mobile-nav"
          aria-label="Mobile navigation"
        >
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="home-sdk-mobile">
            <SDKMenuButton />
            {sdkMenuOpen && <SDKMenu />}
          </div>
          <a
            href="mailto:contact@jamesdavidcoach.com?subject=Discovery%20call"
            className="home-header__cta"
            onClick={() => setMobileMenuOpen(false)}
          >
            View my Resume
          </a>
        </nav>
      )}
    </header>
  );
}
