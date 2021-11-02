import { createSlice } from "@reduxjs/toolkit";
import { getAttributes, getAttributeCounts } from "../data/";

const dataMapSlice = createSlice({
  name: "dataMap",
  initialState: {
    pixelAttributes: getAttributes(),
    pixelAttributeCounts: getAttributeCounts(),
    selectedPixel: 1,
  },
  reducers: {
    updateSelectedPixel(state, action) {
      state.selectedPixel = action.payload;
    },
  },
});

export const dataMapActions = dataMapSlice.actions;

export default dataMapSlice;
