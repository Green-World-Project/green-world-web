import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { format } from "date-fns";

type PlantCardProps = {
  name: string;
  date: string;
  initialWatered: boolean;
};

const PlantCard: React.FC<PlantCardProps> = ({
  name,
  date,
  initialWatered,
}) => {
  const [isWatered, setIsWatered] = useState(initialWatered);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-gray-500 mb-4">
        Planted on: {format(new Date(date), "PPP")}
      </p>

      <div className="flex items-center justify-between">
        <span
          className={`text-sm ${isWatered ? "text-green-600" : "text-red-600"}`}
        >
          {isWatered ? "Watered" : "Needs Water"}
        </span>
        <Switch
          checked={isWatered}
          onChange={setIsWatered}
          className={`${
            isWatered ? "bg-green-500" : "bg-red-500"
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
        >
          <span
            className={`${
              isWatered ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
      </div>
    </div>
  );
};

export default PlantCard;
