import React from "react";

const CategorySection = () => {
  // routes
  const routes = [
    {
      category: "Music",
      categoryForQuery: "music",
      path: "/events/music",
      image: "https://i.ibb.co/spJd2znv/category-music.jpg",
    },
    {
      category: "Tech",
      categoryForQuery: "tech",
      path: "/events/tech",
      image: "https://i.ibb.co/nsYqWPWM/category-tech.jpg",
    },
    {
      category: "Business",
      categoryForQuery: "business",
      path: "/events/business",
      image: "https://i.ibb.co/j9BMxzB5/category-business.jpg",
    },
    {
      category: "Sports",
      categoryForQuery: "sports",
      path: "/events/sports",
      image: "https://i.ibb.co/1f7R3kKf/category-sports.jpg",
    },
  ];

  return (
    <div className="py-16 xl:py-36 container mx-auto flex flex-col items-center">
      {/* Heading */}
      <div className="flex flex-col items-center mb-20">
        <h1
          data-aos="fade-up"
          data-aos-delay="0"
          className="marcel text-4xl md:text-6xl mb-6"
        >
          Find Your Perfect <span className="text-[#FE3E01]">Event</span> by
          Category
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="sand text-lg md:text-xl max-w-3xl mx-auto text-center"
        >
          From music festivals to tech conferences, explore events that align
          with your passions. Whether you're here to connect, learn, or have
          fun, discover the perfect category for you.
        </p>
      </div>

      {/* Card Content */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {routes.map((route, idx) => (
          <a
            data-aos="fade-up"
            data-aos-delay={100 + idx * 200}
            key={idx}
            href={route.path}
          >
            <div className="relative w-80 h-64 overflow-hidden group shadow-lg rounded-lg mt-10">
              {/* Image */}
              <img
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-60"
                src={route.image}
                alt="Category"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

              {/* Centered Text */}
              <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h1 className="text-4xl marcel text-white">
                  {route.category} Events
                </h1>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
