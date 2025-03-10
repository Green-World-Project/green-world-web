import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import FloatingDotsBackground from "../../../shared/FloatingDotsBackground";
import { FaFileUpload } from "react-icons/fa";

export default function IdentifyRedirect() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const fadeUp = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-lightGreen to-paleGreen
     px-5 py-12 max-[340px]:px-0"
    >
      <FloatingDotsBackground numberOfDots={25} />
      <motion.div
        ref={containerRef}
        className="relative upload-container max-w-[700px] mx-auto bg-white z-20 text-center px-5 py-20 rounded-md"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeUp}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-black text-[2.5rem] font-semibold mb-2 max-[340px]:text-4xl">
          Identify Plants For Free
        </h2>
        <div className="flex justify-center mt-10">
          <motion.button
            onClick={() => navigate("/identify")}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaFileUpload fill="#2e7d32" fontSize={40} />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
