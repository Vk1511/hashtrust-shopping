// src/features/products/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../common/axiosInstance";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (category) => {
    const response = await axiosInstance.get(`products/${category}`);
    return response.data;
  }
);

export const fetchProductCategory = createAsyncThunk(
  "products/fetchProductCategory",
  async () => {
    const response = await axiosInstance.get("products/categories-info");
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    productCategory: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductCategory.fulfilled, (state, action) => {
        state.productCategory = action.payload;
      });
  },
});

export default productsSlice.reducer;
