import { createSlice } from "@reduxjs/toolkit";

const mintSlice = createSlice({
  name: "mint",
  initialState: {
    mintCount: 0,
    mintFee: 0,
  },
  reducers: {
    updateMintCount(state, actions) {
      state.mintCount = actions.payload.mintCount;
    },
    updateMintFee(state, actions) {
      state.mintFee = actions.payload.mintFee;
    },
  },
});

export const mintActions = mintSlice.actions;

export default mintSlice;
