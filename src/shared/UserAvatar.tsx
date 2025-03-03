import { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { HamburgerButtonProps } from "../interfaces/interfaces";

const UserAvatar = ({ isOpen, setIsOpen }: HamburgerButtonProps) => {
  const { token, getUserData, userData } = useContext(StoreContext);

  const getInitial = (name: string | undefined) =>
    name && name.length > 0 ? name.charAt(0).toUpperCase() : "";

  useEffect(() => {
    getUserData();
  }, [token]);

  return (
    /* Avatar Button */
    <button
      className={`flex items-center gap-2 text-white w-10 h-10 rounded-full font-semibold justify-center focus:outline-none ${
        isOpen ? "bg-[#1b5e20]" : "bg-[#43a047]"
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      {getInitial(userData?.firstName)}
    </button>
  );
};

export default UserAvatar;
