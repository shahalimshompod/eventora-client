import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../Auth/AuthContextProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion"; // <-- added this

const LoginModal = () => {
  const {
    user,
    isLoginModalOpen,
    setIsLoginModalOpen,
    signInWithGoogle,
    loginUser,
    createUser,
    setUser,
    updateUser,
  } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [registerLoader, setRegisterLoader] = useState(false);
  const [loginLoader, setLoginLoader] = useState(false);
  const [googleLoginLoader, setGoogleLoginLoader] = useState(false);
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setRegisterLoader(true);
    const name = data?.name;
    const email = data?.email;
    const password = data?.password;

    if (!isLogin) {
      createUser(email, password)
        .then(async (result) => {
          const loggedUser = result.user;
          setUser(loggedUser);
          updateUser({ displayName: name });

          const userInfo = {
            name: name,
            email: email,
            image: null,
          };

          const response = await axiosPublic.post("/post-user", userInfo);
          if (response?.data.insertedId) {
            setRegisterLoader(false);
            toast.success("Successfully Registered!");
            reset();
            setIsLoginModalOpen(false);
          }
        })
        .catch((error) => {
          toast.error(`Error: ${error.code}`);
          setRegisterLoader(false);
        });
    }

    if (isLogin) {
      setLoginLoader(true);
      loginUser(email, password)
        .then((result) => {
          const user = result.user;
          setUser(user);
          toast.success("Successfully Logged in!");
          setLoginLoader(false);
          reset();
          setIsLoginModalOpen(false);
        })
        .catch((error) => {
          toast.error(`Error: ${error.code}`);
          setLoginLoader(false);
        });
    }
  };

  const googleLogin = () => {
    setGoogleLoginLoader(true);
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;
        if (user) {
          setUser(user);
          const userInfo = {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
          };
          const res = await axiosPublic.post("/post-user", userInfo);
          if (res?.insertedId) {
            setGoogleLoginLoader(false);
          }
          setIsLoginModalOpen(false);
          toast.success("Successfully Logged in!");
        }
      })
      .catch((err) => {
        console.error("ERROR LOGGING IN USER -->", err);
        setGoogleLoginLoader(false);
      });
  };

  const handleModalClose = () => {
    setIsLoginModalOpen(false);
    reset();
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white lg:w-[800px] lg:h-[500px] shadow-lg relative flex flex-col md:flex-row overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleModalClose}
              className="btn btn-circle border-none shadow-none bg-transparent absolute top-4 right-4 text-gray-600 hover:text-red-500 hover:rotate-90 transition-transform duration-300 z-50 cursor-pointer"
            >
              <RxCross1 size={35} />
            </button>

            {/* Left Image */}
            <div
              className="w-full md:w-1/2 h-full object-cover transition-transform duration-500 relative"
              style={{
                transform: isLogin ? "translateX(0%)" : "translateX(100%)",
              }}
            >
              <img
                src="https://c4.wallpaperflare.com/wallpaper/483/1019/759/people-live-hands-wallpaper-preview.jpg"
                alt="Visual"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40">
                <h2 className="text-3xl font-bold marcel">
                  Welcome To Eventora !
                </h2>
                <p className="text-lg mt-2 sand font-semibold">
                  Join us and enjoy exclusive features.
                </p>
              </div>
            </div>

            {/* Right Side Form */}
            <div
              className="w-1/2 h-full flex flex-col justify-center items-center p-8 transition-transform duration-500"
              style={{
                transform: isLogin ? "translateX(0%)" : "translateX(-100%)",
                position: "relative",
              }}
            >
              {/* Login Form */}
              {isLogin && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full flex flex-col gap-6 absolute inset-0 transition-opacity duration-500 p-6"
                  style={{ opacity: isLogin ? 1 : 0 }}
                >
                  <h2 className="text-3xl  font-bold mb-4 marcel">
                    <span className="text-[#FE3E01]">Eventora</span> Login
                  </h2>
                  <div className="relative w-full">
                    <FaEnvelope className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email"
                      {...register("email", { required: "Email is required" })}
                      className="w-full pl-10 pb-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#FE3E01] sand"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm sand">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="relative w-full">
                    <FaLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className="w-full pl-10 pb-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#FE3E01] sand pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {errors.password && (
                      <span className="text-red-500 text-sm sand">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full btn shadow-none bg-transparent border border-[#FE3E01] hover:bg-[#FE3E01] text-black hover:text-white py-2 rounded-none transition sand"
                  >
                    {loginLoader ? (
                      <span className="loading loading-spinner text-error"></span>
                    ) : (
                      "Login"
                    )}
                  </button>
                  <button
                    className="cursor-pointer w-full flex items-center justify-center gap-2 border border-gray-300 py-2 mt-2 hover:bg-gray-100 transition bg-transparent "
                    onClick={googleLogin}
                    type="button"
                  >
                    {googleLoginLoader ? (
                      <span className="loading loading-spinner text-error"></span>
                    ) : (
                      <>
                        <FcGoogle size={24} />
                        Continue with Google
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Registration Form */}
              {!isLogin && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full flex flex-col gap-6 absolute inset-0 transition-opacity duration-500 p-6"
                  style={{ opacity: isLogin ? 0 : 1 }}
                >
                  <h2 className="text-3xl font-bold mb-4 marcel">
                    <span className="text-[#FE3E01]">Eventora</span> Register
                  </h2>
                  <div className="relative w-full">
                    <FaUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Name"
                      {...register("name", { required: "Name is required" })}
                      className="w-full pl-10 pb-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#FE3E01] sand"
                    />
                    {errors.name && (
                      <span className="text-red-500 text-sm sand">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="relative w-full">
                    <FaEnvelope className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email"
                      {...register("email", { required: "Email is required" })}
                      className="w-full pl-10 pb-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#FE3E01] sand"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm sand">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="relative w-full">
                    <FaLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className="w-full pl-10 pb-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#FE3E01] sand pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {errors.password && (
                      <span className="text-red-500 text-sm sand">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full btn shadow-none bg-transparent border border-[#FE3E01] hover:bg-[#FE3E01] text-black hover:text-white py-2 rounded-none transition sand"
                  >
                    {registerLoader ? (
                      <span className="loading loading-spinner text-error"></span>
                    ) : (
                      "Register"
                    )}
                  </button>
                  <button
                    className="cursor-pointer w-full flex items-center justify-center gap-2 border border-gray-300 py-2 mt-2 hover:bg-gray-100 transition bg-transparent "
                    onClick={googleLogin}
                    type="button"
                  >
                    {googleLoginLoader ? (
                      <span className="loading loading-spinner text-error"></span>
                    ) : (
                      <>
                        <FcGoogle size={24} />
                        Continue with Google
                      </>
                    )}
                  </button>
                </form>
              )}
              <p className="mt-96 text-sm text-gray-600 z-50">
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <span
                      className="text-blue-600 cursor-pointer"
                      onClick={() => setIsLogin(false)}
                    >
                      Register
                    </span>
                  </>
                ) : (
                  <>
                    Already registered?{" "}
                    <span
                      className="text-blue-600 cursor-pointer"
                      onClick={() => setIsLogin(true)}
                    >
                      Login
                    </span>
                  </>
                )}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
