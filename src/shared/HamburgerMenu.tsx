import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  HamburgerButtonProps,
  HamburgerMenuProps,
} from "../interfaces/interfaces";

export const HamburgerButton = ({
  isOpen,
  setIsOpen,
}: HamburgerButtonProps) => {
  /* Hamburger Button */
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <button
      className="lg:hidden flex items-center cursor-pointer sm:hidden"
      onClick={toggleMenu}
    >
      <div className="space-y-[5px]">
        <div
          className={`h-[3px] w-6 bg-black rounded ${
            isOpen ? "rotate-45 translate-y-2" : ""
          } transition-transform duration-300`}
        />
        <div
          className={`h-[3px] w-6 bg-black rounded ${
            isOpen ? "opacity-0" : ""
          } transition-opacity duration-300`}
        />
        <div
          className={`h-[3px] w-6 bg-black rounded ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          } transition-transform duration-300`}
        />
      </div>
    </button>
  );
};

const HamburgerMenu = ({ isOpen, active, setActive }: HamburgerMenuProps) => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="overflow-hidden bg-white  flex flex-col items-center sm:hidden"
      initial={{ height: 0 }}
      animate={{ height: isOpen ? "auto" : 0 }}
    >
      <ul className="flex flex-col items-center space-y-4 py-4">
        <Link
          to="/"
          className={`cursor-pointer text-[#2e7d32] ${
            active === "home" ? "underline underline-offset-8" : ""
          }`}
          onClick={() => setActive("home")}
        >
          Home
        </Link>
        <Link
          to="/"
          className={`cursor-pointer text-[#2e7d32] ${
            active === "plant care" ? "underline underline-offset-8" : ""
          }`}
          onClick={() => setActive("plant care")}
        >
          Plant care
        </Link>

        <Link
          to="/"
          className={`cursor-pointer text-[#2e7d32] ${
            active === "about us" ? "underline underline-offset-8" : ""
          }`}
          onClick={() => setActive("about us")}
        >
          About Us
        </Link>
      </ul>
      <div className="flex items-center gap-4 mt-5 pb-5">
        <button
          onClick={() => navigate("login")}
          className="text-center text-[1rem] cursor-pointer font-medium text-[#43a047] px-3 py-2 border-[2px] 
          border-[#43a047] rounded-full transition-all hover:bg-[#43a0471a] hover:scale-105"
        >
          Login
        </button>
        <button
          onClick={() => navigate("signup")}
          className="text-center text-[1rem] cursor-pointer font-medium text-white border-[2px] border-[#43a047] bg-[#43a047] px-3 py-2
          rounded-full transition-all hover:bg-[#2e7d32] hover:scale-105 hover:border-[#2e7d32]"
        >
          Sign Up
        </button>
      </div>
    </motion.div>
  );
};

export default HamburgerMenu;
