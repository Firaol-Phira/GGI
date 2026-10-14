import React from "react";
import { Link } from "react-router-dom";
import "./CTA.css";

function CTA() {
  return (
    <section className="final-cta-section py-5 text-white">
      <div className="container py-4">
        {/* Background Decorative Accent Box matching Hero style */}
        <div className="cta-content-wrapper p-4 p-md-5 rounded-4 shadow-lg text-center position-relative overflow-hidden">
          {/* Subtle Green Overlay Accent */}
          <div className="cta-overlay-accent rounded-circle position-absolute"></div>

          <div className="row justify-content-center position-relative z-index-2">
            <div className="col-lg-10">
              <span className="cta-subtitle-badge d-inline-block mb-3 px-3 py-1 rounded-pill fw-semibold">
                Engage with GGI
              </span>

              <h2 className="display-5 fw-bold mb-4 cta-title">
                Ready to Access <span className="text-gold">Your Future</span>{" "}
                or Get Your Questions Answered?
              </h2>

              <p className="lead text-light opacity-90 mx-auto max-w-700 mb-5 cta-lead">
                GGI is a member-owned institution built by students for
                students. Log in to manage your active portfolio or contact our
                team to learn how to join Ethiopia's rising financial
                cooperative.
              </p>

              {/* Dual Action Buttons */}
              <div className="d-flex flex-wrap justify-content-center gap-3 gap-md-4 cta-actions">
                {/* Primary CTA: Member Sign In */}
                <Link
                  to="/login"
                  className=" btn-lg btn-gold-fill px-4 py-3 rounded-pill fw-bold text-decoration-none shadow"
                >
                  <i className="bi bi-box-arrow-in-right me-2 align-middle"></i>
                  Sign In to Member Portal
                </Link>

                {/* Secondary CTA: Contact Team */}
                <Link
                  to="/contact"
                  className=" btn-lg btn-outline-light-emerald px-4 py-3 rounded-pill fw-bold text-decoration-none shadow-sm"
                >
                  <i className="bi bi-chat-dots me-2 align-middle"></i>
                  Contact GGI Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
