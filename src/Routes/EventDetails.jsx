import React from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContextProvider";
import RegistrationModal from "../Components/RegistrationModal";

const EventDetails = () => {
  const axiosPublic = useAxiosPublic();
  const [detailsData, setDetailsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { user, setIsLoginModalOpen } = useContext(AuthContext);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const {
    availableSeats,
    description,
    eventDate,
    fee,
    image,
    location,
    organizer,
    registrationDeadline,
    time,
    title,
    seats,
    _id,
  } = detailsData;

  // fetch func
  const fetchData = async () => {
    setLoading(true);
    const res = await axiosPublic.get(`/details-event/${id}`);
    if (res?.data) {
      setDetailsData(res?.data);
      setLoading(false);
    }
  };

  // for checking user
  const handleClick = () => {
    if (!user) {
      setIsLoginModalOpen(true); // Show login modal
      return;
    }
    if (user) {
      setSelectedEvent(detailsData);
    }
  };

  //   fetching data
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
              {/* {category.charAt(0).toUpperCase() + category.slice(1)} */}
              Event Details
            </h1>
          </div>
        </div>
      </div>
      <div
        className="relative container mx-auto my-12 py-28 px-12"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          {/* text content */}
          <div className="relative z-10 flex flex-col items-start gap-6 w-full">
            <h1 className="marcel text-white text-6xl">{title}</h1>
            <p className="text-white sand">
              <strong>Organized By: </strong>
              {organizer}
            </p>
            <p className="text-white sand">{description}</p>
            <p className="text-white sand flex items-center gap-2">
              <FaLocationArrow />
              <span>{location}</span>
            </p>
            <p className="sand text-white">
              <strong>Seats: </strong>
              {seats}
            </p>
          </div>

          {/* card content */}
          <div className="relative z-30 bg-white px-5 py-10 w-1/2 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-black marcel text-3xl">Date & Time</h1>
              <h1 className="marcel text-[#FE3E01] text-2xl">
                <span className="text-black text-xl">Fee</span> ${fee}
                <span className="text-black text-base">/Seat</span>
              </h1>
            </div>
            <p className="text-black sand">
              {eventDate} | {time}
            </p>
            <p className="sand">
              <strong>Registration Deadline: </strong>
              {registrationDeadline}
            </p>
            <p className="sand">
              <strong>Available Seats: </strong>
              {availableSeats}
            </p>
            <button
              onClick={handleClick}
              className="btn border border-[#FE3E01] rounded-none bg-transparent sand transition hover:bg-[#FE3E01] hover:text-white ease-in duration-300 mt-1.5"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
      <RegistrationModal
        selectedEvent={selectedEvent}
        fetchData={fetchData}
        setSelectedEvent={setSelectedEvent}
      />
    </div>
  );
};

export default EventDetails;
