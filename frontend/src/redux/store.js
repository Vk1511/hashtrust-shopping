// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import productsReducer from './features/products/productsSlice';
import cartReducer from './features/cart/cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
  },
  devTools: true
});

export default store;
