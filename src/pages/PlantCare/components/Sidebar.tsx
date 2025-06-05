import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineArrowRight } from "react-icons/md";
import { formatDate } from "../../../constants/UTILS";

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

type PlantInfo = {
  category: string;
  ideal_soil_moisture_percentage: number;
  optimal_temperature_celsius: number;
  light_exposure_hours: number;
  optimal_soil_ph_level: string;
  recommended_npk_ratio: string;
  water_duration_days: number;
  daily_water_requirement_liters_per_m2: number;
  humidity_percentage: number;
  plant_description: string;
};

type PlantLog = {
  wateringDate: string;
};

type SidebarProps = {
  selectedPlant: {
    info: PlantInfo;
    updatedAt: string;
    logs?: PlantLog[];
  };
  isSidebarOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({
  selectedPlant,
  isSidebarOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.2 }}
            className="fixed top-[5.4rem]  overflow-y-auto right-0 w-64 h-full bg-white border-l border-gray-200 flex flex-col overflow-hidden z-40"
          >
            <button
              onClick={() => onClose?.()}
              className="absolute top-1 right-1 p-1 rounded hover:bg-gray-100 focus:outline-none"
              aria-label="Close sidebar"
              type="button"
            >
              <MdOutlineArrowRight className="h-6 w-6 text-gray-500" />
            </button>
            {/* Tabs Container */}
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

              {/* Tab Panels without AnimatePresence and motion for correct tab switching */}
              <TabPanels className="flex-1 relative overflow-y-auto">
                <TabPanel className="p-4">
                  <ul className="space-y-2">
                    {[
                      { label: "Category", value: selectedPlant.info.category },
                      {
                        label: "Ideal Soil Moisture",
                        value: `${selectedPlant.info.ideal_soil_moisture_percentage}%`,
                      },
                      {
                        label: "Optimal Temp",
                        value: `${selectedPlant.info.optimal_temperature_celsius}°C`,
                      },
                      {
                        label: "Light Exposure",
                        value: `${selectedPlant.info.light_exposure_hours} hrs/day`,
                      },
                      {
                        label: "Soil pH Level",
                        value: selectedPlant.info.optimal_soil_ph_level,
                      },
                      {
                        label: "Recommended NPK Ratio",
                        value: selectedPlant.info.recommended_npk_ratio,
                      },
                      {
                        label: "Water Every",
                        value: `${selectedPlant.info.water_duration_days} days`,
                      },
                      {
                        label: "Daily Water Need",
                        value: `${selectedPlant.info.daily_water_requirement_liters_per_m2} L/m²`,
                      },
                      {
                        label: "Humidity",
                        value: `${selectedPlant.info.humidity_percentage}%`,
                      },
                      {
                        label: "Description",
                        value: selectedPlant.info.plant_description,
                        isDescription: true,
                      },
                      {
                        label: "Last modified",
                        value: (
                          <span className="text-gray-500">
                            {formatDate(selectedPlant.updatedAt)}
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
                    {selectedPlant.logs?.map((log, idx) => (
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
