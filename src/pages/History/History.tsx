import { useEffect } from "react";

import HistoryList from "./HistoryList";

export default function History() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-custom px-[2rem] lg:px-[4rem] flex flex-col">
      <h1 className="text-[#1b5e20] text-4xl font-bold text-left mb-12">
        History
      </h1>

      <HistoryList />
    </div>
  );
}
