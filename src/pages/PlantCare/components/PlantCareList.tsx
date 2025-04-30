import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../context/StoreContext";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import axios from "axios";
import { motion } from "framer-motion";
import { pcs } from "../../../constants/END_POINTS";
import { toast } from "react-toastify";
import PlantCareCard from "./PlantCareCard";
import { pcPlant } from "../../../interfaces/interfaces";

const PlantCareList = () => {
  const { token, userData } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlantCare = async () => {
      try {
        if (!token || !userData) return;
        setLoading(true);
        const res = await axios.get(pcs.get, {
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
    fetchPlantCare();
  }, [token, userData]);

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
          <PlantCareCard plant={plant} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PlantCareList;
