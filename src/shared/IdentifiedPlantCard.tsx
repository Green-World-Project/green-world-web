import { IoClose } from "react-icons/io5";
import { IdentifiedPlantCardProps } from "../interfaces/interfaces";
import { motion } from "framer-motion";
import { formatDate } from "../constants/UTILS";

const IdentifiedPlantCard = ({
  plantResult,
  image,
  handleRemoveImage,
  maxWidth,
  height,
  plant,
  iconSize,
  setIsModalOpen,
  setSelectedPlantId,
}: IdentifiedPlantCardProps) => {
  const handleOpenModal = () => {
    if (!plant) return;
    setSelectedPlantId?.(plant._id);
    setIsModalOpen?.(true);
  };

  return (
    <motion.div
      layout
      className={`${"relative"} w-full pb-2 ${maxWidth}  ${height}  shadow-lg max-[400px]min-h-96 rounded-md border border-gray-200 bg-white`}
    >
      <div className="w-full h-[75%] rounded-t-md">
        <img
          className="object-cover rounded-t-md w-full h-full "
          src={image || plant?.photo}
          alt="plant image"
        />
      </div>
      <div className="px-3 pt-3">
        <p className="text-left font-bold">
          {plantResult?.name || plant?.info.name || "Unknown Plant"}
        </p>

        <h3
          className={`font-bold text-left ${
            plantResult?.condition === "healthy" ||
            plant?.info.condition === "healthy"
              ? "text-green-600"
              : "text-red-600"
          } `}
        >
          {plantResult?.condition ||
            plant?.info.condition ||
            "No Condition Data"}
        </h3>

        <p className="text-left mt-1 text-gray-500 text-sm font-medium">
          {plant?.createAt && formatDate(plant.createAt)}
        </p>
      </div>

      <button
        onClick={handleRemoveImage || handleOpenModal}
        className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1 shadow-lg hover:bg-red-700 transition-colors"
      >
        <IoClose size={iconSize || 20} className="text-white" />
      </button>
    </motion.div>
  );
};

export default IdentifiedPlantCard;
