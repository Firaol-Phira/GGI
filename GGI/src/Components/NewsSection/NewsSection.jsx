import React from "react";
import { Link } from "react-router-dom";
import "./NewsSection.css";

const ANNOUNCEMENTS = [
  {
    id: 1,
    category: "Financial Audit",
    badgeColor: "badge-green",
    title: "Monthly Contribution Schedule & Window",
    date: "First 5 Days of Every Month",
    summary:
      "All active members are requested to complete their monthly contributions during the first 5 days of each month to ensure automated ledger auditing.",
  },
  {
    id: 2,
    category: "Financial Audit",
    badgeColor: "badge-green",
    title: "Quarterly Yearly-Contribution Target (25%)",
    date: "End of Current Quarter",
    summary:
      "Members enrolled in yearly plans must fulfill a minimum of 25% of their total annual commitment each quarter for audit compliance.",
  },
  {
    id: 3,
    category: "Committee Meeting",
    badgeColor: "badge-gold",
    title: "Monthly Executive Committee Meeting",
    date: "Monthly via Google Meet",
    summary:
      "The committee holds its regular monthly coordination assembly online via Google Meet. Link and agenda are shared in the member dashboard.",
  },
  {
    id: 4,
    category: "General Assembly",
    badgeColor: "badge-navy",
    title: "Quarterly All-Member General Assembly",
    date: "Quarterly All-Member Event",
    summary:
      "All registered GGI members gather quarterly to review financial statements, vote on project allocations, and discuss future growth initiatives.",
  },
];

function NewsSection() {
  return (
    <section className="news-announcements-section py-5">
      <div className="container py-4">
        {/* Section Header */}
        <div className="d-flex flex-wrap align-items-end justify-content-between mb-4 gap-3">
          <div>
            <span className="news-subtitle-badge d-inline-block mb-2">
              Updates & Schedules
            </span>
            <h2 className="news-section-title display-6 fw-bold mb-0">
              Latest News & Announcements
            </h2>
          </div>
          <div>
            <Link
              to="/news"
              className="btn btn-view-all-news px-4 py-2 rounded-pill fw-semibold shadow-sm text-decoration-none"
            >
              View All News <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>

        {/* News & Announcements Grid */}
        <div className="row g-4">
          {ANNOUNCEMENTS.map((item) => (
            <div className="col-12 col-md-6 col-lg-3" key={item.id}>
              <div className="news-card h-100 p-4 rounded-4 shadow-sm d-flex flex-column justify-content-between">
                <div>
                  {/* Category Badge & Date */}
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span
                      className={`badge news-badge ${item.badgeColor} rounded-pill px-3 py-2`}
                    >
                      {item.category}
                    </span>
                  </div>

                  <p className="news-timeframe text-muted mb-2 fw-semibold">
                    <i className="bi bi-clock-history me-2 text-gold-accent"></i>
                    {item.date}
                  </p>

                  <h5 className="news-card-title fw-bold mb-3">{item.title}</h5>

                  <p className="news-card-summary text-muted mb-4">
                    {item.summary}
                  </p>
                </div>

                {/* Read Details Action Link */}
                <div className="pt-3 border-top border-light-subtle">
                  <Link
                    to="/news"
                    className="news-read-more text-decoration-none fw-bold"
                  >
                    Read Details <i className="bi bi-chevron-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
