import React, { useContext } from "react";
import { DataContext } from "../Context/DataContextProvider";
import EventCard from "../Components/EventCard";

const Events = () => {
  const { eventData } = useContext(DataContext);
  return (
    <div className="my-24">
      <div className="relative events-bg-image py-44">
        <div className="absolute top-0 left-0 w-full h-full bg-black/85  flex flex-col items-center justify-center text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FE3E01]/30 via-[#FE3E01]/20 to-[#FE3E01]/30 flex flex-col items-center justify-center text-center">
            <div className="border-l-4 border-l-[#FE3E01] text-black/2 mb-6">
              .
            </div>
            <h1 className="text-8xl marcel text-white">Events</h1>
          </div>
        </div>
      </div>
      <div className="py-16 xl:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 container mx-auto gap-4">
          {eventData.map((data, idx) => (
            <EventCard data={data} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
