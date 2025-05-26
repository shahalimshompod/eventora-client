import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const HomeBanner = () => {
  return (
    <section className="overflow-x-hidden">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
      >
        <div className="relative">
          <img
            src="https://i.ibb.co.com/7j0mPB3/banner-3.jpg"
            alt="Header with Navbar"
            className="h-screen w-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-start">
            <div className="absolute top-[200px] md:top-[400px] 2xl:top-[600px] ml-3 2xl:ml-14 w-full 2xl:w-1/2">
              <h1
                data-aos="fade-down"
                className="text-[#f5f5dc] text-4xl 2xl:text-7xl  font-bold text-left mb-4 montserrat"
              >
                Explore the Heart of Untamed{" "}
                <span className="text-[#6B8E23]">Forests</span>
              </h1>
              <p
                data-aos="fade-up"
                className="text-xl text-[#f5f5dc] text-left poppins"
              >
                Unleash your adventurous spirit and discover the secrets hidden
                in the lush green wilderness. Join us for an unforgettable
                expedition!
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://i.ibb.co.com/1bvr9Rp/banner-4.jpg"
            alt="Slide 2"
            className="h-screen w-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-start">
            <div className="absolute top-[200px] md:top-[400px] 2xl:top-[600px] ml-3 2xl:ml-14 w-full 2xl:w-1/2">
              <h1 className="text-[#f5f5dc] text-4xl 2xl:text-7xl  font-bold text-left mb-4 montserrat">
                Where <span className="text-[#6B8E23]">Nature</span> Tells Its
                Own Story
              </h1>
              <p className="text-xl text-white text-left poppins">
                Step into the tranquil beauty of untouched forests. Experience
                serenity like never before with eco-friendly adventures.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://i.ibb.co.com/xCp6Yhz/banner-5.jpg"
            alt="Slide 3"
            className="h-screen w-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-start">
            <div className="absolute top-[200px] md:top-[400px] 2xl:top-[600px] ml-3 2xl:ml-14 w-full 2xl:w-1/2">
              <h1 className="text-[#f5f5dc] text-4xl 2xl:text-7xl  font-bold text-left mb-4 montserrat">
                <span className="text-[#8B4513]">Adventure</span> Beyond
                Boundaries
              </h1>
              <p className="text-xl text-white text-left poppins">
                From towering trees to vibrant wildlife, dive deep into nature's
                wonderland. Make every moment an extraordinary memory.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://i.ibb.co.com/MR9PM9b/banner-1.jpg"
            alt="Slide 4"
            className="h-screen w-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-start">
            <div className="absolute top-[200px] md:top-[400px] 2xl:top-[600px] ml-3 2xl:ml-14 w-full 2xl:w-1/2">
              <h1 className="text-[#f5f5dc] text-4xl 2xl:text-7xl  font-bold text-left mb-4 montserrat">
                <span className="text-[#6B8E23]">Connect with Nature</span>,
                Sustainably
              </h1>
              <p className="text-xl text-white text-left poppins">
                Travel responsibly. Immerse yourself in the beauty of nature
                while protecting its treasures for future generations.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://i.ibb.co.com/0QPhNhS/banner-2.jpg"
            alt="Slide 5"
            className="h-screen w-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-start">
            <div className="absolute top-[200px] md:top-[400px] 2xl:top-[600px] ml-3 2xl:ml-14 w-full 2xl:w-1/2">
              <h1 className="text-[#f5f5dc] text-4xl 2xl:text-7xl  font-bold text-left mb-4 montserrat">
                Your Next <span className="text-[#87CEEB]">Expedition</span>{" "}
                Awaits!
              </h1>
              <p className="text-xl text-white text-left poppins">
                Get ready for an awe-inspiring journey through the dense
                forests. Adventure, exploration, and memories are just a step
                away.
              </p>
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default HomeBanner;
