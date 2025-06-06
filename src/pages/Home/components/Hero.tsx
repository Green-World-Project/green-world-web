import { useContext } from "react";
import heroImg from "../../../assets/right-side-hero.jpg";
import { motion } from "framer-motion";
import { StoreContext } from "../../../context/StoreContext";
import { getTimeBasedGreeting } from "../../../constants/UTILS";

export default function Hero() {
  const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  const { userData } = useContext(StoreContext);

  return (
    <section
      className="hero bg-custom-gradient 
    "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen overflow-hidden container-custom max-md:pt-10 pb-0">
        <motion.div
          className="flex flex-col justify-center p-[2rem] lg:p-[4rem]"
          initial="hidden"
          animate="visible"
          variants={fadeLeft}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="text-6xl text-[#1b5e20] font-bold mb-5">
            Green World
          </h1>
          {userData && (
            <h2 className="text-3xl font-semibold text-[#388e3c] mb-4 drop-shadow-sm">
              {getTimeBasedGreeting(userData.firstName)}
            </h2>
          )}
          <p className="font-normal text-[#2e7d32] text-2xl">
            Discover and identify the beautiful plants around you with our
            AI-powered technology
          </p>
        </motion.div>
        <motion.div
          className="relative"
          initial="hidden"
          animate="visible"
          variants={fadeRight}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <img
            className="hero-plant-image"
            src={heroImg}
            alt="hero"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
