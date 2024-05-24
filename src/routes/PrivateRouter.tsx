import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

const PrivateRouter = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  return (
    <div className="flex flex-col flex-initial h-screen">
      <Topbar toggleSidebar={toggleSidebar} />
      <div className="h-dvh flex flex-row flex-auto">
        <div>
          <Sidebar expanded={isSidebarExpanded} />
        </div>
        <div className="flex flex-col flex-auto h-[calc(100vh-65px)]        ">
          <div className="flex flex-auto bg-white overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateRouter;