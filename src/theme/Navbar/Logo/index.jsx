import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function NavbarLogo() {
  const homeHref = useBaseUrl('/');

  return (
    <Link
      to={homeHref}
      className="navbar__brand flex items-center gap-3 group text-decoration-none"
      aria-label="Tan (Harry) Tran - Home"
    >
      <div className="home-header__monogram">
        HT
      </div>
      <div className="navbar__brand-text flex flex-col justify-center">
        <span className="home-header__name">
          Tan (Harry) Tran
        </span>
        <span className="home-header__subtitle">
          Technical Project Manager
        </span>
      </div>
    </Link>
  );
}

