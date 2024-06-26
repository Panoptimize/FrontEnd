import {
  Dashboard,
  ActionCenter,
  Agents,
  PasswordReset,
} from "../pages";
import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";

import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { ROUTES } from "./constants";
import { useAppContext } from "../store/app-context/app-context";
import { Login } from "../pages/Login";

export const AppRouter = () => {
  const { user } = useAppContext();
  const isLoggedIn = Boolean(user);
  const routes: RouteObject[] = [
    {
      path: "/",
      element: isLoggedIn ? <PrivateRouter /> : <Navigate to={ROUTES.AUTH} />,
      children: [
        { path: ROUTES.DASHBOARD, element: <Dashboard /> },
        { path: ROUTES.ACTION_CENTER, element: <ActionCenter /> },
        { path: ROUTES.AGENTS, element: <Agents /> },
      ],
    },
    {
      path: ROUTES.AUTH,
      element: isLoggedIn ? (
        <Navigate to={ROUTES.DASHBOARD} />
      ) : (
        <PublicRouter />
      ),
      children: [
        { path: ROUTES.AUTH, element: <Login /> },
        { path: ROUTES.PASSWORD_RESET, element: <PasswordReset /> },
      ],
    },
  ];

  return createBrowserRouter(routes);
};
