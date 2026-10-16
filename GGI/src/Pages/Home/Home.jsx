import React from "react";
import Banner from "../../Components/Banner/Banner";
import CorePillars from "../../Components/CorePillars/CorePillars";
import CTA from "../../Components/CTA/CTA.jsx";
import NewsAndAnnouncements from "../NewsAndAnnouncement/NewsAndAnnouncements.jsx";
import NewsSection from "../../Components/NewsSection/NewsSection.jsx";


function Home() {
  return (
    <div>
  <Banner/>
  <CorePillars/>
  <NewsAndAnnouncements/>

  <CTA/>
    </div>
  );
}

export default Home;
