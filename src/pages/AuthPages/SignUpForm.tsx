import { useContext, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import logo from "/public/logo.svg";
import FloatingDotsBackground from "../../shared/FloatingDotsBackground";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setIsPopUpOpen } = useContext(StoreContext);
  const [passwordShown, setPasswordShown] = useState(false);

  const handleClick = () => {
    navigate("/home");
    setTimeout(() => {
      setIsPopUpOpen(true);
    }, 1500);
  };

  return (
    <div className="py-4 flex items-center justify-center relative min-h-screen shadow-xl bg-gradient-to-br from-lightGreen to-paleGreen">
      <FloatingDotsBackground numberOfDots={40} />
      <div className="bg-white shadow-2xl z-20 py-4 px-7 w-[40%] max-lg:w-[60%] max-md:w-[70%] max-sm:w-[90%] max-w-[700px] rounded-md overflow-y-auto max-h-[95vh]">
        <div className=" flex justify-center">
          <div className="logo w-[100px] h-[100px]">
            <img className="w-full h-full" src={logo} alt="logo" />
          </div>
        </div>
        <h1 className="text-4xl font-semibold">Sign up</h1>

        <form className="flex flex-col gap-5 mt-8">
          <div className="flex flex-row gap-4 max-sm:flex-col">
            <div className="flex flex-col gap-1 grow">
              <label className="font-medium" htmlFor="firstname">
                First Name
              </label>
              <input
                className="px-1 py-1 bg-[#E1F1F1] shadow-sm focus:shadow outline-none w-full focus:ring-2 
                    focus:ring-[#2ecc71] transition duration-300 ease-in-out rounded-sm"
                type="text"
                placeholder="John"
                id="firstname"
              />
            </div>
            <div className="flex flex-col gap-1 grow">
              <label className="font-medium" htmlFor="lastname">
                Last Name
              </label>
              <input
                className="px-1 py-1 bg-[#E1F1F1] shadow-sm focus:shadow outline-none w-full focus:ring-2 
                    focus:ring-[#2ecc71] transition duration-300 ease-in-out rounded-sm"
                type="text"
                placeholder="Doe"
                id="lastname"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4 max-sm:flex-col">
            <div className="flex flex-col gap-1 basis-1/2">
              <label className="font-medium" htmlFor="age">
                Age
              </label>
              <input
                className="px-1 py-1 bg-[#E1F1F1] shadow-sm focus:shadow outline-none w-full focus:ring-2 
                    focus:ring-[#2ecc71] transition duration-300 ease-in-out rounded-sm"
                type="number"
                placeholder="20"
                min={0}
                id="age"
              />
            </div>
            <div className="flex flex-col gap-1 basis-1/2">
              <label className="font-medium" htmlFor="gender">
                Gender
              </label>
              <select
                className="py-1 bg-[#E1F1F1] shadow-sm focus:shadow outline-none w-full h-full focus:ring-2 
                    focus:ring-[#2ecc71] transition duration-300 ease-in-out rounded-sm"
                id="gender"
              >
                <option value="option1"> Male</option>
                <option value="option2">Female</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1 grow">
            <label className="font-medium" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="px-1 py-1 bg-[#E1F1F1] shadow-sm focus:shadow outline-none w-full focus:ring-2 
                    focus:ring-[#2ecc71] transition duration-300 ease-in-out rounded-sm"
              type="number"
              placeholder="123"
              min={0}
              id="phone"
            />
          </div>
          <div className="flex flex-col gap-1 grow">
            <label className="font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="px-1 py-1 bg-[#E1F1F1] shadow-sm focus:shadow outline-none w-full focus:ring-2 
                    focus:ring-[#2ecc71] transition duration-300 ease-in-out rounded-sm"
              type="text"
              placeholder="johndoe@gmail.com"
              id="email"
            />
          </div>
          <div className="flex flex-col gap-1 grow">
            <div className="flex flex-row items-center justify-between">
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
              placeholder="********"
              id="passowrd"
            />
          </div>
          <button
            className="w-full py-[10px] sm mt-4 bg-green-500 hover:bg-green-600 text-white text-lg font-medium rounded-md shadow-md transition-all duration-200 ease-in-out"
            type="submit"
          >
            Sign up
          </button>
          <div className="flex flex-row justify-center flex-wrap gap-2 font-medium pb-5">
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

export default SignUpForm;
