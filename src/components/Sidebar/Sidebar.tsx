import React from "react";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
/*


*/

interface SidebarProps {
  expanded?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ expanded = true }) => {
  const width = expanded ? "w-48" : "w-14";
  return (
    <div className={`${width} flex flex-auto px-2 justify-center bg-teal-100`} style={{height: "100vh"}}>
      <div className="flex flex-col flex-auto justify-between">
        <div className="flex flex-col my-1 justify-start">
          <div className="flex flex-col">
            <div className="my-1 flex flex-auto">
              < Link to= {ROUTES.DASHBOARD}>
                <Button
                  baseColor="teal"
                  image="dashboard"
                  text={expanded ? "Dashboard" : ""}
                ></Button>
              </Link>
            </div>
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
              baseColor="gray"
              image="history"
              text={expanded ? "Settings" : ""}
            ></Button>
          </div>
          <div className="my-1  flex flex-auto">
            <Button
              baseColor="rose"
              image="dashboard"
              text={expanded ? "Log Out" : ""}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
