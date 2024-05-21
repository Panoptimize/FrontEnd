import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

const PrivateRouter = () => {
  return (
    <div>
      <div className="flex h-screen">
        {/* Put the sidebar and the topbar in the same row */}
        <div className="flex">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-auto">
          <Topbar />
          <div className="flex flex-auto" style={{ overflowY: "auto" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateRouter;
