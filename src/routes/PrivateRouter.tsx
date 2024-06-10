import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { Notification } from "../components/Topbar/types";

const PrivateRouter = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleSetNotifications = (newNotifications: Notification[]) => {
    setNotifications(prev => [...prev, ...newNotifications]);
    setUnreadCount(prev => prev + newNotifications.length);
  };

  

  return (
    <div className="flex flex-col flex-initial h-screen">
      <Topbar 
        toggleSidebar={toggleSidebar}
        notifications={notifications}
        unreadCount={unreadCount}/>
      <div className="h-dvh flex flex-row flex-auto">
        <div>
          <Sidebar expanded={isSidebarExpanded} />
        </div>
        <div className="flex flex-col flex-auto h-[calc(100vh-65px)]">
          <div className="flex flex-auto bg-white overflow-y-scroll">
            <Outlet context={{ setNotifications: handleSetNotifications }}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateRouter;
