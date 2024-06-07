import React from "react";
// import WishlistInActive from "../../Assets/wishlist-inactive.png";
// import Wishlist from "../../Assets/wishlist.png";
import "./ProductCard.css";

const AVAIALABILITY_PILL_COLOR = {
  ORANAGE: "orange",
  GREEN: "green",
};

const AvailabilityPill = ({ text, color = AVAIALABILITY_PILL_COLOR.GREEN }) => {
  return <div className={`availability-pill pill-${color}`}>{text}</div>;
};

export default function ProductCard() {
  return (
    <div className="product-card-container">
      <div>
        <img
          src="http://127.0.0.1:8000/media/product_images/image_2.jpg"
          alt="product-img"
          className="product-img"
        />
      </div>
      <div className="product-content">
        <div>
          <div className="product-title">Seedless Grapes</div>
          <div className="product-description">
            Yummy brand seedless grapes 900g test yeysys skjsnk
          </div>
        </div>

        <div className="product-availability">
          <div>
            <AvailabilityPill
              text="Avialable"
              color={AVAIALABILITY_PILL_COLOR.GREEN}
            />
          </div>
          <div className="product-actions">
            <div className="product-amt">INR 10</div>
            <div className="product-action-icon">
              <img
                src="/Assets/buy-button.png"
                alt="buy"
                className="product-icon"
              />
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
