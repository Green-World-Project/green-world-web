import { useEffect, useState } from "react";
import { getWaterCountdown } from "../../../constants/UTILS";
import { FiClock } from "react-icons/fi";
import { motion } from "framer-motion";

interface WaterCountdownProps {
  nextWateringDate: string;
}

export function WaterCountdown({ nextWateringDate }: WaterCountdownProps) {
  const [countdown, setCountdown] = useState(
    getWaterCountdown(nextWateringDate)
  );

  useEffect(() => {
    // update once a second
    const timer = setInterval(() => {
      setCountdown(getWaterCountdown(nextWateringDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [nextWateringDate]);

  return (
    <div className="inline-flex items-center space-x-2">
      <p className="font-semibold">
        <span>Time to Water:</span>{" "}
        <motion.span
          className={`font-mono ${
            countdown === "00:00:00:00" ? "text-red-500" : "text-green-500"
          }`}
          animate={countdown === "00:00:00:00" ? { opacity: [1, 0.7, 1] } : {}}
          transition={
            countdown === "00:00:00:00" ? { duration: 1, repeat: Infinity } : {}
          }
        >
          {countdown}
        </motion.span>
      </p>
      <motion.div
        className={
          countdown === "00:00:00:00" ? "text-red-500" : "text-green-500"
        }
        animate={
          countdown === "00:00:00:00"
            ? { scale: [1, 1.1, 1], opacity: [1, 0.7, 1] }
            : {}
        }
        transition={
          countdown === "00:00:00:00" ? { duration: 1, repeat: Infinity } : {}
        }
      >
        <FiClock />
      </motion.div>
    </div>
  );
}
