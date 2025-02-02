import { features } from "../../../constants/FEATURES";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Features() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5, // Delay each child animation by 0.5s
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="features text-center px-[1rem] pb-[1.5rem]">
      <h2 className="text-black text-[2.5rem] font-semibold my-10">
        Discover 3 Intriguing Reasons to Choose Green World
      </h2>
      <motion.div
        ref={containerRef}
        className="features-container flex flex-row justify-center gap-[4rem] max-md:flex-col max-md:items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"} // Trigger animation when in view
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="feature-card flex flex-col items-center max-w-[300px] rounded-full"
            variants={cardVariants}
          >
            <div
              className="feature-card-img p-1 rounded-[50%] w-[200px] h-[200px] border-[4px] border-dashed border-[#43a047]
             transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <img
                className="rounded-[100%] w-full h-full object-cover"
                src={feature.img}
                alt="feature"
                loading="lazy"
              />
            </div>

            <p className="text-black text-lg mt-3 font-semibold">
              {feature.title}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
