import React, { useState, useEffect } from "react";
import { Button } from "../Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import { useAppContext } from "../../store/app-context/app-context";
import { ISidebar } from "./types";
import { toast } from "react-toastify";

const Sidebar: React.FC<ISidebar> = ({ expanded }) => {
  const navigate = useNavigate();
  const { logOut } = useAppContext();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate(ROUTES.AUTH);
    } catch (e) {
      toast.error("Failed to log out");
    }
  };
  const width = expanded ? "w-56" : "w-14";

  const location = useLocation();

  const [activeButton, setActiveButton] = useState<string>(ROUTES.DASHBOARD);

  const handleButtonClick = (route: string) => {
    setActiveButton(route);
    localStorage.setItem("activeButton", route);
  };

  useEffect(() => {
    const savedActiveButton = localStorage.getItem("activeButton");
    if (savedActiveButton) {
      setActiveButton(savedActiveButton);
    }
  }, []);

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location.pathname]);

  return (
    <div
      className={`${width} flex flex-auto h-[calc(100vh-65px)] px-2 justify-center bg-white border-r`}
      data-testid="width_test"
    >
      <div className="flex flex-col flex-auto justify-between">
        <div className="flex flex-col my-1 justify-start">
          <div className="flex flex-col">
            <Link
              to={ROUTES.DASHBOARD}
              className="w-full"
              onClick={() => handleButtonClick(ROUTES.DASHBOARD)}
              data-testid="dashboard_link"
            >
              <div className="my-1 flex flex-grow justify-center">
                <Button
                  baseColor={
                    activeButton === ROUTES.DASHBOARD ? "teal" : "transparent"
                  }
                  image="Dashboard.svg"
                  text={expanded ? "Dashboard" : ""}
                  data-testid="dashboard_button"
                ></Button>
              </div>
            </Link>
            <Link
              to={ROUTES.ACTION_CENTER}
              className="w-full"
              onClick={() => handleButtonClick(ROUTES.ACTION_CENTER)}
              data-testid="action_center_link"
            >
              <div
                className="my-1 flex flex-auto"
                data-testid="action_center_button"
              >
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
              data-testid="agents_link"
            >
              <div className="my-1 flex flex-auto">
                <Button
                  baseColor={
                    activeButton === ROUTES.AGENTS ? "teal" : "transparent"
                  }
                  image="Agents.svg"
                  text={expanded ? "Agents" : ""}
                  data-testid="agents_button"
                ></Button>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-end my-4">
          <div className="my-1 flex flex-auto" data-testid="logout_buttonn">
            <Button
              baseColor="transparent"
              image="logout.svg"
              text={expanded ? "Log Out" : ""}
              onClick={handleLogout}
              data-testid="logout_button"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
