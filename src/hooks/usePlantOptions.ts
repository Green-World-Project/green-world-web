import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { pcs } from "../constants/END_POINTS";
import { plantOption } from "../interfaces/interfaces";
import { toast } from "react-toastify";

export function usePlantOptions() {
  const { token, userData } = useContext(StoreContext);
  const [plantOptions, setPlantOptions] = useState<plantOption[]>([]);

  useEffect(() => {
    const fetchPlantOptions = async () => {
      if (!token || !userData) return;

      try {
        const res = await axios.get(pcs.getPlantsOptions, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlantOptions(res.data);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    };

    fetchPlantOptions();
  }, [token, userData]); // only re-run when token/userData change

  return plantOptions;
}
