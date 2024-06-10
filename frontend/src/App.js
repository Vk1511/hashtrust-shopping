import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PrimaryLayout from "./Layout/PrimaryLayout/PrimaryLayout";
import PrivateRoute from "./Routes/PrivateRoutes";
import { Home, Checkout, Authentication } from "./Screens";
import { fetchUserProfile } from "./redux/features/auth/authSlice";
import { fetchCart } from "./redux/features/cart/cartSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = !!localStorage.getItem("accessToken");
    // Fetch user profile on page refresh
    if (token) {
      dispatch(fetchUserProfile());
      dispatch(fetchCart());
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PrivateRoute>
              <Authentication />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<PrimaryLayout />}>
          <Route index element={<Home />} />
          <Route
            path="check-out"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
    // <PrimaryLayout>
    //   <Home />
    // </PrimaryLayout>
  );
}

export default App;
