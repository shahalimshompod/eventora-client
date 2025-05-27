import React, { createContext, useState } from "react";

// creating context
export const DataContext = createContext();
const DataContextProvider = ({ children }) => {
  const [data, setData] = useState("Sompod");

  const dataInfo = {
    data,
    setData,
  };
  return (
    <DataContext.Provider value={dataInfo}>{children}</DataContext.Provider>
  );
};

export default DataContextProvider;
