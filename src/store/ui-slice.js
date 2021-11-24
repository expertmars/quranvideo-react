import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    fileChooseIsVisible: false,
  },
  reducers: {
    showFileChoose(state, action) {
      state.fileChooseIsVisible = true;
    },
    hideFileChoose(state, action) {
      state.fileChooseIsVisible = false;
    },
  },
});

export default uiSlice;

export const uiActions = uiSlice.actions;
