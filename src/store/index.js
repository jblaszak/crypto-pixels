import { configureStore } from "@reduxjs/toolkit";
import dataMapSlice from "./dataMap-slice";
import errorSlice from "./error-slice";
import mintSlice from "./mint-slice";

const store = configureStore({
  reducer: {
    dataMap: dataMapSlice.reducer,
    error: errorSlice.reducer,
    mint: mintSlice.reducer,
  },
});

export default store;
