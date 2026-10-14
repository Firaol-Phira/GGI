import React from "react";
import { Link } from "react-router-dom";
import "./CorePillars.css";

const PILLARS = [
  {
    icon: "bi-shield-check",
    title: "Transparent Ledgers",
    description:
      "Every monthly and yearly contribution is digitally logged, audited, and accessible to members at all times.",
  },
  {
    icon: "bi-people-fill",
    title: "Member Ownership",
    description:
      "Goal Gate Institution belongs to its members. Every registered voice matters in shaping our strategic direction.",
  },
  {
    icon: "bi-graph-up-arrow",
    title: "Shared Dividends",
    description:
      "As GGI expands its investment initiatives, financial growth and created returns are redistributed back to our members.",
  },
  {
    icon: "bi-diagram-3-fill",
    title: "Flexible Collaboration",
    description:
      "Dynamic task management and project allocation designed to empower members to contribute skills and build value.",
  },
];

function CorePillars() {
  return (
    <section className="core-pillars-section py-5">
      <div className="container py-4">
        {/* Section Header */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8">
            <span className="section-subtitle-badge d-inline-block mb-3">
              Core Pillars of GGI
            </span>
            <h2 className="section-title display-5 fw-bold mb-3">
              Built on trust, growth, and collective success
            </h2>
            <p className="section-lead text-muted fs-5">
              Goal Gate Institution brings modern financial structure and
              transparent management together to help members build lasting
              wealth.
            </p>
          </div>
        </div>

        {/* Pillars Cards Grid */}
        <div className="row g-4 mb-5">
          {PILLARS.map((pillar, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="pillar-card h-100 p-4 rounded-4 shadow-sm border-0 d-flex flex-column">
                <div className="pillar-icon-box mb-4 d-flex align-items-center justify-content-center rounded-circle">
                  <i className={`bi ${pillar.icon} fs-3`}></i>
                </div>
                <h4 className="pillar-card-title fw-bold mb-3">
                  {pillar.title}
                </h4>
                <p className="pillar-card-desc text-muted mb-0 flex-grow-1">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Callout Box matching the Hero Green Box style */}
        <div className="pillar-callout-box p-4 p-md-5 rounded-4 shadow-lg text-white">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <span className="callout-tag mb-2 d-inline-block fw-semibold">
                Member-First Ecosystem
              </span>
              <h3 className="fw-bold mb-2">
                Ready to grow your future with GGI?
              </h3>
              <p className="mb-0 text-light opacity-90 fs-6">
                Join hundreds of active members simplifying their contributions
                and unlocking sustainable wealth options today.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link
                to="/About"
                className=" btn-gold-action px-4 py-3 fw-bold rounded-3 shadow-sm text-decoration-none d-inline-block"
              >
                Learn More About GGI
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CorePillars;
