import { configureStore } from "@reduxjs/toolkit";
import dataMapSlice from "./dataMap-slice";
import statusSlice from "./status-slice";
import mintSlice from "./mint-slice";

const store = configureStore({
  reducer: {
    dataMap: dataMapSlice.reducer,
    status: statusSlice.reducer,
    mint: mintSlice.reducer,
  },
});

export default store;
