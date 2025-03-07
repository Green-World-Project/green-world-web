import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HamburgerMenu, { HamburgerButton } from "./HamburgerMenu";
import { StoreContext } from "../context/StoreContext";
import { RiLogoutBoxRLine } from "react-icons/ri";
import UserAvatar from "./UserAvatar";
import { AiFillHome } from "react-icons/ai";
import { GiPlantRoots } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { MdHistory, MdOutlineImageSearch } from "react-icons/md";

export default function Navbar() {
  const { token, setIsPopUpOpen, logout } = useContext(StoreContext);
  const navigate = useNavigate();
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (token) {
      // Reset to closed state when token changes
      setIsOpen(false);
    }
  }, [token]);

  return (
    <nav className="navbar flex flex-col bg-white bg-opacity-95 backdrop-blur-sm shadow-lg shadow-black/10 fixed top-0 left-0 right-0 z-50 ">
      <div className="nav-top border-b border-black/10 px-[2rem] lg:px-[3rem] py-[1rem]">
        <div className="max-w-[2000px] mx-auto w-full flex items-center justify-between">
          <div className="left-nav flex items-center gap-3">
            <Link
              className="flex items-center"
              to="/"
              onClick={() => setActive("home")}
            >
              <div className="pb-2">
                <img width={45} height={45} src="/logo.svg" alt="logo" />
              </div>
              <span className="text-[#3bc944] text-[1.5rem] font-bold max-[400px]:hidden">
                Green World
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4 max-sm:hidden">
            <Link
              to="/"
              onClick={() => setActive("home")}
              className={`nav-tab relative cursor-pointer text-[#2e7d32] flex gap-2 ${
                active === "home" ? "active" : ""
              }`}
            >
              <AiFillHome size={20} />
              Home
            </Link>
            <Link
              to="/plantcare"
              onClick={() => setActive("plant care")}
              className={`nav-tab relative cursor-pointer text-[#2e7d32] flex items-center gap-2 ${
                active === "plant care" ? "active" : ""
              }`}
            >
              <GiPlantRoots size={20} />
              Plant Care
            </Link>
            <Link
              to="/"
              onClick={() => setActive("about us")}
              className={`nav-tab relative cursor-pointer text-[#2e7d32] flex items-center gap-2 ${
                active === "about us" ? "active" : ""
              }`}
            >
              <FaUsers size={20} />
              About Us
            </Link>
          </div>
          <div className="flex items-center gap-4 ">
            {token ? (
              <UserAvatar isOpen={isOpen} setIsOpen={setIsOpen} />
            ) : (
              <button
                onClick={() => setIsPopUpOpen(true)}
                className="text-center text-[1rem] cursor-pointer font-medium text-[#43a047] px-4 py-2 border-[2px] 
 border-[#43a047] rounded-full transition-all hover:bg-[#43a0471a] hover:scale-105 max-sm:hidden"
              >
                Login
              </button>
            )}
            {!token && (
              <button
                onClick={() => navigate("signup")}
                className="text-center text-[1rem] cursor-pointer font-medium text-white border-[2px] border-[#43a047] bg-[#43a047] px-4 py-2
      rounded-full transition-all hover:bg-[#2e7d32] hover:scale-105 hover:border-[#2e7d32] max-sm:hidden"
              >
                Sign Up
              </button>
            )}

            {!token && (
              <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {token && isOpen && (
          <motion.div
            key="nav-bottom"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="nav-bottom flex items-center justify-start px-[2.5rem] lg:px-[4rem] max-w-[2130px] max-sm:hidden mx-auto w-full overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="py-[1rem] flex gap-5"
            >
              <Link
                to="/"
                onClick={() => setActive("profile")}
                className={`nav-tab relative cursor-pointer text-[#2e7d32] flex items-center gap-2 ${
                  active === "profile" ? "active" : ""
                }`}
              >
                <CgProfile size={20} />
                Profile
              </Link>
              <Link
                to="/"
                onClick={() => setActive("identify")}
                className={`nav-tab relative cursor-pointer text-[#2e7d32] flex items-center gap-2 ${
                  active === "identify" ? "active" : ""
                }`}
              >
                <MdOutlineImageSearch size={20} />
                Identify Plants
              </Link>
              <Link
                to="/"
                onClick={() => setActive("history")}
                className={`nav-tab relative cursor-pointer text-[#2e7d32] flex items-center gap-2 ${
                  active === "history" ? "active" : ""
                }`}
              >
                <MdHistory size={20} />
                History
              </Link>
              <button
                className="flex items-center gap-2"
                onClick={() => logout()}
              >
                <RiLogoutBoxRLine size={20} fill="#2e7d32" />
                <span className="text-[#2e7d32]">Logout</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <HamburgerMenu active={active} setActive={setActive} isOpen={isOpen} />
    </nav>
  );
}
