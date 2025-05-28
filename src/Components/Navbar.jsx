import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logoBlack from "../assets/logo/logo-black.png";
import logoWhite from "../assets/logo/logo-white.png";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContextProvider";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";
// import { AuthContext } from "../Context/AuthContextProvider";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const path = location.pathname;
  const role = userRole?.role;
  // auth
  const { user, setIsLoginModalOpen, userLogout } = useContext(AuthContext);

  // fetch all events data
  const fetchUserData = async () => {
    const res = await axiosPublic.get(`/users?email=${user?.email}`);
    if (res?.data) {
      setUserRole(res?.data);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUserData();
    }
  }, [user, axiosPublic]);

  // handle log out
  const handleLogout = () => {
    userLogout();
    toast.success("Successfully logged out!");
    setMenuOpen(false);
  };

  // Dummy user data (replace with real AuthContext)

  // Toggle hamburger menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define routes
  const routes = [
    { path: "/", label: "Home" },
    { path: "/events", label: "Events" },
    ...(user
      ? [
          { path: "/my-bookings", label: "My Bookings" },
          ...(role === "admin"
            ? [{ path: "/add-event", label: "Add Event" }]
            : []),
        ]
      : []),
  ];

  // Dynamic styles
  const isHome = path === "/";
  const bgClass = isHome && !scrolled ? "bg-transparent" : "bg-white";
  const textColor = isHome && !scrolled ? "text-white" : "text-black";

  return (
    <div className="shadow-sm">
      <div
        className={`fixed top-0 left-0 right-0 z-50 py-4 transition duration-300 ${bgClass}`}
      >
        <div className="navbar container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              className="w-10"
              src={isHome && !scrolled ? logoWhite : logoBlack}
              alt="Eventora logo"
            />
            <span className={`text-3xl marcel ${textColor}`}>
              EVEN<span className="text-[#FE3E01]">T</span>ORA
            </span>
          </Link>

          {/* Desktop menu */}
          <ul
            className={`hidden lg:flex menu-horizontal sand text-base md:text-lg gap-6 ${textColor}`}
          >
            {routes.map(({ path: routePath, label }) => (
              <li key={routePath}>
                <NavLink
                  to={routePath}
                  className={({ isActive }) =>
                    isActive
                      ? isHome && !scrolled
                        ? "font-bold text-[#FE3E01]"
                        : "font-bold text-[#FE3E01]"
                      : isHome && !scrolled
                      ? "hover:bg-white/20 px-3 py-1 rounded-md transition text-white"
                      : "hover:bg-black/10 px-3 py-1 rounded-md transition text-black"
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Hamburger and profile */}
          <div className="flex items-center gap-4">
            {/* Hamburger */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden text-2xl ${textColor}`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Profile Dropdown */}
            {user ? (
              <div className="dropdown dropdown-end relative">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn bg-transparent btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    {user.photoURL ? (
                      <img alt="Profile" src={user.photoURL} />
                    ) : (
                      <FaUserCircle className={`${textColor}`} size={38} />
                    )}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow mt-3 w-fit p-2 z-50"
                >
                  <li className="p-2">
                    <h1 className="font-black text-lg truncate">
                      {user.displayName}
                    </h1>
                    <h4 className="font-semibold text-sm truncate">
                      {user.email}
                    </h4>
                  </li>
                  <div className="divider my-2"></div>
                  <li>
                    <NavLink
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        isActive ? "bg-amber-100" : ""
                      }
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <p className="cursor-pointer" onClick={handleLogout}>
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="sand btn border-none shadow-none hover:bg-[#FE3E01] text-black bg-white rounded-none transition ease-in duration-300 hover:text-white"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#FE3E01] text-white px-6 py-4">
            <ul className="flex flex-col gap-4 quick font-semibold text-base">
              {routes.map(({ path: routePath, label }) => (
                <li key={routePath}>
                  <NavLink
                    to={routePath}
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
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="w-full btn quick border-none hover:bg-amber-300 bg-amber-300 text-[#FE3E01]"
                  >
                    Login
                  </button>
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
