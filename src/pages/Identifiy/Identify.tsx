import FloatingDotsBackground from "../../shared/FloatingDotsBackground";
import UploadPlant from "./components/UploadPlant";
export default function Identify() {
  return (
    <div className="px-[2rem] lg:px-[4rem] pt-[120px] max-md:pt-10 max-sm:p-0 flex items-center justify-center relative min-h-screen bg-gradient-to-br from-green-200 to-green-50 overflow-hidden">
      <FloatingDotsBackground numberOfDots={40} />
      <UploadPlant />
    </div>
  );
}
