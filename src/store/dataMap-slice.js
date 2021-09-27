import { createSlice } from "@reduxjs/toolkit";
import { imageColorData } from "../assets/imageColorData";

const initialState = () => {
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
    pixelData: initialState(),
  },
  reducers: {
    replacePixelData(state, action) {
      state.pixelData = action.payload.pixelData;
    },
  },
});

export const dataMapActions = dataMapSlice.actions;

export default dataMapSlice;
