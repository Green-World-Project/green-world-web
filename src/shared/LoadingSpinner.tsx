const LoadingSpinner = () => {
  return (
    <div className="grid place-items-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
