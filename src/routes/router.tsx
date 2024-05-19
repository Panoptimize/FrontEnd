import { Dashboard, ActionCenter, Agents, History, Settings} from "../pages";
import { RouteObject, createBrowserRouter } from "react-router-dom";

import PrivateRouter from "./PrivateRouter";
// import PublicRouter from "./PublicRouter";
import { ROUTES } from "./constants";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <PrivateRouter />,
        children: [
            { path: ROUTES.DASHBOARD,           element: <Dashboard /> },
            { path: ROUTES.ACTION_CENTER,       element: <ActionCenter /> },
            { path: ROUTES.AGENTS,              element: <Agents /> },
            { path: ROUTES.HISTORY,             element: <History /> },
            { path: ROUTES.SETTINGS,            element: <Settings />}

        ]
    },
    // {
    //     path: '/',
    //     element: <PublicRouter />,
    // },
];

export const Router = createBrowserRouter(routes);