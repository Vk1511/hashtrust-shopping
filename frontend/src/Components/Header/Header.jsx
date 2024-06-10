import React from "react";
import {SearchBar} from "../../HSComponents";
import { useNavigate } from "react-router-dom";
import ProfileWidget from "../ProfileWidget/ProfileWidget";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <div className="site-logo" onClick={() => navigate("/")}>GROCERIES</div>
      <SearchBar />
      <ProfileWidget />
    </div>
  );
}
