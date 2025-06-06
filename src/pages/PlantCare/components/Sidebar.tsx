import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import { formatDate } from "../../../constants/UTILS";
import { useContext } from "react";
import { StoreContext } from "../../../context/StoreContext";

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

interface SidebarProps {
  isExpanded: boolean;
  onClose: () => void;
}

export default function Sidebar({ isExpanded, onClose }: SidebarProps) {
  const { selectedPlant } = useContext(StoreContext);
  return (
    <motion.div
      animate={{ width: isExpanded ? 256 : 0 }}
      transition={{ type: "tween", duration: 0.3 }}
      className={classNames(
        "relative flex flex-col overflow-y-auto bg-white border-l border-gray-200 shadow-lg transition-all duration-200 mt-[85px] no-bottom-shadow max-sm:fixed max-sm:right-0",
        "max-sm:top-0 max-sm:bottom-0"
      )}
      style={{
        width: isExpanded ? 256 : 0,
        minWidth: 0,
        maxWidth: 256,
      }}
    >
      {/* X icon for closing */}
      {isExpanded && (
        <button
          onClick={onClose}
          className="absolute top-[6px] right-1 z-10 p-1 rounded-full hover:bg-gray-100 focus:outline-none transition"
          aria-label="Close sidebar"
          type="button"
        >
          <MdClose className="h-5 w-5 text-gray-500" />
        </button>
      )}
      <div
        className={
          isExpanded
            ? "opacity-100 transition-opacity duration-200"
            : "opacity-0 pointer-events-none transition-opacity duration-200"
        }
      >
        {isExpanded && (
          <TabGroup>
            <TabList className="flex-shrink-0 bg-gray-50 border-b border-gray-200">
              <Tab
                key="details"
                className={({ selected }) =>
                  classNames(
                    "w-1/2 text-center py-2 text-sm font-medium",
                    selected
                      ? "border-b-2 border-[#2e7d32] text-[#2e7d32]"
                      : "text-gray-500 hover:text-gray-700"
                  )
                }
              >
                Info
              </Tab>
              <Tab
                key="logs"
                className={({ selected }) =>
                  classNames(
                    "w-1/2 text-center py-2 text-sm font-medium",
                    selected
                      ? "border-b-2 border-[#2e7d32] text-[#2e7d32]"
                      : "text-gray-500 hover:text-gray-700"
                  )
                }
              >
                Logs
              </Tab>
            </TabList>
            <TabPanels className="flex-1 relative overflow-y-auto">
              <TabPanel className="p-4">
                <ul className="space-y-2">
                  {[
                    { label: "Category", value: selectedPlant?.info.category },
                    {
                      label: "Ideal Soil Moisture",
                      value: `${selectedPlant?.info.ideal_soil_moisture_percentage}%`,
                    },
                    {
                      label: "Optimal Temp",
                      value: `${selectedPlant?.info.optimal_temperature_celsius}°C`,
                    },
                    {
                      label: "Light Exposure",
                      value: `${selectedPlant?.info?.light_exposure_hours} hrs/day`,
                    },
                    {
                      label: "Soil pH Level",
                      value: selectedPlant?.info.optimal_soil_ph_level,
                    },
                    {
                      label: "Recommended NPK Ratio",
                      value: selectedPlant?.info.recommended_npk_ratio,
                    },
                    {
                      label: "Water Every",
                      value: `${selectedPlant?.info.water_duration_days} days`,
                    },
                    {
                      label: "Daily Water Need",
                      value: `${selectedPlant?.info.daily_water_requirement_liters_per_m2} L/m²`,
                    },
                    {
                      label: "Humidity",
                      value: `${selectedPlant?.info.humidity_percentage}%`,
                    },
                    {
                      label: "Description",
                      value: selectedPlant?.info.plant_description,
                      isDescription: true,
                    },
                    {
                      label: "Last modified",
                      value: (
                        <span className="text-gray-500">
                          {selectedPlant?.updatedAt
                            ? formatDate(selectedPlant.updatedAt)
                            : "N/A"}
                        </span>
                      ),
                    },
                  ].map((item, idx) =>
                    item.isDescription ? (
                      <li
                        key={idx}
                        className="flex flex-col border-b border-gray-100 py-1"
                      >
                        <span className="font-semibold text-gray-700 text-xs mb-1">
                          {item.label}:
                        </span>
                        <span className="text-gray-900 text-xs">
                          {item.value}
                        </span>
                      </li>
                    ) : (
                      <li
                        key={idx}
                        className="flex items-center border-b border-gray-100 py-1"
                      >
                        <span className="font-semibold text-gray-700 text-xs whitespace-nowrap">
                          {item.label}:
                        </span>
                        <span className="ml-2 text-gray-900 text-xs font-mono flex-1 text-right break-keep">
                          {item.value}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </TabPanel>
              <TabPanel className="p-4">
                <ul className="space-y-2">
                  {selectedPlant?.logs?.map((log, idx) => (
                    <li
                      key={idx}
                      className="flex items-center border-b border-gray-100 py-1"
                    >
                      <span className="font-semibold text-gray-700 text-xs whitespace-nowrap">
                        Watered on:
                      </span>
                      <span className="ml-2 text-gray-900 text-xs font-mono flex-1 text-right break-keep">
                        {formatDate(log.wateringDate)}
                      </span>
                    </li>
                  ))}
                </ul>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        )}
      </div>
    </motion.div>
  );
}
