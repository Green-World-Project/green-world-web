import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";

import HistoryList from "./HistoryList";

export default function History() {
  const { userData } = useContext(StoreContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-custom px-[2rem] lg:px-[4rem] flex flex-col min-h-screen">
      <h1 className="text-[#1b5e20] text-4xl font-bold text-left mb-12">
        {userData ? (
          <>
            Hello <span className="text-[#43a047]">{userData.firstName}</span>,
            here is your plant history
          </>
        ) : (
          "History"
        )}
      </h1>

      <HistoryList />
    </div>
  );
}
