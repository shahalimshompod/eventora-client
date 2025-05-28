import React from "react";
import EventCard from "../Components/EventCard";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useState } from "react";
import { useEffect } from "react";

const EventsByCategory = () => {
  const { category } = useParams();
  const [categoryWiseData, setCategoryWiseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  //   fetch func
  const fetchData = async () => {
    setLoading(true);
    const res = await axiosPublic.get(
      `/events-by-category?category=${category}`
    );
    if (res?.data) {
      setCategoryWiseData(res?.data);
      setLoading(false);
    }
  };

  //   fatching data
  useEffect(() => {
    fetchData();
  }, [axiosPublic]);
  return (
    <div className="my-24">
      <div className="relative events-bg-image py-44">
        <div className="absolute top-0 left-0 w-full h-full bg-black/85  flex flex-col items-center justify-center text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FE3E01]/30 via-[#FE3E01]/20 to-[#FE3E01]/30 flex flex-col items-center justify-center text-center">
            <div
              data-aos="fade-down"
              className="border-l-4 border-l-[#FE3E01] text-black/2 mb-6"
            >
              .
            </div>
            <h1 data-aos="fade-up" className="text-8xl marcel text-white">
              {category.charAt(0).toUpperCase() + category.slice(1)} Events
            </h1>
          </div>
        </div>
      </div>
      <div className="py-16 xl:py-20 px-3 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 container mx-auto gap-4">
          {categoryWiseData.map((data, idx) => (
            <EventCard data={data} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsByCategory;
