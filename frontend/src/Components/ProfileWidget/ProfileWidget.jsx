import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import "./ProfileWidget.css";

export default function ProfileWidget() {
  const navigate = useNavigate();
  const cartDetails = useSelector((state) => state.cart.cart_details);

  return (
    <div className="profile-widget-container">
      <div className="widget">
        <img
          src="./Assets/wishlist.png"
          className="widget-icon"
          alt="wishlist"
        />
        <span className="wishlist-count">0</span>
      </div>
      <div className="widget">
        <img
          src="./Assets/avatar.png"
          className="widget-icon-avatar"
          alt="profile"
        />
      </div>
      <div className="widget" onClick={() => navigate('/check-out')}>
        <img src="./Assets/cart.png" className="widget-icon" alt="cart" />
        <span className="wishlist-count cart-count">{cartDetails.length}</span>
      </div>
    </div>
  );
}
