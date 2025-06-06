import { useEffect, useState } from "react";
import PlantCareList from "./components/PlantCareList";
import Sidebar from "./components/Sidebar";

export default function PlantCare() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-1">
        <div className="container-custom px-[2rem] lg:px-[4rem] flex flex-col">
          <div className="flex flex-row justify-between mb-12">
            <h1 className="text-[#1b5e20] text-4xl font-bold text-left">
              Plant Care
            </h1>
            <button
              className="text-center text-[1rem] cursor-pointer font-medium text-white border-[2px] border-[#43a047] bg-[#43a047] px-4 py-2
              rounded-md transition-all hover:bg-[#2e7d32] hover:scale-105 hover:border-[#2e7d32]"
              onClick={() => setIsFormOpen(true)}
            >
              Add Plant
            </button>
          </div>
          <div className="flex flex-row w-full">
            <div className="flex-1 transition-all duration-300">
              <PlantCareList
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                setIsSidebarOpen={setIsSidebarOpen}
              />
            </div>
          </div>
        </div>
      </div>
      <Sidebar
        isExpanded={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
}
