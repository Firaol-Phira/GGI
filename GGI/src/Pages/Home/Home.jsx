import React from "react";
import Banner from "../../Components/Banner/Banner";
import CorePillars from "../../Components/CorePillars/CorePillars";
import NewsSection from "../../Components/NewsSection/NewsSection";
import CTA from "../../Components/CTA/CTA.jsx";


function Home() {
  return (
    <div>
  <Banner/>
  <CorePillars/>
  <NewsSection/>
  <CTA/>
    </div>
  );
}

export default Home;
