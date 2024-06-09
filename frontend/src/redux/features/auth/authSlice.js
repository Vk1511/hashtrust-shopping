// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../common/axiosInstance";

export const fetchUserProfile = createAsyncThunk("auth/fetchUserProfile", async () => {
    const response = await axiosInstance.get("auth/user/");
    return response?.data;
  });

export const login = createAsyncThunk("auth/login", async (credentials, { dispatch }) => {
  const response = await axiosInstance.post("auth/user/login", credentials);
  const data = response?.data;
  const { access, refresh } = data;
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);

  // Fetch user profile after successful login
  await dispatch(fetchUserProfile());
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, status: "idle", error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
