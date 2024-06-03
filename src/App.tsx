import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./routes/router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="bg-[#F8F8F8]">
      <ToastContainer />
      <RouterProvider router={AppRouter()} />
    </div>
  );
}

export default App;

