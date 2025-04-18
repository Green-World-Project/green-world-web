import { useContext, useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { StoreContext } from "../../context/StoreContext";
import { getInitial } from "../../constants/UTILS";

export default function ProfilePictureUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { userData } = useContext(StoreContext);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center justify-center space-y-4">
      <div className="relative w-32 h-32 rounded-full border-2 border-green-600 shadow-md">
        <div className="w-full h-full rounded-full overflow-hidden">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full grid place-items-center bg-gradient-to-br from-green-300 to-green-100">
              <span className="text-[#43a047] font-semibold text-5xl">
                {getInitial(userData?.firstName)}
              </span>
            </div>
          )}
        </div>

        <div
          onClick={handleClick}
          className="absolute bottom-0 right-0 bg-[#43a047] w-8 h-8 z-30 rounded-full text-white cursor-pointer flex items-center justify-center"
        >
          <FiCamera className="text-lg" />
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
  );
}
