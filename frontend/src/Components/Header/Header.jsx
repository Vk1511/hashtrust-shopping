import React from "react";
import {SearchBar} from "../../HSComponents";
import ProfileWidget from "../ProfileWidget/ProfileWidget";
import "./Header.css";

export default function Header() {
  return (
    <div className="header-container">
      <div className="site-logo">GROCERIES</div>
      <SearchBar />
      <ProfileWidget />
    </div>
  );
}
