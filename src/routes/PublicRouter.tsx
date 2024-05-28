import { Outlet } from "react-router-dom";
import Loading from "../pages/Loading/Loading";
import { useAppContext } from "../store/app-context/app-context";

const PublicRouter = () => {
  const { loadingContext } = useAppContext();

  return (
    <div>
      {loadingContext ? (
        <Loading />
      ) : (
        <>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default PublicRouter;
