import { jwtDecode } from "jwt-decode";
import { createContext, useState, ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";
import { userDataTypes } from "../interfaces/interfaces";
import axios from "axios";
import { authUrls } from "../constants/END_POINTS";

interface StoreContextTypes {
  isPopUpOpen: boolean;
  setIsPopUpOpen: (isOpen: boolean) => void;
  token: string | null;
  userData: userDataTypes | null;
  login: (token: string) => void;
  logout: () => void;
  getUserData: () => void;
}

export const StoreContext = createContext<StoreContextTypes>({
  isPopUpOpen: false,
  setIsPopUpOpen: () => {},
  token: null,
  userData: null,
  login: () => {},
  logout: () => {},
  getUserData: () => {},
});

const StoreContextProvider = ({ children }: { children: ReactNode }) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [token, setToken] = useState<string | null>(cookies.token || null);
  const [userData, setUserData] = useState<userDataTypes | null>(null);

  // Function to handle user login
  const login = (newToken: string) => {
    setCookie("token", newToken, {
      path: "/",
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    setToken(newToken);
  };

  // Function to log out user
  const logout = () => {
    removeCookie("token", { path: "/" });
    setToken(null);
  };

  // Function to get user data
  const getUserData = async () => {
    try {
      if (!token) {
        return;
      }
      const response = await axios.get(authUrls.user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data);
    } catch (error) {
      console.error(error);
      setUserData(null);
    }
  };

  // Check token expiration
  useEffect(() => {
    if (!token) return;

    try {
      const decoded: { exp: number } = jwtDecode(token);
      const expirationTime = decoded.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();

      if (currentTime >= expirationTime) {
        logout(); // Token expired → Logout
      } else {
        // Set a timeout to auto-logout when token expires
        const timeout = setTimeout(logout, expirationTime - currentTime);
        return () => clearTimeout(timeout);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      logout(); // Invalid token → Logout
    }
  }, [token]); // Runs when `token` changes

  const contextValue: StoreContextTypes = {
    isPopUpOpen,
    setIsPopUpOpen,
    token,
    login,
    logout,
    getUserData,
    userData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
