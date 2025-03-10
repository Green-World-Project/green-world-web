import React, { useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../../context/StoreContext";
import { identify } from "../../../constants/END_POINTS";

export default function UploadPlant() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(StoreContext);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

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
      console.log("Upload success:", response.data);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 z-20">
      <h2 className="text-2xl font-semibold">Upload Plant Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-500 file:text-white hover:file:bg-green-600"
      />
      <button
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        className={`px-4 py-2 rounded-md text-white ${
          loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
}
