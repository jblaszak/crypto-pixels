import { createSlice } from "@reduxjs/toolkit";

const dataMapSlice = createSlice({
  name: "dataMap",
  initialState: {
    pixels: [],
    lastUpdated: null,
  },
  reducers: {
    replaceColorData(state, action) {
      state.pixels = action.payload.pixels;
    },
    replaceDataMap(state, action) {
      state.pixels = action.payload.pixels;
      state.lastUpdated = action.payload.lastUpdated;
    },
    replaceDataMapSingle(state, action) {
      state.pixels = action.payload.pixels;
    },
  },
});

export const dataMapActions = dataMapSlice.actions;

export default dataMapSlice;
