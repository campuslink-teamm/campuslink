import { Link, NavLink } from 'react-router-dom';

import './AuthenticatedHeader.css';

const navigationLinks = [
  { to: '/trips', label: 'Kelionės' },
  { to: '/my-listings', label: 'Mano skelbimai' },
  { to: '/profile', label: 'Mano profilis' },
];

export default function AuthenticatedHeader() {
  return (
    <header className="authenticated-header">
      <Link
        className="authenticated-brand"
        to="/feed"
        aria-label="CampusLink – veiklų puslapis"
      >
        <img src="/images/logo.png" alt="CampusLink" />
      </Link>

      <nav className="authenticated-nav" aria-label="Pagrindinė navigacija">
        {navigationLinks.map(({ to, label }) => (
          <NavLink
            className={({ isActive }) => (
              isActive
                ? 'authenticated-nav-link active'
                : 'authenticated-nav-link'
            )}
            end
            key={to}
            to={to}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
