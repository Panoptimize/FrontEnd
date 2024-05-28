const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
      <h2 className="text-center text-gray-600 text-xl font-semibold">
        Loading...
      </h2>
      <p className="w-1/3 text-center text-gray-500">
        Please wait while we load your content.
      </p>
    </div>
  );
};

export default Loading;
