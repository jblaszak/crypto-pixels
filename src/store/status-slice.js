import { createSlice } from "@reduxjs/toolkit";

const checkPrivacy = () => {
  if (localStorage.getItem("privacy")) return true;
  return false;
};

const statusSlice = createSlice({
  name: "status",
  initialState: {
    statusMessage: "",
    statusType: "",
    isPrivacyChecked: checkPrivacy(),
  },
  reducers: {
    changeStatus(state, actions) {
      state.statusMessage = actions.payload.statusMessage;
      state.statusType = actions.payload.statusType;
    },
    changePrivacyStatus(state, actions) {
      localStorage.setItem("privacy", true);
      state.isPrivacyChecked = actions.payload;
    },
  },
});

export const statusActions = statusSlice.actions;

export default statusSlice;
