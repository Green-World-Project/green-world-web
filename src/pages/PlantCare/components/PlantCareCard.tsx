import { useState } from "react";
import { Switch } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { pcPlant } from "../../../interfaces/interfaces";
import { GiPlantWatering } from "react-icons/gi";
import { GiWateringCan } from "react-icons/gi";
import { formatDate } from "../../../constants/UTILS";

interface PlantCareCardProps {
  plant: pcPlant;
}

export default function PlantCareCard({ plant }: PlantCareCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isWatered, setIsWatered] = useState(plant.isWatered);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full mx-auto border border-gray-200">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold text-black">{plant.plant_name}</h2>
      </div>

      <div className="space-y-2 text-black">
        <p>
          <span className="font-semibold">Water Need:</span> {plant.waterNeed} L
        </p>
        <p>
          <span className="font-semibold">Ground Area:</span> {plant.groundArea}{" "}
          m²
        </p>
        <div className="flex items-center justify-between space-x-2 ">
          <div className="flex gap-1 text-black">
            <span className="font-semibold ">
              {isWatered ? "Watered:" : "Needs Water:"}
            </span>
            {isWatered ? (
              <GiWateringCan size={22} />
            ) : (
              <GiPlantWatering size={22} />
            )}
          </div>
          <Switch
            checked={isWatered}
            onChange={setIsWatered}
            className={`${
              isWatered ? "bg-green-500" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span
              className={`${
                isWatered ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
        </div>
      </div>

      <button
        onClick={handleToggleExpand}
        className="mt-4 text-sm font-medium text-green-600 hover:underline focus:outline-none"
      >
        {isExpanded ? "Show Less" : "More Info"}
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4 text-black"
          >
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Ideal Soil Moisture:</span>{" "}
                {plant.info.ideal_soil_moisture_percentage}%
              </p>
              <p>
                <span className="font-semibold">Optimal Temp:</span>{" "}
                {plant.info.optimal_temperature_celsius}°C
              </p>
              <p>
                <span className="font-semibold">Light Exposure:</span>{" "}
                {plant.info.light_exposure_hours} hrs/day
              </p>
              <p>
                <span className="font-semibold">Soil pH Level:</span>{" "}
                {plant.info.optimal_soil_ph_level}
              </p>
              <p>
                <span className="font-semibold">Recommended NPK Ratio:</span>{" "}
                {plant.info.recommended_npk_ratio}
              </p>
              <p>
                <span className="font-semibold">Water Every:</span>{" "}
                {plant.info.water_duration_days} days
              </p>
              <p>
                <span className="font-semibold">Daily Water Need:</span>{" "}
                {plant.info.daily_water_requirement_liters_per_m2} L/m²
              </p>
              <p>
                <span className="font-semibold">Humidity:</span>{" "}
                {plant.info.humidity_percentage}%
              </p>
              <p>
                <span className="font-semibold">Added on:</span>{" "}
                {formatDate(plant.createdAt)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
