import React from "react";
import { useLocation } from "react-router-dom";
import { MdDateRange } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";

const EventCard = ({ data }) => {
  const routeLocation = useLocation();
  const path = routeLocation.pathname;
  const {
    _id,
    title,
    category,
    time,
    location,
    organizer,
    availableSeats,
    eventDate,
    image,
    featured,
  } = data;
  return (
    <div className="bg-base-100 w-full shadow-sm">
      <figure className="h-64 overflow-hidden">
        <img src={image} alt="Shoes" />
      </figure>
      <div className="p-4 flex flex-col gap-2">
        <h2 className="card-title marcel">
          {title}
          {path !== "/" && (
            <div className="badge badge-secondary">
              {featured ? "Featured" : ""}
            </div>
          )}
        </h2>
        <p className="flex items-center gap-2 sand">
          <MdDateRange size={20} />
          <span>
            {eventDate} | {time}
          </span>
        </p>
        <p className="flex items-center gap-2 sand">
          <FaLocationArrow size={18} />
          <span>{location}</span>
        </p>
        {path !== "/" && (
          <p className="sand">
            <strong>Seats Available: </strong> <span>{availableSeats}</span>
          </p>
        )}
        <p className="sand">
          <strong>Organizer: </strong>
          {organizer}
        </p>

        <div className="border-b border-b-gray-300"></div>

        <button className="btn border border-[#FE3E01] rounded-none bg-transparent sand transition hover:bg-[#FE3E01] hover:text-white ease-in duration-300 mt-1.5">
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
