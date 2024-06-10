import React from "react";
import ColorPill, { AVAIALABILITY_PILL_COLOR } from "../ColorPill/ColorPill";
import {
  updatedCartProduct,
  addProductToCart,
} from "../../redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./OrderCard.css";

export default function OrderCard({ product }) {
  const { image, name, price, quantity, id } = product?.product_details;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = !!localStorage.getItem("accessToken");
  const auth = useSelector((state) => state.auth);

  const updateProductQty = () => {
    if (token && auth) {
      dispatch(
        updatedCartProduct({
          id: product.id,
          payload: {
            quantity: product?.quantity + 1,
            product: id,
          },
        })
      );
      console.log("lllll");
    } else {
      alert("Please login.");
      navigate("/login");
    }
  };

  return (
    <div className="order-card-container">
      <div className="order-card-product-img">
        <div>
          <img src={image} alt="img" className="order-card-img" />
        </div>
        <div className="order-card-p-name">
          <div className="order-card-p-title">{name}</div>
          <div className="order-card-p-code">code</div>
        </div>
      </div>
      <div className="order-card-product-qty">
        <div className="order-card-action-icon">
          <div>
            <img
              src="/Assets/Plus.png"
              alt="add"
              className="order-card-action"
              onClick={updateProductQty}
            />
          </div>
          <div>{product?.quantity}</div>
          <div>
            <img
              src="/Assets/Minus.png"
              alt="add"
              className="order-card-action"
            />
          </div>
        </div>
        <div>
          {quantity == 0 ? (
            <ColorPill
              text="Out of Stock"
              color={AVAIALABILITY_PILL_COLOR.RED}
            />
          ) : quantity <= 5 ? (
            <ColorPill
              text={`only ${quantity} left`}
              color={AVAIALABILITY_PILL_COLOR.ORANAGE}
            />
          ) : (
            <ColorPill
              text="Available"
              color={AVAIALABILITY_PILL_COLOR.GREEN}
            />
          )}
        </div>
      </div>
      <div className="order-card-price">
        <div className="order-card-price">{price} INR</div>
        <div>
          <img
            src="/Assets/remove.png"
            alt="add"
            className="order-card-action"
          />
        </div>
      </div>
    </div>
  );
}
