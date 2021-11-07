import { createSlice } from "@reduxjs/toolkit";

const mintSlice = createSlice({
  name: "mint",
  initialState: {
    mintCount: 0,
    mintFee: 0,
    provider: null,
    contract: null,
  },
  reducers: {
    updateMintInfo(state, actions) {
      state.mintCount = actions.payload.mintCount;
      state.mintFee = actions.payload.mintFee;
    },
  },
});

export const mintActions = mintSlice.actions;

export default mintSlice;
