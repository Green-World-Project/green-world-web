import { useContext, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import logo from "/logo.svg";
import FloatingDotsBackground from "../../shared/FloatingDotsBackground";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { SignUpFormData } from "../../interfaces/interfaces";
import { useForm } from "react-hook-form";
import axios from "axios";
import { authUrls } from "../../constants/END_POINTS";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { setIsPopUpOpen, login } = useContext(StoreContext);
  const [passwordShown, setPasswordShown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await axios.post(authUrls.register, data);

      if (response.data.token) {
        // call the login function
        login(response.data.token);
      }

      toast.success("Signup successful! 🎉");
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      toast.error(axiosError.response?.data?.error || "Something went wrong!");
    }
  };

  const handleClick = () => {
    navigate("/home");
    setTimeout(() => {
      setIsPopUpOpen(true);
    }, 1500);
  };

  return (
    <div className="py-4 flex items-center justify-center relative min-h-screen bg-gradient-to-br from-green-200 to-green-50">
      <FloatingDotsBackground numberOfDots={40} />
      <div className="bg-white shadow-2xl z-20 py-4 px-7 w-[40%] max-lg:w-[60%] max-md:w-[70%] max-sm:w-[90%] max-w-[700px] rounded-md overflow-y-auto max-h-[95vh]">
        <div className=" flex justify-center">
          <div className="logo w-[100px] h-[100px]">
            <img className="w-full h-full" src={logo} alt="logo" />
          </div>
        </div>
        <h1 className="text-4xl font-semibold">Sign up</h1>

        <form className="flex flex-col  mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-4 max-sm:flex-col">
            <div className="flex flex-col gap-1 grow">
              <label className="font-medium" htmlFor="firstname">
                First Name
              </label>
              <input
                className="px-1 py-1 bg-[#E1F1F1] shadow-sm focus:shadow outline-none w-full focus:ring-2 
                    focus:ring-[#2ecc71] transition duration-300 ease-in-out rounded-sm"
                type="text"
                id="firstname"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <span className="text-red-600 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 grow">
              <label className="font-medium" htmlFor="lastname">
                Last Name
              </label>
              <input
                className="px-1 py-1 bg-[#E1F1F1] shadow-sm focus:shadow outline-none w-full focus:ring-2 
                    focus:ring-[#2ecc71] transition duration-300 ease-in-out rounded-sm"
                type="text"
                id="lastname"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <span className="text-red-600 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-4 max-sm:flex-col mt-5">
            <div className="flex flex-col gap-1 basis-1/2">
              <label className="font-medium" htmlFor="age">
                Age
              </label>
              <input
                className="px-1 py-1 bg-[#E1F1F1] shadow-sm focus:shadow outline-none w-full focus:ring-2 
                    focus:ring-[#2ecc71] transition duration-300 ease-in-out rounded-sm"
                type="number"
                id="age"
                {...register("age", {
                  required: "Age is required",
                  min: { value: 16, message: "Minimum age is 16" },
                })}
              />
              {errors.age && (
                <span className="text-red-600 text-sm">
                  {errors.age.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 basis-1/2">
              <label className="font-medium" htmlFor="gender">
                Gender
              </label>
              <select
                className="py-1 bg-[#E1F1F1] shadow-sm focus:shadow outline-none w-full h-full focus:ring-2 
                    focus:ring-[#2ecc71] transition duration-300 ease-in-out rounded-sm"
                id="gender"
                {...register("gender")}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1 grow mt-5">
            <label className="font-medium" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="px-1 py-1 bg-[#E1F1F1] shadow-sm focus:shadow outline-none w-full focus:ring-2 
                    focus:ring-[#2ecc71] transition duration-300 ease-in-out rounded-sm "
              type="number"
              id="phone"
              {...register("phoneNumber", {
                required: "Phone number is required",
              })}
            />
            {errors.phoneNumber && (
              <span className="text-red-600 text-sm">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 grow mt-5">
            <label className="font-medium" htmlFor="email">
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
              <span className="text-red-600 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 grow">
            <div className="flex flex-row items-center justify-between mt-5">
              <label className="font-medium" htmlFor="password">
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
              <span className="text-red-600 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            className="w-full py-[10px] sm mt-4 bg-green-500 hover:bg-green-600 text-white text-lg font-medium rounded-md shadow-md transition-all duration-200 ease-in-out mt-5"
            type="submit"
          >
            Sign up
          </button>
          <div className="flex flex-row justify-center flex-wrap gap-2 font-medium pb-5 mt-2">
            <span className="text-base">Back to grow with us?</span>
            <button
              className="w-fit font-semibold text-[#2ecc71]"
              type="button"
              onClick={handleClick}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
