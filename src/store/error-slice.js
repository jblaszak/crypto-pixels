import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
  name: "error",
  initialState: {
    errorMessage: "",
  },
  reducers: {
    changeErrorMessage(state, actions) {
      state.errorMessage = actions.payload.errorMessage;
    },
  },
});

export const errorActions = errorSlice.actions;

export default errorSlice;
