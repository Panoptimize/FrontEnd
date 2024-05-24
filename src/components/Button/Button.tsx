import React from "react";
import { IButton } from "./types";
import "./Button.css";

const Button: React.FC<IButton> = ({
  text,
  bold,
  baseColor,
  image,
  onClick,
  type = "button",
}) => {
  // Using only SVG files for icons
  const isSvg = image?.endsWith(".svg");
  if (!isSvg) {
    console.error("Only SVG files are supported for the image prop.");
    return null;
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className={`btn-${baseColor}${bold ? "-bold" : ""} ${text ? "pr-4" : ""} ${image && text ? "pl-0" : ""} ${!image ? "pl-4 py-2" : ""}`}
    >
      <div
        className={`flex items-center ${baseColor !== "transparent" ? "text-white" : "text-black"}`}
      >
        {image && (
          <img
            src={require(`../../assets/images/${image}`)}
            alt={image}
            style={
              baseColor === "transparent" && !isSvg
                ? { filter: "invert(100%)" }
                : {}
            }
          ></img>
        )}
        {text}
      </div>
    </button>
  );
};

export default Button;
