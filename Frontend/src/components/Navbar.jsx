import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ProtectedChatLink from './auth/ProtectedChatLink';
import faviconImg from '../assets/favicon.png';
import '../styles/Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll position ke basis par navbar me glass effect toggle hota hai.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Kisi bhi nav item click par mobile menu close kar dete hain.
  const handleNavClick = () => setMenuOpen(false);

  // Mobile menu open ho to background scroll lock kar dete hain.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* Brand logo aur project title block. */}
            <Link to="/" className="navbar-logo" onClick={handleNavClick}>
              <img src={faviconImg} alt="GPT for BCA Logo" className="navbar-logo-img" />
              <span className="navbar-logo-text">GPT for BCA</span>
            </Link>

            {/* Desktop navigation links + protected Get Started CTA. */}
            <div className="navbar-links">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
                Home
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                About
              </NavLink>
              <NavLink to="/syllabus" className={({ isActive }) => isActive ? 'active' : ''}>
                Syllabus
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
                Contact
              </NavLink>
              <ProtectedChatLink className="navbar-cta">
                Get Started
              </ProtectedChatLink>
            </div>

            {/* Mobile hamburger button jo drawer open/close karta hai. */}
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              id="hamburger-btn"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay click karne par menu close ho jata hai. */}
      <div
        className={`mobile-overlay ${menuOpen ? 'open' : ''}`}
        onClick={handleNavClick}
        aria-hidden="true"
      />

      {/* Mobile drawer ke andar saare nav links render hote hain. */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} role="navigation" aria-label="Mobile navigation">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>
          About
        </NavLink>
        <NavLink to="/syllabus" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>
          Syllabus
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>
          Contact
        </NavLink>
        <ProtectedChatLink className="mobile-cta" onClick={handleNavClick}>
          Get Started →
        </ProtectedChatLink>
      </div>
    </>
  );
}
