import exp from "constants";
import { Outlet } from "react-router-dom";

const PublicRouter = () => {
    return (
        <div>
            <h1>Public</h1>
            <Outlet />
        </div>
    );
}

export default PublicRouter;