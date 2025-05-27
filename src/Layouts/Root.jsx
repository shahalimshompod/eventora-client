import React from "react";
import HomeBanner from "../Sections/Home/HomeBanner";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import DataContextProvider from "../Context/DataContextProvider";

const Root = () => {
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
