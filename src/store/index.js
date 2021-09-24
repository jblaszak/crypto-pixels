import { configureStore } from "@reduxjs/toolkit";
import dataMapSlice from "./dataMap-slice";
import errorSlice from "./error-slice.js";

const store = configureStore({
  reducer: { dataMap: dataMapSlice.reducer, error: errorSlice.reducer },
});

export default store;
