import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { FormToggleProps, plantOption } from "../interfaces/interfaces";
import axios from "axios";
import { pcs } from "../constants/END_POINTS";
import { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import PlantSelect from "../pages/PlantCare/components/PlantSelect";
import { usePlantOptions } from "../hooks/usePlantOptions";

const AddPlantForm = ({
  isFormOpen,
  setIsFormOpen,
  setPlants,
}: FormToggleProps) => {
  const { token, userData } = useContext(StoreContext);
  const plantOptions = usePlantOptions();

  interface FormValues {
    plant: plantOption | null;
    groundArea: number | null;
    isWatered: boolean;
  }

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { plant: null, groundArea: null, isWatered: false },
  });

  useEffect(() => {
    if (isFormOpen) {
      reset({
        plant: null,
        groundArea: null,
        isWatered: false,
      });
    }
  }, [isFormOpen, reset]);

  const onSubmit = async (data: FormValues) => {
    if (!token || !userData) return;
    const payload = {
      plantID: data.plant!._id,
      groundArea: data.groundArea,
      isWatered: data.isWatered,
    };

    try {
      const response = await axios.post(pcs.create, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setPlants((prev) => [response.data.result, ...prev]);
      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return (
    <AnimatePresence>
      {isFormOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(8px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsFormOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="relative bg-gray-800 bg-opacity-90 rounded-lg shadow-lg p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-4xl text-white font-semibold">
                Add New Plant
              </h1>

              <IoClose
                onClick={() => setIsFormOpen(false)}
                fill="white"
                fontSize={40}
                className="cursor-pointer"
              />
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5 mt-8"
            >
              <div className="flex flex-col gap-1 grow relative z-50 overflow-visible">
                <Controller
                  name="plant"
                  control={control}
                  rules={{
                    required: "Please select a plant",
                  }}
                  render={({ field: { onChange: rhfOnChange, value } }) => (
                    <div>
                      <label className="block mb-1 font-medium text-white">
                        Plant Name
                      </label>
                      <PlantSelect
                        options={plantOptions}
                        value={value}
                        onChange={(plant) => {
                          rhfOnChange(plant);
                        }}
                      />
                    </div>
                  )}
                />

                {errors.plant && (
                  <span className="text-red-500 text-sm">
                    {errors.plant.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 grow">
                <label className="font-medium text-white" htmlFor="groundArea">
                  Ground Area (m²)
                </label>
                <input
                  className="px-1 py-1 bg-[#E1F1F1] shadow-sm focus:shadow outline-none w-full focus:ring-2 
                    focus:ring-[#2ecc71] transition duration-300 ease-in-out rounded-sm"
                  type="number"
                  id="groundArea"
                  placeholder="4"
                  {...register("groundArea", {
                    required: "Ground Area is required",
                    min: {
                      value: 0.01,
                      message: "Ground Area must be greater than 0",
                    },
                  })}
                />
                {errors.groundArea && (
                  <span className="text-red-500 text-sm">
                    {errors.groundArea.message}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="watering" className=" text-white">
                  Watered
                </label>
                <input
                  id="watering"
                  type="checkbox"
                  {...register("isWatered")}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
              </div>
              <button
                className="w-full py-[10px] sm mt-4 bg-green-500 hover:bg-green-600 text-white text-lg font-medium rounded-md shadow-md transition-all duration-200 ease-in-out"
                type="submit"
              >
                Add Plant
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddPlantForm;
