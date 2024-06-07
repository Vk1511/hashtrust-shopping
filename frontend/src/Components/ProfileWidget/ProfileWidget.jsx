import React from "react";
import "./ProfileWidget.css";

export default function ProfileWidget() {
  return (
    <div className="profile-widget-container">
      <div className="widget">
        <img
          src="./Assets/wishlist.png"
          className="widget-icon"
          alt="wishlist"
        />
        <span className="wishlist-count">4</span>
      </div>
      <div className="widget">
        <img
          src="./Assets/avatar.png"
          className="widget-icon-avatar"
          alt="profile"
        />
      </div>
      <div className="widget">
        <img src="./Assets/cart.png" className="widget-icon" alt="cart" />
        <span className="wishlist-count cart-count">4</span>
      </div>
    </div>
  );
}
