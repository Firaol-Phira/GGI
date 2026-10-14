import {Link} from "react-router-dom";
import "./Banner.css";

const HIGHLIGHTS = [
  {
    title: "Pay monthly or yearly",
    text: "Choose the plan that fits you and pay online in minutes.",
  },
  {
    title: "A receipt for every payment",
    text: "Every contribution is recorded and you can view it any time.",
  },
  {
    title: "Share in our growth",
    text: "As GGI grows, members share in the success we build together.",
  },
];

 function Banner() {
  return (
    <section className="ggi-banner">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left: message and buttons */}
          <div className="col-lg-7">
            <p className="ggi-banner__tag">Welcome to Goal Gate Institution</p>

            <h1 className="ggi-banner__title">
              Growing together, building wealth together
            </h1>

            <p className="ggi-banner__text">
              Goal Gate Institution is a member-owned institute where every contribution is
              tracked, every member has a voice, and our success is shared.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Link href="/Register" className=" ggi-btn ggi-btn--gold">
                Join now
              </Link>
              <Link to="/About" className=" ggi-btn ggi-btn--outline">
                Learn more
              </Link>
            </div>
          </div>

          {/* Right: what members get */}
          <div className="col-lg-5">
            <div className="ggi-banner__card">
              <h2 className="ggi-banner__card-title">
                What you get as a member
              </h2>

              <ul className="list-unstyled mb-0">
                {HIGHLIGHTS.map((item) => (
                  <li key={item.title} className="ggi-banner__item">
                    <span className="ggi-banner__dot" aria-hidden="true" />
                    <div>
                      <h3 className="ggi-banner__item-title">{item.title}</h3>
                      <p className="ggi-banner__item-text">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Banner;