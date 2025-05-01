import { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { HamburgerButtonProps } from "../interfaces/interfaces";
import { getInitial } from "../constants/UTILS";

const UserAvatar = ({ isOpen, setIsOpen }: HamburgerButtonProps) => {
  const { token, getUserData, userData } = useContext(StoreContext);

  useEffect(() => {
    if (!token) return;
    getUserData();
  }, [token]);

  return (
    /* Avatar Button */
    <button
      className={`flex items-center gap-2 text-white w-10 h-10 rounded-full font-semibold justify-center focus:outline-none hover:bg-[#1b5e20] transition-all
         ${isOpen ? "bg-[#1b5e20]" : "bg-[#43a047]"}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {getInitial(userData?.firstName)}
    </button>
  );
};

export default UserAvatar;
