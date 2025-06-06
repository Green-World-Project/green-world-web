import { useContext, useEffect, useState } from "react";
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
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlantCareList = ({
  isFormOpen,
  setIsFormOpen,
  setIsSidebarOpen,
}: PlantCareListProps) => {
  const { token, userData, selectedPlant, setSelectedPlant } =
    useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [plants, setPlants] = useState<pcPlant[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPlantCare = async () => {
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
    };
    fetchPlantCare();
  }, [token, userData]);

  const handleRemovePlant = async () => {
    if (!selectedPlant) return;
    try {
      const response = await axios.delete(pcs.delete(selectedPlant._id), {
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
        prev.filter((plant: pcPlant) => plant._id !== selectedPlant._id)
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
    <>
      {!Array.isArray(plants) || plants.length === 0 ? (
        <div>
          <p className="text-lg text-gray-500">No plant care entries found.</p>
        </div>
      ) : (
        <motion.div
          className="grid w-full gap-x-6 gap-y-10 mb-16 
          [grid-template-columns:repeat(auto-fit,minmax(auto,1fr))] 
          sm:[grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]"
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
                setIsSidebarOpen={setIsSidebarOpen}
                onUpdated={(upd) =>
                  setPlants((prev) =>
                    prev.map((x) => (x._id === upd._id ? upd : x))
                  )
                }
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      <AddPlantForm
        setPlants={setPlants}
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
      />

      <ConfirmationModal
        onConfirm={handleRemovePlant}
        onClose={() => {
          setSelectedPlant(null);
          setIsModalOpen(false);
        }}
        isOpen={isModalOpen}
        message="Are you sure you want to remove this plant from your plant care list?"
      />
    </>
  );
};

export default PlantCareList;
