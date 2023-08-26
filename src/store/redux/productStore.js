import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    // {
    //   id: "1",
    //   title: "p1",
    //   price: "$21",
    // },
  ],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products = [];
      console.log("addd item data in slice ", action.payload.item);
      state.products.push(...action.payload.item);
    },
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
