import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import DataContextProvider from "../Context/DataContextProvider";
import LoginModal from "../Components/LoginModal";
import { Toaster } from "react-hot-toast";
import Footer from "../Components/Footer";

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
        <Toaster />
        <Navbar />
        <Outlet />
        <Footer />
        <LoginModal />
      </div>
    </DataContextProvider>
  );
};

export default Root;
