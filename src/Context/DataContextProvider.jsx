import React, { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../Auth/AuthContextProvider";

// creating context
export const DataContext = createContext();
const DataContextProvider = ({ children }) => {
  const [eventData, setEventData] = useState([]);
  const axiosPublic = useAxiosPublic();

  // fetch all events data
  const fetchData = async () => {
    const res = await axiosPublic.get("/all-events");
    if (res?.data) {
      setEventData(res?.data);
    }
  };

  // fetching data
  useEffect(() => {
    fetchData();
  }, [axiosPublic]);

  const dataInfo = {
    eventData,
    setEventData,
  };
  return (
    <DataContext.Provider value={dataInfo}>{children}</DataContext.Provider>
  );
};

export default DataContextProvider;
