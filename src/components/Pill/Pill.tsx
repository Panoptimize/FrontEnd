import React from "react";
import { IPill } from "./types";
import "./Pill.css";

const Pill: React.FC<IPill> = ({ title, icon }) => {
  const isIcon = icon?.endsWith(".svg");
  if (icon && !isIcon) {
    // console.error("simple pill");
    return null;
  }

  return (
    <div className="flex flex-auto">
      <div className={`pill ${!icon ? "" : ""}`}>
        <div className="title">{title}</div>
        {icon && (
          <button>
            <img
              className="img"
              src={require(`../../assets/images/${icon}`)}
              alt={icon}
              datatest-id="img-pill"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Pill;