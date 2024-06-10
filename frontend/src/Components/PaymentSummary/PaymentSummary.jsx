import React from "react";
import "./PaymentSummary.css";

export default function PaymentSummary({ payment_summary }) {
  const { total_amount, total_discount, final_amount } = payment_summary;
  return (
    <div className="payment-summary-container">
      <div className="payment-section">
        <div className="payment-summary-section">
          <div className="payment-summary-title">Subtotal</div>
          <div>{total_amount} INR</div>
        </div>
        <div className="payment-summary-section">
          <div className="payment-summary-title">Discount</div>
          <div>{total_discount} INR</div>
        </div>
        <div className="payment-summary-section">
          <div className="payment-summary-title">Total</div>
          <div>{final_amount} INR</div>
        </div>
        <div className="payment-btn-con">
          <button className="payment-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
}
