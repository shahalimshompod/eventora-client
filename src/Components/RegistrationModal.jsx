import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { AuthContext } from "../Auth/AuthContextProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useState } from "react";

const RegistrationModal = ({ setSelectedEvent, selectedEvent, fetchData }) => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [bookingLoader, setBookingLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      tickets: "",
      paymentMethod: "",
    },
  });

  // ✅ Set form default values when user is available
  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName || "",
        email: user.email || "",
        phone: "",
        tickets: "",
        paymentMethod: "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    console.log(data);
    setBookingLoader(true);
    const finalData = {
      ...data,
      bookedEventImage: selectedEvent?.image,
      bookedEventName: selectedEvent?.name,
      bookedEventDate: selectedEvent?.eventDate,
    };

    const res = await axiosPublic.post("/post-booking", finalData);
    if (res?.data.insertedId) {
      const bookedTickets = parseInt(data.tickets);
      const totalTickets = parseInt(selectedEvent?.availableSeats);
      const newTicketAmount = totalTickets - bookedTickets;

      //   new ticket amount
      const res = await axiosPublic.put(
        `/changed-ticket-amount/${selectedEvent?._id}`,
        { newTicketAmount }
      );
      if (res?.data.modifiedCount) {
        toast.success("Booking Successful!");
        setBookingLoader(false);
        setSelectedEvent(null);
        fetchData();
      }
    }
  };

  //  Do not render if no event selected
  if (!selectedEvent) return null;

  // 👁️‍🗨️ Watch ticket count dynamically
  const ticketsCount = watch("tickets") || 0;
  const totalCost = selectedEvent.fee * ticketsCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-full max-w-md bg-white shadow-lg p-6"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            reset();
            setSelectedEvent(null);
          }}
          className="absolute top-3 right-3 text-xl transition-transform hover:rotate-90 cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center marcel">
          Registration Form
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/* Name */}
          <input
            type="text"
            {...register("name")}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed sand"
          />

          {/* Email */}
          <input
            type="email"
            {...register("email")}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed sand"
          />

          {/* Phone */}
          <div>
            <input
              type="tel"
              placeholder="Phone Number"
              {...register("phone", { required: "Phone number is required" })}
              className="w-full border rounded px-3 py-2 sand"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Tickets + Total */}
          <div>
            <input
              type="number"
              placeholder="Number of Tickets"
              {...register("tickets", {
                required: "Number of tickets is required",
                min: { value: 1, message: "Minimum 1 ticket" },
              })}
              className="w-full border rounded px-3 py-2 sand"
            />
            {errors.tickets && (
              <p className="text-red-500">{errors.tickets.message}</p>
            )}

            {/* Total price display */}
            <h4 className="text-sm mt-2 sand text-[#FE3E01]">
              Per Ticket: ${selectedEvent.fee} |{" "}
              <span className="font-semibold">
                Total: ${isNaN(totalCost) ? 0 : totalCost}
              </span>
            </h4>
          </div>

          {/* Payment Method */}
          <input
            type="text"
            placeholder="Payment Method"
            {...register("paymentMethod")}
            className="w-full border rounded px-3 py-2 sand"
          />

          {/* Submit */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-transparent text-black transition ease-in duration-300 rounded-none  py-2 border border-[#FE3E01] hover:bg-[#FE3E01] sand hover:text-white font-semibold"
          >
            {bookingLoader ? "Booking..." : "Book Event"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegistrationModal;
