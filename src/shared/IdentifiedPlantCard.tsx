import { IoClose } from "react-icons/io5";
import { IdentifiedPlantCardProps } from "../interfaces/interfaces";

const IdentifiedPlantCard = ({
  plantResult,
  image,
  handleRemoveImage,
  showRemoveButton = true,
  maxWidth,
  height,
}: IdentifiedPlantCardProps) => {
  return (
    <div
      className={`${
        showRemoveButton && "relative"
      } w-full pb-2  ${maxWidth}  ${height}  shadow-lg rounded-md border border-gray-200 bg-white max-sm:h-auto`}
    >
      <div className="w-full h-[75%] rounded-t-md">
        <img
          className="object-cover rounded-t-md w-full h-full "
          src={image}
          alt="image"
        />
      </div>
      <div className="px-3 pt-3">
        <p className="text-left font-bold">
          {plantResult?.name || "Unknown Plant"}
        </p>
        <div className="flex items-center justify-between flex-wrap gap-x-2">
          <h3
            className={`font-bold ${
              plantResult?.condition === "healthy"
                ? "text-green-600"
                : "text-red-600"
            } `}
          >
            {plantResult?.condition || "No Condition Data"}
          </h3>
          <button className="font-bold">Plant Care</button>
        </div>
        {/* <p className="text-left mt-1 text-gray-500 text-sm font-medium">
          {plantResult.date
            ? new Date(plantResult.date).toLocaleString("en-US", {
                month: "long",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })
            : "No Date Available"}
        </p> */}
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
