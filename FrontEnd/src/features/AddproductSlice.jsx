// store/productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    productSubmitStart(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    productSubmitSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    productSubmitFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { productSubmitStart, productSubmitSuccess, productSubmitFailure } = productSlice.actions;

export const submitProduct = (productData, images) => async (dispatch) => {
  dispatch(productSubmitStart());

  try {
    // Set up form data for the request
    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("productDescription", productData.productDescription);
    formData.append("price", productData.price);
    formData.append("userId", productData.userId);

    images.forEach((image, index) => {
      formData.append("images", image); // Send multiple files under the same key
    });

    const response = await axios.post("http://localhost:5000/add-product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch(productSubmitSuccess());
    alert("Product submitted successfully!");
  } catch (error) {
    dispatch(productSubmitFailure(error.message));
  }
};

export default productSlice.reducer;
