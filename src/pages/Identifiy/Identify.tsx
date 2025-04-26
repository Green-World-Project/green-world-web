import { useEffect } from "react";
import FloatingDotsBackground from "../../shared/FloatingDotsBackground";
import UploadPlant from "./components/UploadPlant";
export default function Identify() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-[2rem] lg:px-[4rem] pt-[120px] pb-8 max-md:pt-12 max-sm:px-0 flex items-center justify-center relative min-h-screen bg-gradient-to-br from-green-200 to-green-50 overflow-hidden">
      <FloatingDotsBackground numberOfDots={40} />
      <UploadPlant />
    </div>
  );
}
