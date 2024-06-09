import React from "react";
import "./Pill.css";

export default function Pill({ pillText, handleOnClick, selected = false }) {
  return (
    <div
      className={`pill-con ${selected ? "selected-pill" : ""}`}
      onClick={handleOnClick}
    >
      {pillText}
    </div>
  );
}
