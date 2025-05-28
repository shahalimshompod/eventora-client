import React from "react";
import HomeBanner from "../Sections/Home/HomeBanner";
import FeaturedEvents from "../Sections/Home/FeaturedEvents";
import WelcomeSection from "../Sections/Home/WelcomeSection";
import CategorySection from "../Sections/Home/CategorySection";

const HomeLayout = () => {
  return (
    <div>
      <HomeBanner />
      <WelcomeSection />
      <FeaturedEvents />
      <CategorySection />
    </div>
  );
};

export default HomeLayout;
