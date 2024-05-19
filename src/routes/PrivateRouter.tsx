import { Outlet } from "react-router-dom";

const PrivateRouter = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default PrivateRouter;