import { useState } from "react";
import AddPlantForm from "../../shared/AddPlantForm";
import PlantCareList from "./components/PlantCareList";

export default function PlantCare() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className="container-custom px-[2rem] lg:px-[4rem]">
      <div className="flex flex-row justify-between">
        <h1 className="text-[#1b5e20] text-4xl font-bold">Plant Care</h1>
        <button
          className="text-center text-[1rem] cursor-pointer font-medium text-white border-[2px] border-[#43a047] bg-[#43a047] px-4 py-2
          rounded-md transition-all hover:bg-[#2e7d32] hover:scale-105 hover:border-[#2e7d32]"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          Add Plant
        </button>
        <AddPlantForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      </div>
      <PlantCareList />
    </div>
  );
}
