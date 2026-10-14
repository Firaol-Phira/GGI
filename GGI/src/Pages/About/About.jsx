import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const LEADERSHIP_ROLES = [
  {
    role: "Board Chairman",
    description:
      "Elected by democratic member votes to lead strategic planning and institutional direction.",
    icon: "bi-person-badge-fill",
  },
  {
    role: "Executive Committee",
    description:
      "Conducted monthly via Google Meet to oversee monthly contribution auditing and program execution.",
    icon: "bi-people-fill",
  },
  {
    role: "All Members",
    description:
      "Composed of all 25 founding members and the Executive Committees are elected annually by the full Members",
    icon: "bi-bank2",
  },
];

function About() {
  return (
    <div className="about-ggi-page">
      {/* 1. Hero Banner */}
      <section className="about-hero text-white text-center py-5">
        <div className="container py-4">
          <span className="about-subtitle-badge d-inline-block mb-3">
            Our Journey & Vision
          </span>
          <h1 className="display-4 fw-bold mb-3 text-gold">
            About Goal Gate Institution
          </h1>
          <p className="lead text-light opacity-90 mx-auto max-w-700 mb-0">
            From 25 visionary high school graduates to a growing
            university-driven institution committed to building real value and
            long-term member profitability.
          </p>
        </div>
      </section>

      {/* 2. Founding Story Section */}
      <section className="py-5 bg-offwhite">
        <div className="container py-3">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="text-uppercase fw-bold text-success mb-2 d-block letter-spacing-1">
                Founded in 2024
              </span>
              <h2 className="display-6 fw-bold mb-4 text-navy">
                The Story Behind GGI
              </h2>
              <p className="text-muted fs-6 lh-base mb-3">
                Goal Gate Institution was established in 2024 by{" "}
                <strong>
                  25 ambitious students from Burka Sebeta High School
                </strong>{" "}
                after successfully passing the national university entrance
                examination.
              </p>
              <p className="text-muted fs-6 lh-base mb-4">
                Now continuing their academic journeys as university students
                across various disciplines, these founders united around a
                shared goal: to build an impactful institution that delivers
                meaningful value to both our audience and our members.
              </p>
              <div className="p-3 rounded-3 callout-green-border bg-white shadow-sm">
                <p className="mb-0 text-navy fw-semibold">
                  <i className="bi bi-quote fs-3 text-gold me-2 align-middle"></i>
                  "Today it is a child, but tomorrow it will be a powerhouse
                  that makes all its members profitable."
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="p-4 p-md-5 rounded-4 shadow-lg text-white card-emerald-bg">
                <h3 className="fw-bold mb-4 text-gold border-bottom border-warning pb-2">
                  At a Glance
                </h3>
                <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                  <li className="d-flex align-items-center gap-3">
                    <i className="bi bi-mortarboard-fill fs-3 text-gold"></i>
                    <div>
                      <strong className="d-block text-white">
                        Student-Led Roots
                      </strong>
                      <span className="text-light opacity-85 fs-7">
                        Initiated by 25 Burka Sebeta High School graduates in
                        2024
                      </span>
                    </div>
                  </li>
                  <li className="d-flex align-items-center gap-3">
                    <i className="bi bi-graph-up-arrow fs-3 text-gold"></i>
                    <div>
                      <strong className="d-block text-white">
                        Growth Phase
                      </strong>
                      <span className="text-light opacity-85 fs-7">
                        Building structured monthly/yearly contributions toward
                        future enterprise investments
                      </span>
                    </div>
                  </li>
                  <li className="d-flex align-items-center gap-3">
                    <i className="bi bi-check-circle-fill fs-3 text-gold"></i>
                    <div>
                      <strong className="d-block text-white">
                        Democratic Governance
                      </strong>
                      <span className="text-light opacity-85 fs-7">
                        Board Chairman and Executive Committee elected directly
                        by member votes
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision Cards */}
      <section className="py-5 text-white section-navy-bg">
        <div className="container py-3">
          <div className="row g-4">
            {/* Mission Card */}
            <div className="col-md-6">
              <div className="p-4 p-md-5 rounded-4 h-100 card-mission border-0 shadow-sm">
                <div className="fs-1 mb-3 text-gold">
                  <i className="bi bi-rocket-takeoff-fill"></i>
                </div>
                <h3 className="fw-bold mb-3 text-white">Our Mission</h3>
                <p className="text-light opacity-90 fs-6 lh-base mb-0">
                  Today GGI is a young, growing seedling; our mission is to
                  cultivate this foundation through structured contributions,
                  flexible collaboration, and audited transparency so that GGI
                  directly generates profitability and long-term financial
                  freedom for every member.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="col-md-6">
              <div className="p-4 p-md-5 rounded-4 h-100 card-vision border-0 shadow-sm">
                <div className="fs-1 mb-3 text-gold">
                  <i className="bi bi-eye-fill"></i>
                </div>
                <h3 className="fw-bold mb-3 text-white">Our Vision</h3>
                <p className="text-light opacity-90 fs-6 lh-base mb-0">
                  To become one of the largest, most impactful, and highly
                  profitable financial institutions in the region—setting a
                  national standard for youth-led cooperative excellence and
                  member ownership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Section */}
      <section className="py-5 bg-offwhite">
        <div className="container py-3">
          <div className="text-center mb-5">
            <span className="about-subtitle-badge d-inline-block mb-2">
              Guiding Principles
            </span>
            <h2 className="display-6 fw-bold text-navy">Our Core Values</h2>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="card h-100 p-4 border-0 shadow-sm rounded-4 text-center">
                <div className="fs-1 mb-3 text-emerald">
                  <i className="bi bi-sliders"></i>
                </div>
                <h4 className="fw-bold text-navy mb-2">Flexibility</h4>
                <p className="text-muted mb-0">
                  Adapting payment windows, project tasks, and member
                  participation to accommodate Environmental situation and
                  member capabilities.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 p-4 border-0 shadow-sm rounded-4 text-center">
                <div className="fs-1 mb-3 text-emerald">
                  <i className="bi bi-shield-check"></i>
                </div>
                <h4 className="fw-bold text-navy mb-2">Transparency</h4>
                <p className="text-muted mb-0">
                  Maintaining fully logged and audited contribution ledgers so
                  every single member can inspect financials at any time.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 p-4 border-0 shadow-sm rounded-4 text-center">
                <div className="fs-1 mb-3 text-emerald">
                  <i className="bi bi-gem"></i>
                </div>
                <h4 className="fw-bold text-navy mb-2">
                  Collective Profitability
                </h4>
                <p className="text-muted mb-0">
                  Ensuring all institutional decisions, projects, and ventures
                  directly enrich the members who build GGI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Governance & Leadership */}
      <section className="py-5 bg-white">
        <div className="container py-3">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold text-navy">
              Democratic Governance
            </h2>
            <p className="text-muted fs-6">
              Leadership at GGI is elected by democratic member voting during
              General Assemblies.
            </p>
          </div>

          <div className="row g-4">
            {LEADERSHIP_ROLES.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="p-4 rounded-4 shadow-sm border border-light text-center h-100">
                  <div className="fs-2 mb-3 text-gold">
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <h4 className="fw-bold text-navy mb-2">{item.role}</h4>
                  <p className="text-muted mb-0">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="  rounded-4 py-5 container  text-center text-white card-emerald-bg">
        <div className=" py-3">
          <h2 className="fw-bold mb-3">Are you a GGI Member?</h2>
          <p className="lead text-light opacity-90 mb-4 max-w-700 mx-auto">
            Log in to view your contribution statements, upcoming committee
            meetings, and quarterly assembly schedules.
          </p>
          <Link
            to="/member"
            className="btn btn-lg btn-gold px-5 py-3 rounded-pill fw-bold text-decoration-none shadow-sm d-inline-block"
          >
            Access Member Portal
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
