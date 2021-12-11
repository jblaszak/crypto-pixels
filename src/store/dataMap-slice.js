import { createSlice } from "@reduxjs/toolkit";
import * as CONSTANTS from "../constants";

const initAttributes = () => {
  let attributes = {};
  for (let i = 1; i <= CONSTANTS.COLLECTION_SIZE; i++) {
    attributes[i] = {
      r: 0,
      g: 0,
      b: 0,
    };
  }
  return attributes;
};

const dataMapSlice = createSlice({
  name: "dataMap",
  initialState: {
    pixelAttributes: initAttributes(),
    pixelAttributeCounts: {},
    selectedPixel: -1,
  },
  reducers: {
    updateSelectedPixel(state, action) {
      state.selectedPixel = action.payload;
    },
    updateAttributes(state, action) {
      state.pixelAttributes = action.payload.pixelAttributes;
      state.pixelAttributeCounts = action.payload.pixelAttributeCounts;
    },
  },
});

export const dataMapActions = dataMapSlice.actions;

export default dataMapSlice;
