import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = {
  fileChooseIsVisible: false,

  chooseVideoIsVisible: false,
  choosePhotoIsVisible: false,
  chooseFileIsVisible: false,

  progressModalIsVisible: false,
  ayahEditorIsVisible: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: uiInitialState,
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

    // AyahEditorModal.js
    showAyahEditorModal(state, action) {
      state.ayahEditorIsVisible = true;
    },

    hideAyahEditorModal(state, action) {
      state.ayahEditorIsVisible = false;
    },
  },
});

export default uiSlice;

export const uiActions = uiSlice.actions;
