import { Outlet } from "react-router-dom";
import { Topbar } from "../components/Topbar";
import { Sidebar } from "../components/Sidebar";

const PrivateRouter = () => {
  return (
    <div className="h-screen">
        <Topbar />
        <div className="flex  h-[calc(100vh-65px)]">
            <div className="flex flex-row flex-auto">
                <div className="flex">
                <Sidebar />
                </div>  
                
                <div className="flex flex-auto" style={{ overflowY: "auto" }}>
                    <Outlet />
                </div>
            </div>
      </div>
    </div>
  );
};

export default PrivateRouter;