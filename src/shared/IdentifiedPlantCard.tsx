import { IoClose } from "react-icons/io5";
import { IdentifiedPlantCardProps } from "../interfaces/interfaces";

const IdentifiedPlantCard = ({
  plantResult,
  image,
  handleRemoveImage,
  showRemoveButton = true,
}: IdentifiedPlantCardProps) => {
  return (
    <div
      className={`${
        showRemoveButton && "relative"
      } w-64 h-64 shadow-lg rounded-md border border-gray-200 bg-white`}
    >
      <div className="w-full h-[70%] rounded-t-md">
        <img
          className="object-cover rounded-t-md w-full h-full"
          src={image}
          alt="image"
        />
      </div>
      <div className="px-3 pt-3">
        <p className="text-left font-bold">
          {plantResult?.name || "Unknown Plant"}
        </p>
        <div className="flex items-center justify-between">
          <h3
            className={`font-bold ${
              plantResult?.condition === "healthy" ? "text-green-600" : ""
            } `}
          >
            {plantResult?.condition || "No Condition Data"}
          </h3>
          <h3 className="font-bold">Plant Care</h3>
        </div>
      </div>
      {showRemoveButton && (
        <button
          onClick={handleRemoveImage}
          className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1 shadow-lg hover:bg-red-700 transition-colors"
        >
          <IoClose size={20} className="text-white" />
        </button>
      )}
    </div>
  );
};

export default IdentifiedPlantCard;
