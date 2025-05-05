import { useState, Fragment, useEffect } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";

interface PlantOption {
  _id: string;
  plant_name: string;
}

interface PlantCareDropdownProps {
  options: PlantOption[];
  value: string; // selected _id
  onChange: (id: string) => void;
  plantName?: string;
  placeholder?: string;
  className?: string;
}

export default function PlantCareDropdown({
  options,
  value,
  onChange,
  plantName,
  placeholder = "Select a plant…",
  className = "",
}: PlantCareDropdownProps) {
  const [query, setQuery] = useState("");

  // 1. Compute selected plant object based on value
  const selectedPlant = options.find((o) => o._id === value) || null;

  // 2. Select default by plantName
  useEffect(() => {
    if (plantName && !selectedPlant) {
      const match = options.find((o) => o.plant_name === plantName);
      if (match) onChange(match._id);
    }
  }, [plantName, options, selectedPlant, onChange]);

  // 3. Filter options
  const filtered =
    query === ""
      ? options
      : options.filter((o) =>
          o.plant_name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className={`w-[70%] ${className}`}>
      <Combobox
        value={selectedPlant}
        onChange={(option: PlantOption | null) => {
          if (option) onChange(option._id);
        }}
      >
        <div className="relative w-full">
          {selectedPlant ? (
            <>
              <ComboboxInput
                className="w-full text-2xl font-bold bg-transparent border-none p-0 focus:ring-0 cursor-text focus:outline-none"
                displayValue={(opt: PlantOption) => opt?.plant_name || ""}
                placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "1px",
                  backgroundColor: "gray",
                }}
              ></div>
            </>
          ) : (
            <input
              disabled
              className="w-full text-2xl font-bold bg-transparent border-none p-0 focus:ring-0 cursor-text focus:outline-none"
            />
          )}

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <ComboboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
              {filtered.length === 0 ? (
                <div className="px-3 py-1 text-gray-500">No plants found.</div>
              ) : (
                filtered.map((o) => (
                  <ComboboxOption
                    key={o._id}
                    value={o}
                    className="cursor-pointer select-none px-3 py-2 data-[active]:bg-green-100 data-[selected]:font-semibold"
                  >
                    {o.plant_name}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
