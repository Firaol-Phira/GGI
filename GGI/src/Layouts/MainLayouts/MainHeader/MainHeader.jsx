import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./MainHeader.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/About" },
  { label: "Programs", href: "/programs" },
  { label: "News", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

function MainHeader() {
  const location = useLocation();
  const pathname = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close mobile menu with the Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="main-header sticky-top shadow-sm">
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container">
          {/* Logo / Brand */}
          <Link to="/" className="navbar-brand fw-bold fs-3 text-gold">
            GGI
          </Link>

          {/* Mobile Toggle Button with custom icon switch */}
          <button
            type="button"
            className={`navbar-toggler border-0 custom-toggler ${
              menuOpen ? "is-open" : ""
            }`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="navbarNav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {/* Swaps between hamburger and X icon */}
            <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"} fs-2`}></i>
          </button>

          {/* Navigation Links Collapsible Container */}
          <div
            id="navbarNav"
            className={`collapse navbar-collapse justify-content-end ${
              menuOpen ? "show" : ""
            }`}
          >
            <ul className="navbar-nav align-items-lg-center gap-lg-2">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <li className="nav-item" key={link.href}>
                    <Link
                      to={link.href}
                      className={`nav-link px-3 rounded-pill transition-all ${
                        active
                          ? "active textlink fw-semibold"
                          : "text-light-custom"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}

              {/* Quick CTA Button for Member Portal */}
              <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                <Link to="/Login" className="btnm rounded-pill px-4 shadow-sm">
                Sign in
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MainHeader;
