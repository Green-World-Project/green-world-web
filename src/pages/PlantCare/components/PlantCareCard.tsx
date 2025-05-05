import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Switch } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { pcPlant } from "../../../interfaces/interfaces";
import { GiPlantWatering } from "react-icons/gi";
import { GiWateringCan } from "react-icons/gi";
import { formatDate } from "../../../constants/UTILS";
import { MdClose, MdEdit, MdSave } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

import { StoreContext } from "../../../context/StoreContext";
import { usePlantOptions } from "../../../hooks/usePlantOptions";

import axios from "axios";
import { pcs } from "../../../constants/END_POINTS";
import { toast } from "react-toastify";
import PlantCareDropdown from "./PlantCareDropdown";

interface PlantCareCardProps {
  plant: pcPlant;
  setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
  setSelectedPlantId?: (id: string) => void;
  onUpdated: (upd: pcPlant) => void;
}

export default function PlantCareCard({
  plant,
  setIsModalOpen,
  setSelectedPlantId,
  onUpdated,
}: PlantCareCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPlantID, setSelectedPlantID] = useState(plant._id);
  const [groundArea, setGroundArea] = useState(plant.groundArea);
  const [isWatered, setIsWatered] = useState(plant.isWatered);
  const [isEditing, setIsEditing] = useState(false);

  const { token } = useContext(StoreContext);
  const plantOptions = usePlantOptions();

  useEffect(() => {
    if (!isEditing) {
      setSelectedPlantID(plant._id);
      setGroundArea(plant.groundArea);
      setIsWatered(plant.isWatered);
    }
  }, [
    isEditing,
    selectedPlantID,
    plant._id,
    plant.groundArea,
    plant.isWatered,
  ]);

  const handleOpenModal = () => {
    if (!plant) return;
    setSelectedPlantId?.(plant._id);
    setIsModalOpen?.(true);
  };

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleSave = async () => {
    if (groundArea <= 0)
      return toast.error("Ground area must be > 0", {
        autoClose: 3000,
      });
    const payload = {
      plantID: selectedPlantID,
      groundArea: groundArea,
      isWatered: isWatered,
    };

    try {
      const response = await axios.put(pcs.update(plant._id), payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onUpdated(response.data.result);

      toast.success(response.data.message, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full mx-auto border border-gray-200 relative"
    >
      {/* Top-right Edit/Save/Cancel buttons */}
      <div className="absolute top-2 right-3 flex items-center flex-col-reverse gap-2">
        {isEditing ? (
          <>
            <button>
              <IoMdTrash
                onClick={handleOpenModal}
                size={20}
                className="text-red-600"
              />
            </button>
            <button>
              <MdSave
                onClick={handleSave}
                size={20}
                className="text-green-600"
              />
            </button>
            <button onClick={handleCancel}>
              <MdClose size={20} className="text-gray-500" />
            </button>
          </>
        ) : (
          <button onClick={handleEdit}>
            <MdEdit size={20} className="text-gray-700" />
          </button>
        )}
      </div>
      <div className="flex items-center mb-4">
        {isEditing ? (
          <PlantCareDropdown
            value={selectedPlantID}
            onChange={setSelectedPlantID}
            options={plantOptions}
            plantName={plant.plant_name}
          />
        ) : (
          <h2 className="text-2xl font-bold">{plant.plant_name}</h2>
        )}
      </div>

      <div className="space-y-2 text-black">
        <p>
          <span className="font-semibold">Water Need:</span>{" "}
          {plant.waterNeed.toFixed(2)} L
        </p>
        {isEditing ? (
          <div className="flex items-center">
            <span className="font-semibold">Ground Area:</span>
            <div className="relative mx-1">
              <input
                type="number"
                step="0.1"
                value={groundArea}
                onChange={(e) => setGroundArea(parseFloat(e.target.value))}
                className="
                  text-base font-normal text-black 
                  bg-transparent border-0 
                   px-1 py-0.5 w-10
                   focus:outline-none 
                            "
              />
              <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-gray-500"></div>
            </div>
            <span className="text-base font-normal text-black">m²</span>
          </div>
        ) : (
          <div className="flex items-center">
            <p>
              <span className="font-semibold">Ground Area:</span>{" "}
              {plant.groundArea.toFixed(2)} m²
            </p>
          </div>
        )}
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
            disabled={!isEditing}
            className={`${isWatered ? "bg-green-500" : "bg-red-500"} ${
              !isEditing && "hover:cursor-not-allowed"
            }  relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
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
                <span className="font-semibold">Description:</span>{" "}
                {plant.info.plant_description}
              </p>
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
              <p className="font-semibold">
                Last modified:{" "}
                <span className="text-gray-500">
                  {formatDate(plant.updatedAt)}
                </span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
