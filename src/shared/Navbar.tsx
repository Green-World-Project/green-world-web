import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HamburgerMenu, { HamburgerButton } from "./HamburgerMenu";
import { StoreContext } from "../context/StoreContext";

export default function Navbar() {
  const { setIsPopUpOpen } = useContext(StoreContext);
  const navigate = useNavigate();
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar flex flex-col bg-white bg-opacity-95 backdrop-blur-sm shadow-lg shadow-black/10 fixed top-0 left-0 right-0 z-50 ">
      <div className="nav-top border-b border-black/10 px-[2rem] md:px-[4rem] py-[1rem] ">
        <div className="max-w-[2000px] mx-auto w-full flex items-center justify-between">
          <div className="left-nav flex items-center gap-3">
            <Link className="flex items-center" to="/">
              <div className="pb-2">
                <img width={45} height={45} src="/logo.svg" alt="logo" />
              </div>
              <span className="text-[#3bc944] text-[1.5rem] font-bold max-[400px]:hidden">
                Green World
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4 ">
            <button
              onClick={() => setIsPopUpOpen(true)}
              className="text-center text-[1rem] cursor-pointer font-medium text-[#43a047] px-4 py-2 border-[2px] 
          border-[#43a047] rounded-full transition-all hover:bg-[#43a0471a] hover:scale-105 max-sm:hidden"
            >
              Login
            </button>
            <button
              onClick={() => navigate("signup")}
              className="text-center text-[1rem] cursor-pointer font-medium text-white border-[2px] border-[#43a047] bg-[#43a047] px-4 py-2
          rounded-full transition-all hover:bg-[#2e7d32] hover:scale-105 hover:border-[#2e7d32] max-sm:hidden"
            >
              Sign Up
            </button>
            <HamburgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>
      <div className="nav-bottom flex items-center justify-start px-[2rem] md:px-[4rem] py-[1rem] gap-5 max-w-[2130px] max-sm:hidden mx-auto w-full">
        <Link
          to="/"
          onClick={() => setActive("home")}
          className={`nav-tab relative cursor-pointer text-[#2e7d32]  ${
            active === "home" ? "active" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/"
          onClick={() => setActive("plant care")}
          className={`nav-tab relative cursor-pointer text-[#2e7d32]  ${
            active === "plant care" ? "active" : ""
          }`}
        >
          Plant Care
        </Link>
        <Link
          to="/"
          onClick={() => setActive("about us")}
          className={`nav-tab relative cursor-pointer text-[#2e7d32]  ${
            active === "about us" ? "active" : ""
          }`}
        >
          About Us
        </Link>
      </div>
      <HamburgerMenu active={active} setActive={setActive} isOpen={isOpen} />
    </nav>
  );
}
