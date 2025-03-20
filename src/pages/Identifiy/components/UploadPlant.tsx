import { useContext, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import axios from "axios";
import { identify } from "../../../constants/END_POINTS";
import { StoreContext } from "../../../context/StoreContext";
import { IoClose } from "react-icons/io5";
import IdentifiedPlantCard from "../../../shared/IdentifiedPlantCard";
import { PlantResult } from "../../../interfaces/interfaces";
import { toast } from "react-toastify";

export default function UploadPlant() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const { token } = useContext(StoreContext);

  const fadeUp = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  // const [images, setImages] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [plantResult, setPlantResult] = useState<PlantResult | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger file input when the upload button is clicked
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Handle removal of the selected file
  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewImage(null);
    setPlantResult(null);
  };

  // Handle file selection or drop event
  // const handleFiles = (fileList: FileList) => {
  //   const file = fileList[0];
  //   if (file) {
  //     const newImageURL = URL.createObjectURL(file);
  //     setImages((prevImages) => {
  //       const updatedImages = [newImageURL, ...prevImages].slice(0, 3);
  //       return updatedImages;
  //     });
  //   }
  // };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await axios.post(identify, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Add Bearer token to headers
        },
      });

      setPlantResult(response.data);
      toast.success("Plant identification added to history!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error || "An unexpected error occurred"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const newImageURL = URL.createObjectURL(file);
      setPreviewImage(newImageURL);
    }
  };

  // Handle drag-and-drop events
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Extract the file from the dropped items
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      setSelectedFile(droppedFiles[0]);
      const newImageURL = URL.createObjectURL(droppedFiles[0]);
      setPreviewImage(newImageURL);
    }
  };

  // Handle drag over event to allow dropping
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <motion.div
      className="upload-container w-8/12 max-w-[1500px] mx-auto bg-white z-20 text-center p-10 rounded-lg shadow-2xl max-lg:w-5/6 max-md:w-full"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-black text-[2.5rem] font-semibold mb-2 max-[340px]:text-4xl">
        Plant Identification
      </h2>

      <div
        ref={containerRef}
        className={`upload-area border-[2px] border-dashed rounded-lg py-10 px-5
transition-colors hover:border-[#4CAF50] hover:bg-[#f9f9f9] ${
          previewImage && "flex items-center justify-center py-5"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {!previewImage ? (
          <>
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <p className="text-lg text-gray-700 mb-2">
              Drag and drop your plant photo here
            </p>
            <p className="text-lg text-gray-700 mb-4">or</p>
            <button
              className="select-button text-base bg-[#4CAF50] text-white px-5 py-2 rounded-md shadow-md transition-all hover:bg-[#45a049] focus:outline-none"
              onClick={handleButtonClick}
            >
              Choose Image
            </button>
          </>
        ) : plantResult ? (
          <IdentifiedPlantCard
            handleRemoveImage={handleRemoveImage}
            image={previewImage}
            plantResult={plantResult}
            maxWidth="max-w-64"
            height="h-64"
          />
        ) : (
          <div className="relative w-64 h-64 shadow-lg">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-cover rounded-md shadow-md"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1 shadow-lg hover:bg-red-700 transition-colors"
            >
              <IoClose size={20} className="text-white" />
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-5">
        <button
          onClick={handleUpload}
          disabled={!selectedFile || !!plantResult || loading}
          className={`upload-button text-base text-white px-5 py-2 rounded-md shadow-md transition-all focus:outline-none 
    ${
      loading || !selectedFile || plantResult
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600"
    }
  `}
        >
          {loading ? "Uploading..." : "Identify Image"}
        </button>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {images.map((img, index) => (
            <div
              key={index}
              className="card border-2 border-[#4CAF50] rounded-lg overflow-hidden shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={img}
                alt={`Upload ${index + 1}`}
                className="w-full h-56 object-contain"
              />
            </div>
          ))}
        </div> */}
    </motion.div>
  );
}
