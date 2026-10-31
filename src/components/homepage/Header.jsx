import React, { useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';

function ThemeToggle() {
  const { colorMode, setColorMode } = useColorMode();
  const nextTheme = colorMode === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className="home-header__theme-toggle"
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={colorMode === 'light'}
      title={`Switch to ${nextTheme} mode`}
      onClick={() => setColorMode(nextTheme)}
    >
      {colorMode === 'dark' ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" strokeWidth="2" d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" />
        </svg>
      )}
    </button>
  );
}

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

export default function Header({ showThemeToggle = false }) {
  const homeHref = useBaseUrl('/');
  const resumeHref = useBaseUrl('/about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sdkMenuOpen, setSdkMenuOpen] = useState(false);
  const [sdkPlatform, setSdkPlatform] = useState('web');
  const navigationItems = [
    { name: 'Home', href: '#' },
    { name: 'Success Stories', href: '#success-stories' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const sdkGroups = {
    web: [
      { title: 'Introduction to Project Management', path: '/introduction-to-project-management', items: [] },
      { title: 'Project Management Terms', path: '/project-management-terms', items: [] },
      { title: 'Project Management Principles', path: '/project-management-principles', items: [] },
      { title: 'Project Approaches', path: '/project-approaches', items: [] },
      { title: 'Project Performance Domains', path: '/project-performance-domains', items: [] },
      { title: 'Project Common ITTOs', items: [] },
      { title: 'Project Processes', items: [] },
      { title: 'Agile Mindset and Leadership', items: [] },
      { title: 'AI in Project Management', items: [] },
    ],
    mobile: [
      { title: 'Core SDK', items: [
        ['React Native', '/rn-core', 'react.png'],
        ['Flutter', '/flutter-core', 'flutter.png'],
        ['Android', '/android-core', 'kotlin.png'],
        ['iOS', '/ios-core', 'swift.png'],
      ] },
      { title: 'UI Kit', items: [
        ['React Native', '/react-native', 'react.png'],
        ['Flutter', '/flutter', 'flutter.png'],
        ['Android', '/android', 'kotlin.png'],
        ['iOS', '/ios', 'swift.png'],
      ] },
    ],
  };
  const allLearningGroups = [...sdkGroups.web, ...sdkGroups.mobile];

  const SDKMenu = () => (
    <div className="home-sdk-menu" role="region" aria-label="SDK documentation">
      <div className="home-sdk-menu__platforms">
        {[
          ['web', 'Project Management', 'resources/web.svg'],
          ['mobile', 'Personal Finance', 'resources/mobile.svg'],
          ['product', 'Product Development', 'resources/web.svg'],
        ].map(([platform, label, icon]) => (
          <button
            key={platform}
            type="button"
            className={sdkPlatform === platform ? 'is-active' : ''}
            onMouseEnter={() => setSdkPlatform(platform)}
            onFocus={() => setSdkPlatform(platform)}
            onClick={() => setSdkPlatform(platform)}
          >
            <SDKIcon name={icon} />
            <span><strong>{label}</strong></span>
          </button>
        ))}
        <a
          className="home-sdk-menu__link"
          href="http://localhost:3000/my-personal-branding-page/api#/"
          onClick={() => setSdkMenuOpen(false)}
        >
          <SDKIcon name="resources/web.svg" />
          <span><strong>Technical Knowledge</strong><small>Explore technical resources</small></span>
        </a>
      </div>
      <div className="home-sdk-menu__groups">
        {(sdkPlatform === 'product' ? allLearningGroups : sdkGroups[sdkPlatform]).map((group) => (
          <section key={group.title}>
            <h3>
              {group.path ? (
                <a href={useBaseUrl(group.path)} onClick={() => setSdkMenuOpen(false)}>
                  {group.title}
                </a>
              ) : group.title}
            </h3>
            <ul>
              {group.items.map(([label, path, icon]) => (
                <li key={path}>
                  <SDKDocLink path={path} icon={icon} onClick={() => setSdkMenuOpen(false)}>
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
        <a href={homeHref} className="flex items-center gap-3 group text-decoration-none">
          <div className="home-header__monogram">HT</div>
          <div>
            <span className="home-header__name">Tan (Harry) Tran</span>
            <span className="home-header__subtitle">Technical Project Manager</span>
          </div>
        </a>

        <div className="home-header__actions">
          <nav className="home-header__nav" aria-label="Main navigation">
            {navigationItems.map((item) => <a key={item.name} href={item.href}>{item.name}</a>)}
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
            <a href={resumeHref} className="home-header__cta">
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
          {showThemeToggle && <BrowserOnly>{() => <ThemeToggle />}</BrowserOnly>}
        </div>
      </div>

      {mobileMenuOpen && (
        <nav id="home-mobile-navigation" className="home-header__mobile-nav" aria-label="Mobile navigation">
          {navigationItems.map((item) => (
            <a key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>{item.name}</a>
          ))}
          <div className="home-sdk-mobile">
            <SDKMenuButton />
            {sdkMenuOpen && <SDKMenu />}
          </div>
          <a href={resumeHref} className="home-header__cta" onClick={() => setMobileMenuOpen(false)}>
            View my Resume
          </a>
        </nav>
      )}
    </header>
  );
}
