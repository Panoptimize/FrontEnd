import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./routes/router";

function App() {
  return (
    <div className="bg-[#F8F8F8]">
      <RouterProvider router={AppRouter()} />
    </div>
  );
}

export default App;
