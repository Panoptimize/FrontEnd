import { Dashboard } from "../pages/Dashboard";
import { RouteObject, createBrowserRouter } from "react-router-dom";

import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { ROUTES } from "./constants";
import { Login } from "../pages/Login";

const routes: RouteObject[] = [
  {
    path: ROUTES.DASHBOARD,
    element: <PrivateRouter />,
    children: [
      { path: ROUTES.DASHBOARD, element: <Dashboard /> },
      { path: ROUTES.AUTH, element: <Login /> },
    ],
  },
  // {
  //     path: '/',
  //     element: <PublicRouter />,
  // },
];

export const Router = createBrowserRouter(routes);

