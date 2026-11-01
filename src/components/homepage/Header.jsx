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

function LearningIcon({ name }) {
  const illustrations = {
    introduction: (
      <>
        <path d="M32 9v4m-12-1 2.5 3m19-3L39 15" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        <path d="M23 23a9 9 0 1 1 18 0c0 3-2 4-3 6H26c-1-2-3-3-3-6Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
        <path d="M15 31h15c2 0 3 1 3 3v17c-2-2-4-3-7-3H15V31Zm34 0H34c-2 0-3 1-3 3v17c2-2 4-3 7-3h11V31Z" fill="#fff" stroke="#0757b8" strokeWidth="2" strokeLinejoin="round" />
        <path d="M20 37h7m-7 5h7m14-5h-5m5 5h-5" stroke="#1683e8" strokeWidth="1.7" strokeLinecap="round" />
      </>
    ),
    terms: (
      <>
        <path d="m32 10 2 2 4-.5 1-3 4 1-.2 3.2 3 2.5 3-1.1 2 3.6-2.5 2.1.1 4 2.5 2-1.7 3.7-3.1-.7-3 2.5-.1 3.2-4 .8-1.2-2.9-3.9-1-2.4 2-3.2-2.6 1.4-2.9-1.8-3.5-3.1-.7v-4l3.1-.8 1.7-3.5-1.4-2.9 3.1-2.7 2.5 2 3.8-.9Z" fill="#1683e8" />
        <circle cx="40" cy="24" r="7" fill="#eff6ff" />
        <circle cx="18" cy="35" r="4.5" fill="#1683e8" />
        <circle cx="32" cy="33" r="5.5" fill="#1683e8" />
        <circle cx="46" cy="35" r="4.5" fill="#1683e8" />
        <path d="M9 49c0-5 4-8 9-8s9 3 9 8v2H9v-2Zm13 1c0-6 4-10 10-10s10 4 10 10v1H22v-1Zm13-1c0-5 4-8 9-8s9 3 9 8v2H35v-2Z" fill="#60b5f6" stroke="#0757b8" strokeWidth="1.5" />
      </>
    ),
    principles: (
      <>
        <path d="M32 13v36m-17-28h34M18 21 9 38h18L18 21Zm28 0-9 17h18L46 21Z" fill="#fbbf24" stroke="#0757b8" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="32" cy="12" r="3" fill="#1683e8" />
        <path d="M24 52h16m-8-3v3m-12 3h24" stroke="#1683e8" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
    approaches: (
      <>
        <circle cx="31" cy="34" r="20" fill="#fff" stroke="#fb7185" strokeWidth="6" />
        <circle cx="31" cy="34" r="11" fill="none" stroke="#fb7185" strokeWidth="5" />
        <circle cx="31" cy="34" r="3.5" fill="#0757b8" />
        <path d="m32 33 17-17m-5 0h8v8" fill="none" stroke="#0757b8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M49 10h8v8l-9 1-5-5 1-9h5v5Z" fill="#fbbf24" />
      </>
    ),
    performance: (
      <>
        <rect x="10" y="39" width="12" height="14" rx="2" fill="#1683e8" />
        <rect x="27" y="31" width="12" height="22" rx="2" fill="#1683e8" />
        <rect x="44" y="21" width="11" height="32" rx="2" fill="#1683e8" />
        <path d="M12 33c12-2 22-8 35-20m-8 1 9-2-2 9" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 54h49" stroke="#0757b8" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    ittos: (
      <>
        <rect x="14" y="14" width="36" height="41" rx="4" fill="#fff" stroke="#0757b8" strokeWidth="2.5" />
        <rect x="25" y="10" width="14" height="8" rx="3" fill="#1683e8" />
        <path d="m20 29 3 3 5-6m-8 14 3 3 5-6m-8 14 3 3 5-6" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34 29h10m-10 11h10m-10 11h10" stroke="#0757b8" strokeWidth="2.5" strokeLinecap="round" />
      </>
    ),
    processes: (
      <>
        <rect x="23" y="8" width="18" height="10" rx="3" fill="#60b5f6" stroke="#0757b8" strokeWidth="1.8" />
        <path d="M32 18v8m0 0H16v8m16-8h16v8" fill="none" stroke="#0757b8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="m32 22 7 6-7 7-7-7 7-6Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
        <rect x="7" y="35" width="18" height="10" rx="3" fill="#60b5f6" stroke="#0757b8" strokeWidth="1.8" />
        <rect x="39" y="35" width="18" height="10" rx="3" fill="#60b5f6" stroke="#0757b8" strokeWidth="1.8" />
      </>
    ),
    agile: (
      <>
        <path d="M32 12v15" stroke="#1683e8" strokeWidth="2.5" />
        <path d="m32 14 15 3-15 5V14Z" fill="#ef4444" />
        <path d="m32 29-8 9h16l-8-9Z" fill="#60b5f6" />
        <circle cx="17" cy="40" r="4.5" fill="#1683e8" />
        <circle cx="32" cy="38" r="5.5" fill="#1683e8" />
        <circle cx="47" cy="40" r="4.5" fill="#1683e8" />
        <path d="M7 52c0-5 4-8 10-8s10 3 10 8v2H7v-2Zm15 0c0-6 4-10 10-10s10 4 10 10v2H22v-2Zm15 0c0-5 4-8 10-8s10 3 10 8v2H37v-2Z" fill="#60b5f6" stroke="#0757b8" strokeWidth="1.5" />
      </>
    ),
    ai: (
      <>
        <rect x="18" y="18" width="28" height="28" rx="5" fill="#fff" stroke="#7c3aed" strokeWidth="2.5" />
        <path d="M24 12v6m8-9v9m8-6v6m-16 28v6m8-6v9m8-9v6M12 24h6m-9 8h9m-6 8h6m28-16h6m-6 8h9m-9 8h6" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />
        <text x="32" y="36" textAnchor="middle" fill="#0757b8" fontSize="12" fontWeight="700">AI</text>
      </>
    ),
  };

  return (
    <svg className="home-sdk-menu__learning-icon" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="31" fill="#eff6ff" />
      {illustrations[name]}
    </svg>
  );
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
      { title: 'Introduction to Project Management', path: '/introduction-to-project-management', icon: 'introduction', items: [] },
      { title: 'Project Management Terms', path: '/project-management-terms', icon: 'terms', items: [] },
      { title: 'Project Management Principles', path: '/project-management-principles', icon: 'principles', items: [] },
      { title: 'Project Approaches', path: '/project-approaches', icon: 'approaches', items: [] },
      { title: 'Project Performance Domains', path: '/project-performance-domains', icon: 'performance', items: [] },
      { title: 'Project Common ITTOs', icon: 'ittos', items: [] },
      { title: 'Project Processes', icon: 'processes', items: [] },
      { title: 'Agile Mindset and Leadership', icon: 'agile', items: [] },
      { title: 'AI in Project Management', icon: 'ai', items: [] },
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
          <h3 className={group.icon ? 'home-sdk-menu__item-heading' : undefined}>
            {group.icon && <LearningIcon name={group.icon} />}
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
