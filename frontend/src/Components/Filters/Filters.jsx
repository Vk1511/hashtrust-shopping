import React from "react";
import { Pill } from "../../HSComponents";
import "./Filters.css";

export default function Filters() {
  return (
    <div className="filter-conatiner">
      <Pill pillText="All iteam" selected={true}/>
      <Pill pillText="All iteam" />
      <Pill pillText="All iteam" />
      <Pill pillText="All iteam" />
    </div>
  );
}
