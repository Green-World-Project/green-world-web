import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="flex items-center justify-center flex-col text-center h-screen px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="mb-6 text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={handleGoHome}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
}
