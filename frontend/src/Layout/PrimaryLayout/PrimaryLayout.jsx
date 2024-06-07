import React from "react";
import { Outlet } from 'react-router-dom';
import { Header } from "../../Components";
import "./PrimaryLayout.css";

export default function PrimaryLayout() {
  return (
    <div className="layout-container">
      <div className="layout-component-container">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
