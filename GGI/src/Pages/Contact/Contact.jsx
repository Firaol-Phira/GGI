import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    userType: "Visitor", // Default option
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for sending message to back-end API goes here
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* Hero Header */}
      <section className="contact-hero text-white text-center py-5">
        <div className="container py-3">
          <span className="contact-subtitle-badge d-inline-block mb-3">
            Get In Touch
          </span>
          <h1 className="display-5 fw-bold text-gold mb-3">Contact GGI</h1>
          <p className="lead text-light opacity-90 mx-auto max-w-700 mb-0">
            Have questions about GGI membership, contribution audits, or
            upcoming assemblies? Send us a message or reach out through our
            official channels.
          </p>
        </div>
      </section>

      {/* Main Contact Container (Two Sub-Sections) */}
      <section className="py-5 bg-offwhite">
        <div className="container py-3">
          <div className="row g-4 g-lg-5 align-items-stretch">
            {/* SUB-SECTION 1: Contact Information & Details */}
            <div className="col-lg-5">
              <div className="contact-info-card p-4 p-md-5 rounded-4 shadow-sm h-100 d-flex flex-column justify-content-between">
                <div>
                  <span className="text-uppercase fw-bold text-emerald mb-2 d-block letter-spacing-1 fs-7">
                    Official Communication
                  </span>
                  <h2 className="fw-bold text-navy mb-4 fs-3">
                    Reach Out To Our Leadership Team
                  </h2>
                  <p className="text-muted mb-4 fs-6">
                    Goal Gate Institution operates collaboratively across Burka
                    Sebeta and university student chapters nationwide.
                  </p>

                  <ul className="list-unstyled d-flex flex-column gap-4 mb-4">
                    {/* Location */}
                    <li className="d-flex align-items-start gap-3">
                      <div className="info-icon-box rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                        <i className="bi bi-geo-alt-fill fs-5 text-emerald"></i>
                      </div>
                      <div>
                        <strong className="d-block text-navy">
                          HQ Location
                        </strong>
                        <span className="text-muted fs-6">
                          Shegger, Ethiopia
                        </span>
                      </div>
                    </li>

                    {/* Email */}
                    <li className="d-flex align-items-start gap-3">
                      <div className="info-icon-box rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                        <i className="bi bi-envelope-check-fill fs-5 text-emerald"></i>
                      </div>
                      <div>
                        <strong className="d-block text-navy">
                          Email Support
                        </strong>
                        <span className="text-muted fs-6">
                          info@goalgate.org / audit@goalgate.org
                        </span>
                      </div>
                    </li>

                    {/* Office / Meeting Schedule */}
                    <li className="d-flex align-items-start gap-3">
                      <div className="info-icon-box rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                        <i className="bi bi-clock-history fs-5 text-emerald"></i>
                      </div>
                      <div>
                        <strong className="d-block text-navy">
                          Audit & Committee Hours
                        </strong>
                        <span className="text-muted fs-6">
                          Audit Window: 1st - 5th of every month
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Direct Telegram / Google Meet Support Card */}
                <div className="p-3 rounded-3 bg-navy text-white mt-3">
                  <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-telegram fs-2 text-gold"></i>
                    <div>
                      <strong className="d-block text-gold">
                        Member Telegram Channel
                      </strong>
                      <span className="text-light opacity-80 fs-7">
                        Real-time updates & Google Meet assembly links
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SUB-SECTION 2: Send Message Form */}
            <div className="col-lg-7">
              <div className="send-message-card p-4 p-md-5 rounded-4 shadow-sm bg-white h-100 border-0">
                <div className="mb-4">
                  <span className="text-uppercase fw-bold text-gold mb-2 d-block letter-spacing-1 fs-7">
                    Direct Inquiry
                  </span>
                  <h2 className="fw-bold text-navy mb-2 fs-3">
                    Send Us A Message
                  </h2>
                  <p className="text-muted">
                    Fill out the form below and our Executive Committee will
                    respond shortly.
                  </p>
                </div>

                {submitted ? (
                  <div className="alert alert-success-custom p-4 rounded-4 text-center my-4">
                    <i className="bi bi-check-circle-fill fs-1 text-emerald d-block mb-3"></i>
                    <h4 className="fw-bold text-navy">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-muted mb-3">
                      Thank you for contacting Goal Gate Institution. Your
                      message has been logged for our administrative committee.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn btn-emerald-action rounded-pill px-4 py-2 text-white fw-bold"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column gap-3"
                  >
                    <div className="row g-3">
                      {/* Full Name */}
                      <div className="col-md-6">
                        <label className="form-label fw-semibold text-navy fs-7 mb-1">
                          Full Name 
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          className="form-control custom-input py-2 px-3"
                          placeholder="Enter Name"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Email Address */}
                      <div className="col-md-6">
                        <label className="form-label fw-semibold text-navy fs-7 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control custom-input py-2 px-3"
                          placeholder="Enter your email address"
                          required
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row g-3">
                      {/* User Type Selection */}
                      <div className="col-md-6">
                        <label className="form-label fw-semibold text-navy fs-7 mb-1">
                          I am a...
                        </label>
                        <select
                          name="userType"
                          className="form-select custom-input py-2 px-3"
                          value={formData.userType}
                          onChange={handleChange}
                        >
                          <option value="Visitor">
                            Visitor 
                          </option>
                          <option value="Active Member">
                            Member
                          </option>
                          <option value="Committee Member">
                            Executive Committee
                          </option>
                        </select>
                      </div>

                      {/* Subject */}
                      <div className="col-md-6">
                        <label className="form-label fw-semibold text-navy fs-7 mb-1">
                          Subject 
                        </label>
                        <input
                          type="text"
                          name="subject"
                          className="form-control custom-input py-2 px-3"
                          placeholder="e.g Contribution Inquiry"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="form-label fw-semibold text-navy fs-7 mb-1">
                        Your Message 
                      </label>
                      <textarea
                        name="message"
                        rows="5"
                        className="form-control custom-input p-3"
                        placeholder="Write your message or inquiry here..."
                        required
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="btn btn-navy-gold w-100 py-3 rounded-pill fw-bold shadow-sm"
                      >
                        <i className="bi bi-send-fill me-2"></i> Submit Message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
