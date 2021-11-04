import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: {
    statusMessage: "",
    statusType: "",
  },
  reducers: {
    changeStatus(state, actions) {
      state.statusMessage = actions.payload.statusMessage;
      state.statusType = actions.payload.statusType;
    },
  },
});

export const statusActions = statusSlice.actions;

export default statusSlice;
