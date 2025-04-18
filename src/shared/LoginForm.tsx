import { useContext, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { StoreContext } from "../context/StoreContext";
import { useForm } from "react-hook-form";
import { authUrls } from "../constants/END_POINTS";
import axios, { AxiosError } from "axios";
import { LoginFormData } from "../interfaces/interfaces";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { isPopUpOpen, setIsPopUpOpen, login } = useContext(StoreContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post(authUrls.login, data);
      if (response.data.token) {
        // call the login function
        login(response.data.token);
        setIsPopUpOpen(false);
      } else {
        toast.error(response?.data?.message || "Something went wrong!");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      toast.error(axiosError.response?.data?.error || "Something went wrong!");
    }
  };

  const handleClick = () => {
    setIsPopUpOpen(false);
    navigate("/signup");
  };

  return (
    <AnimatePresence>
      {isPopUpOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(8px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsPopUpOpen(false)} // Close the pop-up when clicking outside
          />
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="relative bg-gray-800 bg-opacity-90 rounded-lg shadow-lg p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-4xl text-white font-semibold">Login</h1>

              <IoClose
                onClick={() => setIsPopUpOpen(false)}
                fill="white"
                fontSize={40}
                className="cursor-pointer"
              />
            </div>

            <form
              className="flex flex-col gap-5 mt-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-1 grow">
                <label className="font-medium text-white" htmlFor="email">
                  Email
                </label>
                <input
                  className="px-1 py-1 bg-[#E1F1F1] shadow-sm focus:shadow outline-none w-full focus:ring-2 
                    focus:ring-[#2ecc71] transition duration-300 ease-in-out rounded-sm"
                  type="text"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 grow">
                <div className="flex flex-row items-center justify-between">
                  <label className="font-medium text-white" htmlFor="password">
                    Password
                  </label>
                  {passwordShown ? (
                    <button
                      type="button"
                      onClick={() => setPasswordShown((prev) => !prev)}
                      className="flex items-center gap-2"
                    >
                      <IoEyeOff size={20} fill="#2ecc71" />
                      <span className="text-[#2ecc71] font-medium">Hide</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPasswordShown((prev) => !prev)}
                      className="flex items-center gap-2"
                    >
                      <IoEye size={20} fill="#2ecc71" />
                      <span className="text-[#2ecc71] font-medium">Show</span>
                    </button>
                  )}
                </div>
                <input
                  className="px-1 py-1 bg-[#E1F1F1] shadow-sm focus:shadow outline-none w-full focus:ring-2 
                            focus:ring-[#2ecc71] transition duration-300 ease-in-out rounded-sm"
                  type={passwordShown ? "text" : "password"}
                  id="passowrd"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <button
                className="w-full py-[10px] sm mt-4 bg-green-500 hover:bg-green-600 text-white text-lg font-medium rounded-md shadow-md transition-all duration-200 ease-in-out"
                type="submit"
              >
                Login
              </button>
            </form>
            <div className="flex flex-row justify-center flex-wrap gap-2 font-medium mt-5">
              <span className="text-base text-white">New to our garden?</span>
              <button
                className="w-fit font-semibold text-[#2ecc71]"
                type="button"
                onClick={handleClick}
              >
                Sign up
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginForm;
