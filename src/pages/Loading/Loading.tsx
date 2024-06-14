import { Loader } from "../../components/Loader";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="loader h-32 w-32 mb-4"></div>
      <Loader />
    </div>
  );
};

export default Loading;
