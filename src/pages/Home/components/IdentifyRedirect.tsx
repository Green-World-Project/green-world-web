import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInView, motion } from "framer-motion";
import { MdOutlineImageSearch } from "react-icons/md";
import FloatingDotsBackground from "../../../shared/FloatingDotsBackground"; // Assuming you have this

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
      className="relative overflow-hidden bg-gradient-to-br from-green-200 to-green-50
      px-6 py-24 sm:px-10 md:py-28"
    >
      <FloatingDotsBackground numberOfDots={25} />
      <motion.div
        ref={containerRef}
        className="relative upload-container max-w-[750px] mx-auto bg-white z-20 text-center
        px-6 py-12 sm:px-8 sm:py-16 shadow-2xl rounded-3xl border border-gray-200"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeUp}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex flex-col items-center justify-center gap-6">
          <h2 className="text-black text-[2.5rem] font-semibold">
            Identify Plants Instantly
          </h2>

          <motion.button
            onClick={() => navigate("/identify")}
            className="flex items-center gap-3 px-6 py-3 text-lg font-semibold text-white bg-green-600
            rounded-lg shadow-md hover:bg-green-700 transition-all focus:outline-none focus:ring-4 focus:ring-green-300"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <MdOutlineImageSearch size={30} />
            Identify Now
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
