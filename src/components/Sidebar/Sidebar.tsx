import React from "react";
import { Button } from "../Button";
//transparent history anda al revés. sale blanca transparente
//button gray hover más clarito
//hacer vairante menta claro para botones solo del sidebar
//agregar imagen de download, settings, logout
const Sidebar = () => {
  return (
    <div className="w-14 h-screen justify-center bg-teal-100 flex transition ease-in-out delay-150 duration-300">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col my-1 justify-start">
          <div className="mb-4 py-2 flex flex-auto justify-center bg-blue-200 hover:bg-blue-500">
            <Button baseColor="rose"></Button>
          </div>
          <div className=" flex flex-auto justify-center ">
            <Button baseColor="transparent" image="dashboard"></Button>
          </div>
          <div className="flex flex-col my-9">
            <div className="my-1 flex flex-auto">
              <Button baseColor="teal" image="dashboard"></Button>
            </div>
            <div className="my-1 flex flex-auto">
              <Button baseColor="transparent" image="actionCenter"></Button>
            </div>
            <div className="my-1 flex flex-auto">
              <Button baseColor="transparent" image="agents"></Button>
            </div>
            <div className="my-1 flex flex-auto">
              <Button baseColor="transparent" image="history"></Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end my-4">
          <div className="my-1 flex flex-auto">
            <Button baseColor="rose" image="history"></Button>
          </div>
          <div className="my-1  flex flex-auto">
            <Button baseColor="gray" image="dashboard"></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
