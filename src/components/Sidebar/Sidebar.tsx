import React from "react";
import { Button } from "../Button";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import myLogo from "../../assets/images/Panoptimize.png";
import { useAppContext } from "../../store/app-context/app-context";
/*


*/

interface SidebarProps {
  expanded?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ expanded = true }) => {
  const navigate = useNavigate();
  const { logOut } = useAppContext();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate(ROUTES.AUTH);
    } catch (e) {
      console.log("Logout error");
    }
  };
  const width = expanded ? "w-48" : "w-14";
  return (
    <div
      className={`${width} flex flex-auto px-2 justify-center bg-[#FFFFFF] border-r`}
      style={{ height: "100vh" }}
    >
      <div className="flex flex-col flex-auto justify-between">
        <div className="flex flex-col my-1 justify-start">
          <div className="flex flex-col">
            <div className="my-1 flex flex-auto justify-start">
              <img
                src={myLogo}
                alt="logo"
                className="w-full px-2 pt-6 pb-12"
              ></img>
            </div>

            <Link to={ROUTES.DASHBOARD} className="w-full">
              <div className="my-1 flex flex-grow justify-center">
                <Button
                  baseColor="teal"
                  image="dashboard"
                  text={expanded ? "Dashboard" : ""}
                ></Button>
              </div>
            </Link>
            <div className="my-1 flex flex-auto">
              <Button
                baseColor="transparent"
                image="actionCenter"
                text={expanded ? "Action Center" : ""}
              ></Button>
            </div>
            <div className="my-1 flex flex-auto">
              <Button
                baseColor="transparent"
                image="agents"
                text={expanded ? "Agents" : ""}
              ></Button>
            </div>
            <div className="my-1 flex flex-auto">
              <Button
                baseColor="transparent"
                image="history"
                text={expanded ? "History" : ""}
              ></Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end my-4">
          <div className="my-1 flex flex-auto">
            <Button
              baseColor="transparent"
              text={expanded ? "Settings" : ""}
              image="gear.svg"
            ></Button>
          </div>
          <div className="my-1  flex flex-auto">
            <Button
              baseColor="transparent"
              image="logout.svg"
              text={expanded ? "Log Out" : ""}
              onClick={handleLogout}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
