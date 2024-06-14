import { Loader } from "../../components/Loader";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100">
      <Loader />
    </div>
  );
};

export default Loading;
