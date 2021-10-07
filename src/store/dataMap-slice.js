import { createSlice } from "@reduxjs/toolkit";
import { getAttributes, getAttributeCounts, getPixelStats } from "../data/";

const dataMapSlice = createSlice({
  name: "dataMap",
  initialState: {
    pixelAttributes: getAttributes(),
    pixelAttributeCounts: getAttributeCounts(),
    pixelStats: getPixelStats(),
    pixelStatsVersion: 0,
    selectedPixel: 1,
  },
  reducers: {
    updatePixelStats(state, action) {
      state.pixelStats = action.payload.pixelStats;
      state.pixelStatsVersion = action.payload.pixelStatsVersion;
    },
    updateSelectedPixel(state, action) {
      state.selectedPixel = action.payload;
    },
  },
});

export const dataMapActions = dataMapSlice.actions;

export default dataMapSlice;
