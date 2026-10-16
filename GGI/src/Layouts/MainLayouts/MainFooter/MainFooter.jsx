import React from "react";
import { Link } from "react-router-dom";
import "./MainFooter.css";

function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer pt-5 text-white">
      <div className="container py-4">
        <div className="row g-4 pb-4 border-bottom border-secondary border-opacity-25">
          {/* Column 1: Brand Info & Mission */}
          <div className="col-lg-4 col-md-6">
            <div className="mb-3">
              <Link to="/" className="text-decoration-none d-inline-block">
                <span className="fs-2 fw-bold text-gold tracking-wide">
                  GGI
                </span>
              </Link>
            </div>
            <p className="footer-desc text-light opacity-80 mb-4 fs-6">
              Goal Gate Institution is a member-owned, youth-led cooperative
              dedicated to digital contribution tracking, financial
              transparency, and collective wealth creation.
            </p>
            <div className="d-flex align-items-center gap-3">
              <a href="#" className="social-icon-link" aria-label="Tiktok">
                <i className="bi bi-tiktok"></i>
              </a>
              <a href="#" className="social-icon-link" aria-label="Telegram">
                <i className="bi bi-telegram"></i>
              </a>
              <a href="#" className="social-icon-link" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="social-icon-link" aria-label="Email">
                <i className="bi bi-envelope-fill"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="fw-bold text-gold mb-3 text-uppercase fs-6 tracking-wide">
              Quick Links
            </h5>
            <ul className="list-unstyled footer-links mb-0 d-flex flex-column gap-2">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/About" className="footer-link">
                  About GGI
                </Link>
              </li>
              <li>
                <Link to="/Programs" className="footer-link">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/NewsAndAnnouncements" className="footer-link">
                  News & Audits
                </Link>
              </li>
              <li>
                <Link to="/Gallery" className="footer-link">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/Contact" className="footer-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Member & Admin Gateway */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold text-gold mb-3 text-uppercase fs-6 tracking-wide">
              Portals & Governance
            </h5>
            <ul className="list-unstyled footer-links mb-3 d-flex flex-column gap-2">
              <li>
                <Link
                  to="/login"
                  className="footer-link d-inline-flex align-items-center"
                >
                  <i className="bi bi-box-arrow-in-right text-emerald me-2"></i>
                  Member Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="footer-link d-inline-flex align-items-center"
                >
                  <i className="bi bi-shield-lock-fill text-gold me-2"></i>
                  Admin Console
                </Link>
              </li>
            </ul>
            <div className="p-3 rounded-3 bg-emerald-subtle border border-success border-opacity-25">
              <p className="mb-0 fs-7 text-light opacity-90">
                <i className="bi bi-info-circle-fill text-gold me-2"></i>
                Monthly audit contribution window: First 5 days of each month.
              </p>
            </div>
          </div>

          {/* Column 4: Institution Details */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold text-gold mb-3 text-uppercase fs-6 tracking-wide">
              Institution Info
            </h5>
            <ul className="list-unstyled footer-contact mb-0 d-flex flex-column gap-3 text-light opacity-85">
              <li className="d-flex gap-3">
                <i className="bi bi-geo-alt-fill text-emerald fs-5"></i>
                <span>Shegger, Ethiopia</span>
              </li>
              <li className="d-flex gap-3">
                <i className="bi bi-calendar3 text-emerald fs-5"></i>
                <span>Founded in 2024 by 25 High School Graduates</span>
              </li>
              <li className="d-flex gap-3">
                <i className="bi bi-diagram-3-fill text-emerald fs-5"></i>
                <span>Elected Board Chairman & Executive Committee</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-4 d-flex flex-wrap align-items-center justify-content-between gap-3 text-light opacity-75 fs-7">
          <p className="mb-0">
            &copy; {currentYear} <strong>Goal Gate Institution (GGI)</strong>.
            All rights reserved.
          </p>
          <div className="d-flex align-items-center gap-4">
            <span className="footer-legal-text">Privacy Policy</span>
            <span className="footer-legal-text">Terms of Service</span>
            <span className="footer-legal-text">Audit Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MainFooter;
