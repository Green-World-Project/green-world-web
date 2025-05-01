import { useCallback, useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../context/StoreContext";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import axios from "axios";
import { motion } from "framer-motion";
import { pcs } from "../../../constants/END_POINTS";
import { toast } from "react-toastify";
import PlantCareCard from "./PlantCareCard";
import { pcPlant } from "../../../interfaces/interfaces";
import ConfirmationModal from "../../../shared/ConfirmationModal";
import AddPlantForm from "../../../shared/AddPlantForm";

interface PlantCareListProps {
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlantCareList = ({ isFormOpen, setIsFormOpen }: PlantCareListProps) => {
  const { token, userData } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [plants, setPlants] = useState([]);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPlantCare = useCallback(async () => {
    if (!token || !userData) return;
    setLoading(true);
    try {
      const res = await axios.get(pcs.get, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlants(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching plant care list.");
    } finally {
      setLoading(false);
    }
  }, [token, userData]);

  useEffect(() => {
    fetchPlantCare();
  }, [fetchPlantCare]);

  const handleRemovePlant = async () => {
    if (!selectedPlantId) return;
    try {
      const response = await axios.delete(pcs.delete(selectedPlantId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setPlants((prev) =>
        prev.filter((plant: pcPlant) => plant._id !== selectedPlantId)
      );
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }

    setIsModalOpen(false);
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <motion.div
      className="grid justify-items-center items-start gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 
    lg:grid-cols-3 xl:grid-cols-4 mb-16"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {!plants && <div className="h-screen ">sdds</div>}
      {plants.map((plant: pcPlant) => (
        <motion.div
          key={plant._id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <PlantCareCard
            plant={plant}
            setIsModalOpen={setIsModalOpen}
            setSelectedPlantId={setSelectedPlantId}
          />
        </motion.div>
      ))}
      <ConfirmationModal
        onConfirm={handleRemovePlant}
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        message="Are you sure you want to remove this plant from your plant care list?"
      />
      <AddPlantForm
        onClose={() => {
          setIsFormOpen(false);
          fetchPlantCare(); // 3️⃣ refetch on close
        }}
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
      />
    </motion.div>
  );
};

export default PlantCareList;
