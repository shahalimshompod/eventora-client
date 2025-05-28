import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const description = watch("description", "");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Convert fee to number
      data.fee = Number(data.fee);
      // Convert availableSeats to number
      data.availableSeats = Number(data.availableSeats);
      // Convert featured to boolean
      data.featured = data.featured === "true";

      // Here you would typically make an API call to your backend
      // For demonstration, we'll simulate it
      console.log("Submitting event data:", data);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // After successful submission, navigate to Events page
      navigate("/events");
    } catch (err) {
      setError("Failed to add event. Please try again.");
      console.error("Error adding event:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 lg:py-36 px-3 lg:px-0">
      <h1 className="marcel text-3xl font-bold mb-6 text-center">
        Add New Event
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Event Title */}
        <div>
          <label className="sand block mb-1">Event Title</label>
          <input
            {...register("eventTitle", { required: "Event title is required" })}
            className={`w-full px-4 py-2 border ${
              errors.eventTitle ? "border-red-500" : "border-[#FE3E01]"
            } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
            placeholder="Enter event title"
          />
          {errors.eventTitle && (
            <p className="text-red-500 text-sm mt-1">
              {errors.eventTitle.message}
            </p>
          )}
        </div>

        {/* Event Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="sand block mb-1">Event Date</label>
            <input
              type="date"
              {...register("eventDate", { required: "Event date is required" })}
              className={`w-full px-4 py-2 border ${
                errors.eventDate ? "border-red-500" : "border-[#FE3E01]"
              } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
            />
            {errors.eventDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.eventDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="sand block mb-1">Time</label>
            <input
              type="time"
              {...register("time", { required: "Time is required" })}
              className={`w-full px-4 py-2 border ${
                errors.time ? "border-red-500" : "border-[#FE3E01]"
              } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
            />
            {errors.time && (
              <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
            )}
          </div>
        </div>

        {/* Location and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="sand block mb-1">Location</label>
            <input
              {...register("location", { required: "Location is required" })}
              className={`w-full px-4 py-2 border ${
                errors.location ? "border-red-500" : "border-[#FE3E01]"
              } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
              placeholder="Enter location"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label className="sand block mb-1">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className={`w-full px-4 py-2 border ${
                errors.category ? "border-red-500" : "border-[#FE3E01]"
              } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
            >
              <option value="">Select a category</option>
              <option value="sports">Sports</option>
              <option value="music">Music</option>
              <option value="tech">Tech</option>
              <option value="business">Business</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="sand block mb-1">
            Description{" "}
            <span className="text-gray-500">
              ({description.length}/100 minimum)
            </span>
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 100,
                message: "Description must be at least 100 characters",
              },
            })}
            rows={5}
            className={`w-full px-4 py-2 border ${
              errors.description ? "border-red-500" : "border-[#FE3E01]"
            } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
            placeholder="Enter event description (minimum 100 characters)"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Available Seats and Fee */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="sand block mb-1">Available Seats</label>
            <input
              type="number"
              min="1"
              {...register("availableSeats", {
                required: "Available seats is required",
                min: {
                  value: 1,
                  message: "Must have at least 1 seat",
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.availableSeats ? "border-red-500" : "border-[#FE3E01]"
              } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
              placeholder="Enter number of seats"
            />
            {errors.availableSeats && (
              <p className="text-red-500 text-sm mt-1">
                {errors.availableSeats.message}
              </p>
            )}
          </div>

          <div>
            <label className="sand block mb-1">Registration Fee (USD)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register("fee", {
                required: "Fee is required",
                min: {
                  value: 0,
                  message: "Fee cannot be negative",
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.fee ? "border-red-500" : "border-[#FE3E01]"
              } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
              placeholder="Enter fee amount"
            />
            {errors.fee && (
              <p className="text-red-500 text-sm mt-1">{errors.fee.message}</p>
            )}
          </div>
        </div>

        {/* Organizer and Registration Deadline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="sand block mb-1">Organizer</label>
            <input
              {...register("organizer", { required: "Organizer is required" })}
              className={`w-full px-4 py-2 border ${
                errors.organizer ? "border-red-500" : "border-[#FE3E01]"
              } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
              placeholder="Enter organizer name"
            />
            {errors.organizer && (
              <p className="text-red-500 text-sm mt-1">
                {errors.organizer.message}
              </p>
            )}
          </div>

          <div>
            <label className="sand block mb-1">Registration Deadline</label>
            <input
              type="date"
              {...register("registrationDeadline", {
                required: "Registration deadline is required",
                validate: (value) => {
                  const eventDate = watch("eventDate");
                  if (eventDate && new Date(value) > new Date(eventDate)) {
                    return "Deadline must be before event date";
                  }
                  return true;
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.registrationDeadline
                  ? "border-red-500"
                  : "border-[#FE3E01]"
              } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
            />
            {errors.registrationDeadline && (
              <p className="text-red-500 text-sm mt-1">
                {errors.registrationDeadline.message}
              </p>
            )}
          </div>
        </div>

        {/* Upload Event Image */}
        <div>
          <label className="sand block mb-1">Event Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("eventImage", { required: "Event image is required" })}
            className={`w-full px-4 py-2 border ${
              errors.eventImage ? "border-red-500" : "border-[#FE3E01]"
            } rounded focus:outline-none focus:ring-1 focus:ring-[#FE3E01]`}
          />
          {errors.eventImage && (
            <p className="text-red-500 text-sm mt-1">
              {errors.eventImage.message}
            </p>
          )}
        </div>

        {/* Featured Radio Buttons */}
        <div>
          <label className="sand block mb-1">Featured Event</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="true"
                {...register("featured", {
                  required: "Please select an option",
                })}
                className="mr-2 text-[#FE3E01] focus:ring-[#FE3E01]"
              />
              <span className="sand">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="false"
                {...register("featured")}
                className="mr-2 text-[#FE3E01] focus:ring-[#FE3E01]"
              />
              <span className="sand">No</span>
            </label>
          </div>
          {errors.featured && (
            <p className="text-red-500 text-sm mt-1">
              {errors.featured.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#FE3E01] text-white py-2 px-4 rounded hover:bg-opacity-90 transition ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Adding Event..." : "Add Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
