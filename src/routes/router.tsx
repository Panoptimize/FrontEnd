import { Dashboard } from "../pages/Dashboard";
import { RouteObject, createBrowserRouter, Navigate } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { ROUTES } from "./constants";
import { Login } from "../pages/Login";
import { useAppContext } from "../store/app-context/app-context";

export const AppRouter = () => {
  const { user } = useAppContext();
  const isLoggedIn = Boolean(user);
  const routes: RouteObject[] = [
    {
      path: ROUTES.DASHBOARD,
      element: isLoggedIn ? <PrivateRouter /> : <Navigate to={ROUTES.AUTH} />,
      children: [{ path: ROUTES.DASHBOARD, element: <Dashboard /> }],
    },
    {
      path: ROUTES.AUTH,
      element: isLoggedIn ? (
        <Navigate to={ROUTES.DASHBOARD} />
      ) : (
        <PublicRouter />
      ),
      children: [{ path: ROUTES.AUTH, element: <Login /> }],
    },
  ];
  return createBrowserRouter(routes);
};
