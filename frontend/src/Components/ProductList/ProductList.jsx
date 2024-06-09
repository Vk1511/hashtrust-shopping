import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../../HSComponents";
import { fetchProducts } from "../../redux/features/products/productsSlice";
import "./ProductList.css";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  useEffect(() => {
    dispatch(fetchProducts(""));
  }, [dispatch]);

  return (
    <div className="product-list-container">
      {products?.map((product) => {
        return <ProductCard key={product?.id} product={product} />;
      })}
    </div>
  );
}
