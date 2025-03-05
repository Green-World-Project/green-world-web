import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { FormToggleProps, pcsDataTypes } from "../interfaces/interfaces";
import axios, { AxiosError } from "axios";
import { pcs } from "../constants/END_POINTS";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const AddPlantForm = ({ isFormOpen, setIsFormOpen }: FormToggleProps) => {
  const { token } = useContext(StoreContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<pcsDataTypes>();

  const onSubmit = async (data: pcsDataTypes) => {
    try {
      const response = await axios.post(pcs.create, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data);
      setIsFormOpen(false);
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      toast.error(axiosError.response?.data?.error || "Something went wrong!");
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
            onClick={() => setIsFormOpen(false)} // Close the pop-up when clicking outside
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
              <div className="flex flex-col gap-1 grow">
                <label className="font-medium text-white" htmlFor="plantName">
                  Plant Name
                </label>
                <input
                  className="px-1 py-1 bg-[#E1F1F1] shadow-sm focus:shadow outline-none w-full focus:ring-2 
                    focus:ring-[#2ecc71] transition duration-300 ease-in-out rounded-sm"
                  type="text"
                  id="plantName"
                  {...register("plantName", {
                    required: "Plant Name is required",
                  })}
                />
                {errors.plantName && (
                  <span className="text-red-500 text-sm">
                    {errors.plantName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 grow">
                <label
                  className="font-medium text-white"
                  htmlFor="wateringTime"
                >
                  Watering Time (min)
                </label>
                <input
                  className="px-1 py-1 bg-[#E1F1F1] shadow-sm focus:shadow outline-none w-full focus:ring-2 
                    focus:ring-[#2ecc71] transition duration-300 ease-in-out rounded-sm"
                  type="number"
                  id="wateringTime"
                  {...register("wateringTime", {
                    required: "Watering Time is required",
                  })}
                />
                {errors.wateringTime && (
                  <span className="text-red-500 text-sm">
                    {errors.wateringTime.message}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="watering" className="text-sm text-white">
                  Watered
                </label>
                <input
                  id="watering"
                  type="checkbox"
                  {...register("watering")}
                  className="form-checkbox h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
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
