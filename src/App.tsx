import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Router } from "./routes/router";
import { FeedbackCard } from "./components/FeedbackCard";

function App() {
  return (
    <div className="bg-[#F8F8F8]">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
