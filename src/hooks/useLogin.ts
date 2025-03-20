import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { setIsPopUpOpen } = useContext(StoreContext);

  const handleLoginClick = () => {
    if (location.pathname === "/home") {
      setIsPopUpOpen(true);
    } else {
      navigate("/home");
      setTimeout(() => {
        setIsPopUpOpen(true);
      }, 1500);
    }
  };

  return handleLoginClick;
};
