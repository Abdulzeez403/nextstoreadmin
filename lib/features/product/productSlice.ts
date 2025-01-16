// src/redux/products/productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchProductById, fetchProducts } from "./productThunk";
import { IProduct } from "./type";

interface ProductState {
  items: [];
  product: IProduct | null;
  error: string | null;
  loading: boolean;
}

const initialState: ProductState = {
  items: [],
  product: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || "Failed to fetch";
      });
  },
});

export default productSlice.reducer;
