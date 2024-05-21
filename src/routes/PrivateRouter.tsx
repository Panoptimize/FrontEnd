import React from "react";
import { Outlet } from "react-router-dom";

const PrivateRouter: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRouter;
