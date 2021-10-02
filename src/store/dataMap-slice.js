import { createSlice } from "@reduxjs/toolkit";
import { imageColorData } from "../data-loading/imageColorData";

const initialPixelData = () => {
  return imageColorData.map((color) => ({
    color: "#000000",
    lastPrice: "No data",
    priceUnit: "ETH",
    timesSold: "No data",
    ownerUsername: "No data",
    ownerAddress: "No data",
  }));
};

const dataMapSlice = createSlice({
  name: "dataMap",
  initialState: {
    pixelData: initialPixelData(),
    selectedPixel: 0,
  },
  reducers: {
    replacePixelData(state, action) {
      state.pixelData = action.payload.pixelData;
    },
    updateSelectedPixel(state, action) {
      state.selectedPixel = action.payload;
    },
  },
});

export const dataMapActions = dataMapSlice.actions;

export default dataMapSlice;
