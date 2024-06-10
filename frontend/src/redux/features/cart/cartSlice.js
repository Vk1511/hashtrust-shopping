// src/features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../common/axiosInstance";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axiosInstance.get("user/cart/");
  return response.data;
});

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (payload, { dispatch }) => {
    const response = await axiosInstance.post("user/cart/", payload);
    await dispatch(fetchCart());
    return response.data;
  }
);

export const updatedCartProduct = createAsyncThunk(
  "cart/updatedCartProduct",
  async ({id, payload}, { dispatch }) => {
    console.log("ffffff",id, payload);
    const response = await axiosInstance.patch(`user/cart/${id}/`, payload);
    await dispatch(fetchCart());
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], cart_details: [], payment_summary: {} },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { cart_details, payment_summary } = action.payload;
        state.cart_details = cart_details;
        state.payment_summary = payment_summary;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updatedCartProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
      });
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
