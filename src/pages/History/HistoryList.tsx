import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { Plant } from "../../interfaces/interfaces";
import IdentifiedPlantCard from "../../shared/IdentifiedPlantCard";
import ConfirmationModal from "../../shared/ConfirmationModal";
import { history } from "../../constants/END_POINTS";

function HistoryList() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const { token, userData } = useContext(StoreContext);

  useEffect(() => {
    const fetchPlantHistory = async () => {
      if (!token || !userData) return;
      try {
        setLoading(true);
        const res = await axios.get(history.get, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlants(res.data);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPlantHistory();
  }, [token, userData]);

  const handleRemovePlant = async () => {
    if (!selectedPlantId) return;
    try {
      const response = await axios.delete(history.delete(selectedPlantId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data, {
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setPlants((prev) =>
        prev.filter((plant: Plant) => plant._id !== selectedPlantId)
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
  ) : !Array.isArray(plants) || plants.length === 0 ? (
    <div>
      <p className="text-lg text-gray-500">History is Empty</p>
    </div>
  ) : (
    <>
      <motion.div
        className="grid justify-items-center gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16"
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
        {plants.map((plant: Plant) => (
          <motion.div
            key={plant._id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <IdentifiedPlantCard
              plant={plant}
              setSelectedPlantId={setSelectedPlantId}
              setIsModalOpen={setIsModalOpen}
              iconSize={24}
              height=" h-96"
            />
          </motion.div>
        ))}
      </motion.div>
      <ConfirmationModal
        onConfirm={handleRemovePlant}
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        message="Are you sure you want to delete this plant?"
      />
    </>
  );
}

export default HistoryList;
