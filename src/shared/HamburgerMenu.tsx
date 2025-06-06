import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  HamburgerButtonProps,
  HamburgerMenuProps,
} from "../interfaces/interfaces";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { AiFillHome } from "react-icons/ai";
import { GiPlantRoots } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdHistory, MdOutlineImageSearch } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useLogin } from "../hooks/useLogin";

export const HamburgerButton = ({
  isOpen,
  setIsOpen,
}: HamburgerButtonProps) => {
  /* Hamburger Button */
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <button
      className="flex items-center cursor-pointer min-[941px]:hidden"
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

const HamburgerMenu = ({
  isOpen,
  handleCloseBottomNav,
}: HamburgerMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, logout } = useContext(StoreContext);
  const handleLoginClick = useLogin();

  const handleLogout = () => {
    logout(); // clears token/cookies
    navigate("/"); // navigate to home route
  };

  return (
    <motion.div
      className="overflow-hidden bg-white  flex flex-col items-center min-[941px]:hidden"
      initial={{ height: 0 }}
      animate={{ height: isOpen ? "auto" : 0 }}
    >
      <ul className="flex flex-col items-center space-y-4 py-4">
        <Link
          onClick={handleCloseBottomNav}
          to="/"
          className={`nav-tab relative cursor-pointer text-[#2e7d32] flex gap-2 ${
            location.pathname === "/home" ? "active" : ""
          }`}
        >
          <AiFillHome size={20} />
          Home
        </Link>
        <Link
          onClick={handleCloseBottomNav}
          to="/identify"
          className={`nav-tab relative cursor-pointer text-[#2e7d32] flex items-center gap-2 ${
            location.pathname === "/identify" ? "active" : ""
          }`}
        >
          <MdOutlineImageSearch size={20} />
          Identify
        </Link>
        <Link
          onClick={handleCloseBottomNav}
          to="/plantcare"
          className={`nav-tab relative cursor-pointer text-[#2e7d32] flex items-center gap-2 ${
            location.pathname === "/plantcare" ? "active" : ""
          }`}
        >
          <GiPlantRoots size={20} />
          Plant Care
        </Link>
        <Link
          onClick={handleCloseBottomNav}
          to="/"
          className={`nav-tab relative cursor-pointer text-[#2e7d32] flex items-center gap-2 ${
            location.pathname === "/about-us" ? "active" : ""
          }`}
        >
          <FaUsers size={20} />
          About Us
        </Link>
        {token && (
          <>
            <Link
              onClick={handleCloseBottomNav}
              to="/history"
              className={`nav-tab relative cursor-pointer text-[#2e7d32] flex items-center gap-2 ${
                location.pathname === "/history" ? "active" : ""
              }`}
            >
              <MdHistory size={20} />
              History
            </Link>
            <Link
              onClick={handleCloseBottomNav}
              to="/profile"
              className={`nav-tab relative cursor-pointer text-[#2e7d32] flex items-center gap-2 ${
                location.pathname === "/profile" ? "active" : ""
              }`}
            >
              <CgProfile size={20} />
              Profile
            </Link>
            <button className="flex items-center gap-2" onClick={handleLogout}>
              <RiLogoutBoxRLine size={20} fill="#2e7d32" />
              <span className="text-[#2e7d32]">Logout</span>
            </button>
          </>
        )}
      </ul>
      {!token && (
        <div className="flex items-center gap-4 mt-5 pb-5">
          <button
            onClick={handleLoginClick}
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
      )}
    </motion.div>
  );
};

export default HamburgerMenu;
