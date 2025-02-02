import { motion } from "framer-motion";

interface GreenDotProps {
  y: number;
  x: number;
  duration: number;
}

const GreenDot = ({ y, x, duration }: GreenDotProps) => (
  <motion.div
    initial={{ y: 0, x: 0 }}
    animate={{
      y: [0, y, 0, -y, 0], // Smooth vertical movement
      x: [0, x, 0, -x, 0], // Smooth horizontal movement
    }}
    transition={{
      duration: duration,
      repeat: Infinity, // Loop the animation
      repeatType: "loop", // Smoothly loop the animation
      ease: "easeInOut", // Smooth easing
    }}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="#3bc944"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" />
    </svg>
  </motion.div>
);

export default GreenDot;
