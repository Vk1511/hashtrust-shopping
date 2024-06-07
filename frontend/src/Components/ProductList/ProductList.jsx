import React from "react";
import { ProductCard } from "../../HSComponents";
import "./ProductList.css";

export default function ProductList() {
  return (
    <div className="product-list-container">
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}
