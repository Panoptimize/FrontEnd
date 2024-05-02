import React from "react";
import { IButton } from "./types";
import "./Button.css";

const Button: React.FC<IButton> = ({ text, bold, baseColor, image }) => {
  const isSvg = image?.endsWith('.svg');

  return (
    <>
      <button
        className={`btn-${baseColor}${bold ? "-bold" : ""} ${text ? "pr-4" : ""} ${image && text ? "pl-1" : ""} ${!image ? "pl-4 py-2" : ""}`}
      >
        {image && (
          <img
            src={require(`../../assets/images/${image}${isSvg ? '' : '.png'}`)}
            alt={image}
            style={baseColor === "transparent" && !isSvg ? { filter: "invert(100%)" } : {}}
          ></img>
        )}
        {text}
      </button>
    </>
  );
};

export default Button;