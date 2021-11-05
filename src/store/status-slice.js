import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: {
    statusMessage: "",
    statusType: "",
    isPrivacyChecked: false,
  },
  reducers: {
    changeStatus(state, actions) {
      state.statusMessage = actions.payload.statusMessage;
      state.statusType = actions.payload.statusType;
    },
    changePrivacyStatus(state, actions) {
      state.isPrivacyChecked = actions.payload;
    },
  },
});

export const statusActions = statusSlice.actions;

export default statusSlice;
