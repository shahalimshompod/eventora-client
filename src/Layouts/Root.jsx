import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import DataContextProvider from "../Context/DataContextProvider";

const Root = () => {
  // data aos setup
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Animate only once per scroll
    });
  }, []);

  return (
    <DataContextProvider>
      <div>
        <Navbar />
        <Outlet />
      </div>
    </DataContextProvider>
  );
};

export default Root;
