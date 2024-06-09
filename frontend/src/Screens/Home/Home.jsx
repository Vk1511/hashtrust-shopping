import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filters, ProductList } from "../../Components";
import { fetchUserProfile } from "../../redux/features/auth/authSlice";
import { fetchCart } from "../../redux/features/cart/cartSlice";
import { Typo } from "../../HSComponents";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = !!localStorage.getItem("accessToken");
    // Fetch user profile on page refresh
    if (token) {
      dispatch(fetchUserProfile());
      dispatch(fetchCart())
    }
  }, []);

  return (
    <div>
      <Filters />
      <Typo text="Trending Items" />
      <ProductList />
    </div>
  );
}
