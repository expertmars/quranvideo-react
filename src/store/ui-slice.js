import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    fileChooseIsVisible: false,

    chooseVideoIsVisible: false,
    choosePhotoIsVisible: false,
    chooseFileIsVisible: false,

    progressModalIsVisible: false,
  },
  reducers: {
    // GenerateForm.js - UI Actions
    showFileChoose(state, action) {
      state.fileChooseIsVisible = true;
      state.chooseVideoIsVisible = true;
    },
    hideFileChoose(state, action) {
      state.fileChooseIsVisible = false;
    },

    // ChooseVideoCard.js - UI Actions
    showChooseVideo(state, action) {
      state.chooseVideoIsVisible = true;
    },
    hideChooseVideo(state, action) {
      state.chooseVideoIsVisible = false;
    },
    showChoosePhoto(state, action) {
      state.choosePhotoIsVisible = true;
    },
    hideChoosePhoto(state, action) {
      state.choosePhotoIsVisible = false;
    },
    showChooseFile(state, action) {
      state.chooseFileIsVisible = true;
    },
    hideChooseFile(state, action) {
      state.chooseFileIsVisible = false;
    },

    // ProgressModal.js
    showProgressModal(state, action) {
      state.progressModalIsVisible = true;
    },
    hideProgressModal(state, action) {
      state.progressModalIsVisible = false;
    },
  },
});

export default uiSlice;

export const uiActions = uiSlice.actions;
