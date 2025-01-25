import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "./type";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/products`; // Adjust based on your backend

// Fetch all products
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const response = await axios.get(API_URL);
  return response.data.products;
});

// Fetch a single product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (productId: string) => {
    const response = await axios.get(`${API_URL}/${productId}`);
    return response.data;
  }
);

// Create a new product
export const createProduct = createAsyncThunk(
  "products/create",
  async (productData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; // Return the newly created product data
    } catch (error) {
      return rejectWithValue(error); // Pass error to the slice
    }
  }
);

// Update an existing product
export const updateProduct = createAsyncThunk(
  "products/update",
  async (
    { productId, productData }: { productId: any; productData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`${API_URL}/${productId}`, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.product; // Return the updated product data
    } catch (error: any) {
      // Handle the error by passing a structured error message
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (productId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${productId}`);
      return productId; // Return the product ID of the deleted product
    } catch (error) {
      return rejectWithValue(error); // Pass error to the slice
    }
  }
);
