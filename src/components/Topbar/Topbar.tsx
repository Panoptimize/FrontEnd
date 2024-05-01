import React from "react";
import avatar from "../../assets/images/Toretto.jpg";
import panoptimize from "../../assets/images/Panoptimize.png";
import menu from "../../assets/images/Menu.png";
import { IoIosNotifications } from "react-icons/io";
import "./Topbar.css";
import { ITopbar } from "./types";
import { Button } from "../Button";

const Topbar: React.FC<ITopbar> = ({
  name = "User",
  fullName = "User Unknown",
  email = "user@email.com",
  img,
  numberOfNotifications = 0,
}) => {
  let displayOption = "hidden ";

  if (numberOfNotifications > 0) {
    displayOption = "block";
  }

  return (
    <div className="h-16 w-screen">
      <div className="flex justify-between bg-teal-100">
        <div className="flex items-center h-16 px-1">
          <Button baseColor="transparent" image="dashboard"></Button>
          <img className="h-1/2" src={panoptimize} alt="" />
          <div className="flex items-center gap-2 px-5 h-full justify-center">
            <p className="text-black font-medium text-lg">Welcome {name}</p>
          </div>
        </div>
        <div className=" h-16 justify-center flex">
          <div className="relative flex items-center">
            <Button baseColor="transparent" image="dashboard"></Button>
            <div
              className={`${displayOption}  w-4 h-4 rounded-full bg-red-500 flex justify-center items-center absolute bottom-3 right-0`}
            >
              <p className="text-black font-medium text-xs relative">
                {numberOfNotifications}
              </p>
            </div>
          </div>
          <div className="h-full flex flex-col justify-center items-center px-7">
            <div className="h-full flex flex-col justify-center">
              <p className="text-black text-left text-lg">{fullName}</p>
              <p className="text-gray-600 text-left text-xs">{email}</p>
            </div>
          </div>
          <div className="flex items-center mr-5">
            <Button baseColor="transparent" image="dashboard"></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
