import React from 'react';
import './ProductCard.css'; // Import the CSS file for styling

const Card = () => {
  return (
    <div className="card">
      <div className="image-container">
        <img src="http://127.0.0.1:8000/media/product_images/image_2.jpg" alt="Seedless Grapes" className="product-image" />
      </div>
      <div className="product-details">
        <h3 className="product-title">Seedless Grapes</h3>
        <p className="product-description">Yummy brand seedless grapes 900g</p>
        <div className="availability">
          <span className="availability-badge">Available</span>
        </div>
        <div className="product-footer">
          <span className="price">£3.75</span>
          <div className="actions">
            <button className="cart-button">&#128722;</button>
            <button className="wishlist-button">&#10084;</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
