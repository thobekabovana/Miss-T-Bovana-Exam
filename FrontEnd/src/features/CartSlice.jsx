// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Define the async thunk for fetching the cart by user ID
// export const fetchCartById = createAsyncThunk(
//   'cart/fetchCartById',
//   async (userId) => {
//     const response = await axios.get(`/api/cart/${userId}`); // Adjust URL to your API
//     return response.data; // Assuming the API returns the cart data
//   }
// );

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     loading: false,
//     cart: [],
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCartById.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCartById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.cart = action.payload; // Populate cart with fetched data
//       })
//       .addCase(fetchCartById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message; // Handle error
//       });
//   },
// });

// export { fetchCartById };
// export default cartSlice.reducer;
