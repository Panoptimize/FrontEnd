import React, { useEffect, useState } from "react";
import logo from "../../assets/images/Panoptimize.png";
import { IoIosNotifications } from "react-icons/io";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { useNavigate } from "react-router-dom";
import { Notification } from "./types";
import { FaTimes } from "react-icons/fa";
import { getAuthUser } from "../../services/getAuth/getAuthUser";
import { toast } from "react-toastify";

interface TopbarProps {
  toggleSidebar: () => void;
  notifications: Notification[];
  unreadCount: number;
  resetNotificationCount: () => void;
  clearNotifications: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar, notifications, unreadCount, resetNotificationCount, clearNotifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  // Toggle notifications
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    resetNotificationCount();
  };

  // Close notifications
  const closeNotifications = () => {
    setShowNotifications(false);
  };

  // Handle notification click
  const handleNotificationClick = () => {
    navigate('/action-center');
    closeNotifications();
  };

  useEffect(() => {
    if (showNotifications) {
      resetNotificationCount();
    }
  }, [showNotifications, resetNotificationCount]);

  const [name, setName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const fetchUserInfo = async () => {
    try {
      const result = await getAuthUser();
      if (result.error) {
        toast.error("Error fetching user info");
      } else {
        const fullName = result.fullName;
        const firstName = fullName.split(" ")[0];
        const email = result.email;
        setName(fullName);
        setEmail(email);
        setFirstName(firstName);
      }
    } catch (error) {
      console.log("Error fetching user info", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="topbar flex flex-auto items-center justify-between bg-white border-b">
      <div className="flex items-center h-16 p-2 space-x-5">
        <div className="flex flex-row h-16 py-1 items-center space-x-3">
          <Button
            baseColor="transparent"
            image="Menu.svg"
            onClick={toggleSidebar}
          ></Button>
          <img
            className="h-full pt-4 pb-4"
            src={logo}
            alt="Logo"
            data-testid="logo"
          />
        </div>
        <div className="flex flex-row space-x-2">
          <p className="text-gray-600 font-medium text-lg ml-1">Welcome</p>
          <p className="font-medium text-lg">{firstName}</p>
        </div>
      </div>
      <div className="h-16 flex items-center space-x-5">
        <div className="relative">
          <IoIosNotifications 
            className="h-full text-4xl notification"
            onClick={toggleNotifications}
            data-testid="notification-icon"
          />
          <div
            className={`${unreadCount > 0 ? "block" : "hidden"} w-4 h-4 rounded-full bg-red-500 flex justify-center items-center absolute bottom-3 right-0`}
            data-testid="unread-count"
          >
            <p className="text-white font-medium text-xs relative">
              {unreadCount}
            </p>
          </div>
        </div>
        {showNotifications && (
          <div className="absolute top-16 right-0 w-64 bg-white border rounded-lg shadow-lg z-10 p-2 overflow-hidden" data-testid="notification-dropdown">
            <div className="flex justify-between items-center pb-2">
              <span className="font-semibold text-lg">Notifications</span>
              <button onClick={clearNotifications} data-testid="clear-all-button"> Clear All </button>
              <FaTimes
                className="cursor-pointer text-gray-500"
                onClick={closeNotifications}
                data-testid="close-notifications"
              />
            </div>
            <div className="overflow-y-auto max-h-64">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div key={index} className="p-2 border-b cursor-pointer" onClick={handleNotificationClick} data-testid="notification-item">
                    <p className="text-sm font-normal">
                      <span className="text-black">⚠️ The agent </span>
                      <span className="text-[#008F89] font-bold">{notification.agentName}</span>
                      <span className="text-black"> needs assistance!</span>
                    </p>
                    <p className="text-xs text-gray-500">{notification.timestamp}</p>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-600 p-2">No notifications</div>
              )}
            </div>
          </div>
        )}
        <div className="h-full flex flex-col justify-center items-center pr-7">
          <div className="h-full flex flex-col justify-center">
            <p className="text-left text-lg">{name}</p>
            <p className="text-gray-600 text-left text-xs">{email}</p>
          </div>
        </div>
        <div className="items-center flex pr-5">
          <Avatar />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
