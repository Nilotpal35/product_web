import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productStore";

const store = configureStore({
  reducer: {
    product: productReducer,
  },
}); 

export default store;
