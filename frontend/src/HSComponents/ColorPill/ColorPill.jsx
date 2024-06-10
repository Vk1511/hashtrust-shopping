import React from "react";

export const AVAIALABILITY_PILL_COLOR = {
  ORANAGE: "orange",
  GREEN: "green",
  RED: "red",
};

export default function ColorPill({
  text,
  color = AVAIALABILITY_PILL_COLOR.GREEN,
}) {
  return <div className={`availability-pill pill-${color}`}>{text}</div>;
}
