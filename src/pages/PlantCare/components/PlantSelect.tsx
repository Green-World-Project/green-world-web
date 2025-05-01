import { useState, Fragment } from "react";
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

interface PlantSelectProps {
  options: PlantOption[];
  value: PlantOption | null;
  onChange: (plant: PlantOption) => void;
}

export default function PlantSelect({
  options,
  value,
  onChange,
}: PlantSelectProps) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((opt) =>
          opt.plant_name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="w-full">
      <Combobox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <ComboboxInput
            className="w-full rounded-sm bg-[#E1F1F1] px-2 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2ecc71]"
            displayValue={(opt: PlantOption) => opt?.plant_name || ""}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Select a plant…"
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ComboboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {filteredOptions.length === 0 ? (
                <div className="px-2 py-1 text-gray-500">No plants found.</div>
              ) : (
                filteredOptions.map((opt) => (
                  <ComboboxOption
                    key={opt._id}
                    value={opt}
                    className={({ active }) =>
                      `cursor-pointer select-none px-2 py-1 ${
                        active ? "bg-green-100" : ""
                      }`
                    }
                  >
                    {opt.plant_name}
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
