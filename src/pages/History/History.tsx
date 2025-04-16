import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { history } from "../../constants/END_POINTS";
import IdentifiedPlantCard from "../../shared/IdentifiedPlantCard";
import { Plant } from "../../interfaces/interfaces";
import { toast } from "react-toastify";
import LoadingSpinner from "../../shared/LoadingSpinner";
import ConfirmationModal from "../../shared/ConfirmationModal";

export default function History() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const { token, userData } = useContext(StoreContext);

  useEffect(() => {
    const fetchPlantHistory = async () => {
      try {
        if (!token) return;
        setLoading(true);
        const res = await axios.get(history.get, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlants(res.data);
      } catch (error) {
        toast.error("Error fetching plants");
        console.error("Error fetching plants", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlantHistory();
  }, [token]);

  // const handleRemove = async (plantId: string) => {
  //   try {
  //     await axios.delete(`/api/plant-history/${plantId}`);
  //     // Optimistically update local state
  //     setPlants((prev) => prev.filter((plant) => plant.id !== plantId));
  //   } catch (error) {
  //     console.error("Failed to delete plant:", error);
  //   }
  // };

  const handleRemovePlant = () => {
    console.log("deleted");
    console.log(selectedPlantId);
    setIsModalOpen(false);
  };

  return (
    <div className="container-custom px-[2rem] lg:px-[4rem]">
      <h1 className="text-[#1b5e20] text-4xl font-bold text-left mb-12">
        {userData ? (
          <>
            Hello <span className="text-[#43a047]">{userData.firstName}</span>,
            here is your plant history
          </>
        ) : (
          "History"
        )}
      </h1>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div
          className="grid justify-items-center
          gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {plants.map((plant: Plant) => (
            <IdentifiedPlantCard
              key={plant._id}
              plant={plant}
              setSelectedPlantId={setSelectedPlantId}
              setIsModalOpen={setIsModalOpen}
              iconSize={24}
              height=" h-96"
            />
          ))}
        </div>
      )}
      <ConfirmationModal
        onConfirm={handleRemovePlant}
        onClose={() => setIsModalOpen?.(false)}
        isOpen={isModalOpen}
        message="Are you sure you want to delete this plant?"
      />
    </div>
  );
}
