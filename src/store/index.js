import { configureStore } from "@reduxjs/toolkit";
import dataMapSlice from "./dataMap-slice";
import errorSlice from "./error-slice.";

const store = configureStore({
  reducer: { dataMap: dataMapSlice.reducer, error: errorSlice.reducer },
});

export default store;
