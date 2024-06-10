import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderCard, Typo } from "../../HSComponents";
import { PaymentSummary } from "../../Components";
import "./Checkout.css";

export default function Checkout() {
  const dispatch = useDispatch();
  const cart_details = useSelector((state) => state.cart.cart_details);
  const payment_summary = useSelector((state) => state.cart.payment_summary);

  return (
    <div>
      <Typo text="Checkout" />
      <div className="cart-cards">
        {cart_details?.map((product) => {
          return <OrderCard key={product.id} product={product} />;
        })}
      </div>

      <PaymentSummary payment_summary={payment_summary}/>
    </div>
  );
}
