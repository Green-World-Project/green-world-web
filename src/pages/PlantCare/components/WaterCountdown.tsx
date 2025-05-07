import { useEffect, useState } from "react";
import { getWaterCountdown } from "../../../constants/UTILS";
import { FiClock } from "react-icons/fi";

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

    // clean up on unmount or if nextWateringDate changes
    return () => clearInterval(timer);
  }, [nextWateringDate]);

  return (
    <div className="inline-flex items-center space-x-2">
      <p className="font-semibold">
        <span>Time to Water:</span>{" "}
        <span
          className={`font-mono  ${
            countdown === "00:00:00:00" ? "text-red-600" : "text-green-900"
          }`}
        >
          {countdown}
        </span>
      </p>
      <FiClock />
    </div>
  );
}
