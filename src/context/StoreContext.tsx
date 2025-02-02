import { createContext, useState, ReactNode } from "react";

interface StoreContextTypes {
  isPopUpOpen: boolean;
  setIsPopUpOpen: (isOpen: boolean) => void;
}

export const StoreContext = createContext<StoreContextTypes>({
  isPopUpOpen: false,
  setIsPopUpOpen: () => {},
});

const StoreContextProvider = ({ children }: { children: ReactNode }) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const contextValue: StoreContextTypes = {
    isPopUpOpen,
    setIsPopUpOpen,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
