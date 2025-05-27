import React from "react";
import HomeBanner from "../Sections/Home/HomeBanner";
import FeaturedEvents from "../Sections/Home/FeaturedEvents";
import WelcomeSection from "../Sections/Home/WelcomeSection";

const HomeLayout = () => {
  return (
    <div>
      <HomeBanner />
      <WelcomeSection />
      <FeaturedEvents />
    </div>
  );
};

export default HomeLayout;
