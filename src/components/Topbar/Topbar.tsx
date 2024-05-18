import React from "react";
import logo from "../../assets/images/PanoptimizeApp Transparent.png";
import { IoIosNotifications } from "react-icons/io";
import "./Topbar.css";
import { Button } from "../Button";
import { Avatar } from "../Avatar";

const Topbar = ({ variant = 0 }: { variant?: number }) => {
  let numberOfNotifications;
  let displayOption = "hidden";

  if (variant > 0) {
    numberOfNotifications = variant;
    displayOption = "block";
  }

  return (
    <div className="topbar flex items-center justify-between bg-white border-b">
      <div className="flex items-center h-16 p-2 space-x-5">
        <div className="flex flex-row h-16 py-1 items-center space-x-1">
          <Button baseColor="transparent" image="Menu"></Button>
          <img className="h-full py-2" src={logo} alt="Logo" />
          <p className="text-gray-600 font-medium text-lg">Panoptimize</p>
        </div>
        <div className="flex flex-row space-x-2">
          <p className="text-gray-600 font-medium text-lg">Welcome</p>
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
            <p className="text-left text-lg">John Connor</p>
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
