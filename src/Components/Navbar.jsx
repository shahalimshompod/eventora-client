import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logoBlack from "../assets/logo/logo-black.png";
import logoWhite from "../assets/logo/logo-white.png";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { DataContext } from "../Context/DataContextProvider";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  //   const { user, userLogout } = useContext(AuthContext);
  //   const image = user?.photoURL;

  // Toggle hamburger menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  //   const handleLogout = () => {
  //     userLogout();
  //     toast.success("Successfully logged out!");
  //     setMenuOpen(false);
  //   };

  const user = true;

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Routes array for reusability
  const routes = [
    { path: "/", label: "Home" },
    { path: "/events", label: "Events" },
    ...(user
      ? [
          { path: "/my-bookings", label: "My Bookings" },
          ...(user.role === "admin"
            ? [{ path: "/add-event", label: "Add Event" }]
            : []),
        ]
      : []),
  ];

  return (
    <div className="shadow-sm">
      <div
        className={`fixed top-0 left-0 right-0 z-50 py-4 ${
          scrolled || path !== "/"
            ? "bg-white transition ease-in duration-300"
            : "bg-transparent transition ease-in duration-300"
        }`}
      >
        <div className="navbar container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            {scrolled ? (
              <img className="w-10" src={logoBlack} alt="Eventora logo" />
            ) : (
              <img className="w-10" src={logoWhite} alt="Eventora logo" />
            )}
            <span
              className={`text-3xl marcel  ${
                scrolled
                  ? "text-black transition ease-in duration-300"
                  : "text-white transition ease-in duration-300"
              }`}
            >
              EVEN<span className="text-[#FE3E01]">T</span>ORA
            </span>
          </Link>

          {/* Desktop menu */}
          <ul
            className={`hidden lg:flex menu-horizontal  sand text-base md:text-lg gap-6 ${
              scrolled ? "text-black" : "text-white"
            } `}
          >
            {routes.map(({ path, label }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? ` ${
                          scrolled
                            ? "bg-white text-[#FE3E01] font-bold transition ease-in duration-300 rounded-md px-3 py-1"
                            : "bg-[#FE3E01]/70 text-white rounded-md px-3 py-1"
                        } `
                      : "hover:bg-white/20 px-3 py-1 rounded-md transition"
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger & profile */}
          <div className="flex items-center gap-4">
            {/* Hamburger */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white text-2xl focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Profile dropdown */}
            {user ? (
              <div className="dropdown dropdown-end relative">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn bg-transparent btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    {/* {image ? (
                      <img alt="Profile" src={image} />
                    ) : (
                      <FaUserCircle fill="white" size={38} />
                    )} */}
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu quick menu-sm dropdown-content bg-base-100 rounded-box shadow mt-3 w-fit p-2 z-50"
                >
                  {/* User Info */}
                  <li className="p-2">
                    <h1 className="font-black text-lg truncate">
                      {user?.displayName}
                    </h1>
                    <h4 className="font-semibold text-sm truncate">
                      {user?.email}
                    </h4>
                  </li>

                  {/* Divider */}
                  <div className="divider my-2"></div>

                  <li>
                    <NavLink
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        isActive ? "bg-amber-100" : ""
                      }
                    >
                      <p className="font-normal text-base">Profile</p>
                    </NavLink>
                  </li>
                  <li>
                    <p
                      className="font-normal text-base cursor-pointer"
                      //   onClick={handleLogout}
                    >
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="hidden lg:block">
                <button className="btn quick border-none hover:bg-amber-300 bg-amber-300 text-[#FE3E01]">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="lg:hidden bg-[#FE3E01] text-white px-6 py-4">
            <ul className="flex flex-col gap-4 quick font-semibold text-base">
              {routes.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-amber-300 text-[#FE3E01] rounded-md px-3 py-1 block"
                        : "hover:bg-white/20 px-3 py-1 rounded-md block transition"
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}

              {/* Profile link for mobile */}
              {user && (
                <li>
                  <NavLink
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-amber-300 text-[#FE3E01] rounded-md px-3 py-1 block"
                        : "hover:bg-white/20 px-3 py-1 rounded-md block transition"
                    }
                  >
                    Profile
                  </NavLink>
                </li>
              )}

              {!user && (
                <li>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <button className="w-full btn quick border-none hover:bg-amber-300 bg-amber-300 text-[#FE3E01]">
                      Login
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
