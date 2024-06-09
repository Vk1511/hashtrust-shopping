import React from "react";
// import WishlistInActive from "../../Assets/wishlist-inactive.png";
// import Wishlist from "../../Assets/wishlist.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/features/cart/cartSlice";
import "./ProductCard.css";

const AVAIALABILITY_PILL_COLOR = {
  ORANAGE: "orange",
  GREEN: "green",
  RED: "red",
};

const AvailabilityPill = ({ text, color = AVAIALABILITY_PILL_COLOR.GREEN }) => {
  return <div className={`availability-pill pill-${color}`}>{text}</div>;
};

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const { image, name, description, price, quantity, id } = product;
  const token = !!localStorage.getItem("accessToken");

  const auth = useSelector((state) => state.auth);
  const cartDetails = useSelector((state) => state.cart.cart_details);

  const navigate = useNavigate();

  // This is Patch work, need to handle from backend
  const isProductAvailable = (data, productId) =>
    data.some((item) => item.product_details.id === productId);

  const buyProduct = () => {
    if (token && auth) {
      dispatch(
        addProductToCart({
          product: id,
          quantity: 1,
        })
      );
    } else {
      alert("Please login.");
      navigate("/login");
    }
  };

  return (
    <div className="product-card-container">
      <div>
        <img src={image} alt="product-img" className="product-img" />
      </div>
      <div className="product-content">
        <div>
          <div className="product-title">{name}</div>
          <div className="product-description">{description}</div>
        </div>

        <div className="product-availability">
          <div>
            {quantity == 0 ? (
              <AvailabilityPill
                text="Out of Stock"
                color={AVAIALABILITY_PILL_COLOR.RED}
              />
            ) : quantity <= 5 ? (
              <AvailabilityPill
                text={`Only ${quantity} left.`}
                color={AVAIALABILITY_PILL_COLOR.ORANAGE}
              />
            ) : (
              <AvailabilityPill
                text="Avialable"
                color={AVAIALABILITY_PILL_COLOR.GREEN}
              />
            )}
          </div>
          <div className="product-actions">
            <div className="product-amt">INR {price}</div>

            <div className="product-action-icon">
              {!isProductAvailable(cartDetails, id) ? (
                <img
                  src="/Assets/buy-button.png"
                  alt="buy"
                  className="product-icon"
                  onClick={buyProduct}
                />
              ) : (
                <span>Added</span>
              )}

              <img
                src="/Assets/wishlist.png"
                // onMouseOver={
                //   (this.src = require(WishlistInActive))
                // }
                // onMouseOut={(this.src = require(Wishlist))}
                alt="wishlist"
                className="product-icon"
              />
              {/* <img
                src="/Assets/wishlist-inactive.png"
                alt="wishlist"
                className="product-icon"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
