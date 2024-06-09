import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductCategory,
  fetchProducts,
} from "../../redux/features/products/productsSlice";
import { Pill } from "../../HSComponents";
import "./Filters.css";

export default function Filters() {
  const dispatch = useDispatch();
  const productCategory = useSelector(
    (state) => state.products.productCategory
  );

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleFilterChange = (categoryId) => {
    if (categoryId != selectedCategory) {
      setSelectedCategory(categoryId);
      if (categoryId) {
        dispatch(fetchProducts(`?category=${categoryId}`));
      } else {
        dispatch(fetchProducts(``));
      }
    }
  };

  useEffect(() => {
    dispatch(fetchProductCategory());
  }, [dispatch]);

  return (
    <div className="filter-conatiner">
      <Pill
        pillText={`All Items (${productCategory.total})`}
        selected={selectedCategory == null ? true : false}
        handleOnClick={() => handleFilterChange(null)}
      />
      {productCategory?.category?.map((category) => {
        return (
          <Pill
            key={category.id}
            pillText={`${category.name} (${category.count})`}
            handleOnClick={() => handleFilterChange(category.id)}
            selected={selectedCategory == category.id ? true : false}
          />
        );
      })}
    </div>
  );
}
