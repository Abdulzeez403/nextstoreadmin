import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./type";

//

// Signup thunk
export const register = createAsyncThunk<User, User>(
  "user/register",
  async (signupData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/register`,
        signupData
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching the current user
export const currentUser = createAsyncThunk<User>(
  "user/currentUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken"); // Use localStorage
      const response = await axios.get(
        `${process.env.NEXTAUTH_API_UR}/api/user/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch current user");
    }
  }
);

// Async thunk for updating user profile
export const updateProfile = createAsyncThunk<User, Partial<User>>(
  "user/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.put(
        `${process.env.NEXTAUTH_API_UR}/api/user/me`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        }
      );
      return response.data; // Adjust to match your API response structure
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
