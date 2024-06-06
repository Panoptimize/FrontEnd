import React, { useEffect, useState } from "react";
import logo from "../../assets/images/Panoptimize.png";
import { IoIosNotifications } from "react-icons/io";
import "./Topbar.css";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { getAuthUser } from "../../services/getAuth/getAuthUser";

interface TopbarProps {
  toggleSidebar: () => void;
  variant?: number;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar, variant = 0 }) => {
  let numberOfNotifications;
  let displayOption = "hidden";

  const [name, setName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const fetchUserInfo = async () => {
    try {
      const result = await getAuthUser();
      if (result.error) {
        console.log(result.error);
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

  if (variant > 0) {
    numberOfNotifications = variant;
    displayOption = "block";
  }

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
            className="h-full"
            style={{ paddingTop: 18, paddingBottom: 18 }}
            src={logo}
            alt="Logo"
          />
        </div>
        <div className="flex flex-row space-x-2">
          <p className="text-gray-600 font-medium text-lg ml-1">Welcome</p>
          <p className="font-medium text-lg">{firstName}</p>
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
