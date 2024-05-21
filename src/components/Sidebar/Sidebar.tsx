import React, { useState, useEffect } from "react";
import { Button } from "../Button";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import myLogo from "../../assets/images/Panoptimize.png";

interface SidebarProps {
  expanded?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ expanded = true }) => {
  const width = expanded ? "w-52" : "w-14";

  // Get the current location
  const location = useLocation();

  // Logic for sidebar active link
  const [activeButton, setActiveButton] = useState<string>(ROUTES.DASHBOARD);

  // Handle button click
  const handleButtonClick = (route: string) => {
    setActiveButton(route);
    localStorage.setItem("activeButton", route);
  };

  // Restore active button state from localStorage when the component mounts
  useEffect(() => {
    const savedActiveButton = localStorage.getItem("activeButton");
    if (savedActiveButton) {
      setActiveButton(savedActiveButton);
    }
  }, []);

  // Update the active button based on the location
  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location.pathname]);

  return (
    <div
      className={`${width} flex flex-auto px-2 justify-center bg-[#FFFFFF] border-r`}
      style={{ height: "100vh-65" }}
    >
      <div className="flex flex-col flex-auto justify-between">
        <div className="flex flex-col my-1 justify-start">
          <div className="flex flex-col">
            <Link
              to={ROUTES.DASHBOARD}
              className="w-full"
              onClick={() => handleButtonClick(ROUTES.DASHBOARD)}
            >
              <div className="my-1 flex flex-grow justify-center">
                <Button
                  baseColor={
                    activeButton === ROUTES.DASHBOARD ? "teal" : "transparent"
                  }
                  image="Dashboard.svg"
                  text={expanded ? "Dashboard" : ""}
                ></Button>
              </div>
            </Link>
            <Link
              to={ROUTES.ACTION_CENTER}
              className="w-full"
              onClick={() => handleButtonClick(ROUTES.ACTION_CENTER)}
            >
              <div className="my-1 flex flex-auto">
                <Button
                  baseColor={
                    activeButton === ROUTES.ACTION_CENTER
                      ? "teal"
                      : "transparent"
                  }
                  image="ActionCenter.svg"
                  text={expanded ? "Action Center" : ""}
                ></Button>
              </div>
            </Link>
            <Link
              to={ROUTES.AGENTS}
              className="w-full"
              onClick={() => handleButtonClick(ROUTES.AGENTS)}
            >
              <div className="my-1 flex flex-auto">
                <Button
                  baseColor={
                    activeButton === ROUTES.AGENTS ? "teal" : "transparent"
                  }
                  image="Agents.svg"
                  text={expanded ? "Agents" : ""}
                ></Button>
              </div>
            </Link>

            <Link
              to={ROUTES.HISTORY}
              className="w-full"
              onClick={() => handleButtonClick(ROUTES.HISTORY)}
            >
              <div className="my-1 flex flex-auto">
                <Button
                  baseColor={
                    activeButton === ROUTES.HISTORY ? "teal" : "transparent"
                  }
                  image="History.svg"
                  text={expanded ? "History" : ""}
                ></Button>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-end my-4">
          <Link
            to={ROUTES.SETTINGS}
            className="w-full"
            onClick={() => handleButtonClick(ROUTES.SETTINGS)}
          >
            <div className="my-1 flex flex-auto">
              <Button
                baseColor={
                  activeButton === ROUTES.SETTINGS ? "teal" : "transparent"
                }
                image="Gear.svg"
                text={expanded ? "Settings" : ""}
              ></Button>
            </div>
          </Link>
          <div className="my-1  flex flex-auto">
            <Button
              baseColor="transparent"
              image="logout.svg"
              text={expanded ? "Log Out" : ""}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
