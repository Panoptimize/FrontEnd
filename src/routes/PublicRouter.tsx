import { Outlet } from "react-router-dom";
import { useAppContext } from "../store/app-context/app-context";

const PublicRouter = () => {
  const { loadingContext } = useAppContext();
  return (
    <div>
      {loadingContext ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default PublicRouter;
