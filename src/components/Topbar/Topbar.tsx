import React from "react";
import logo from "../../assets/images/Panoptimize.png";
import { IoIosNotifications } from "react-icons/io";
import "./Topbar.css";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { useState, useEffect } from "react";
import { getSupervisorInfo } from "../../services/supervisorInfo/getSupervisorInfo";

interface TopbarProps {
  toggleSidebar: () => void;
  variant?: number;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar, variant = 0 }) => {
  let numberOfNotifications;
  let displayOption = "hidden";

  if (variant > 0) {
    numberOfNotifications = variant;
    displayOption = "block";
  }

  const [userInfo, setUserInfo] = useState<any[]>([]);

  const getUserInfo = async() =>{
    await getSupervisorInfo()
    .then((data) => {
      if(data && data.data){
        console.log("data.data.results");
        console.log(data);
        setUserInfo(data.data.results);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    getUserInfo()
  }, [])

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
            className="h-full"
            style={{ paddingTop: 18, paddingBottom: 18 }}
            src={logo}
            alt="Logo"
          />
        </div>
        <div className="flex flex-row space-x-2">
          <p className="text-gray-600 font-medium text-lg ml-1">Welcome</p>
          {/* ======================== NAME ======================== */}
          <p className="font-medium text-lg">John</p>
        </div>
      </div>
      <div className="h-16 flex items-center space-x-5">
        <div className="relative">
          <IoIosNotifications className="h-full text-4xl notification" />
          <div
            className={`${displayOption} w-4 h-4 rounded-full bg-red-500 flex justify-center items-center absolute bottom-3 right-0`}
          >
            <p className="text-white font-medium text-xs relative">
              {numberOfNotifications}
            </p>
          </div>
        </div>
        <div className="h-full flex flex-col justify-center items-center pr-7">
          <div className="h-full flex flex-col justify-center">
          {/* ======================== NAME ======================== */}
            <p className="text-left text-lg">John Connor</p>
          {/* ======================== EMAIL ======================== */}
            <p className="text-gray-600 text-left text-xs">
              jconnor28@gmail.com
            </p>
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
