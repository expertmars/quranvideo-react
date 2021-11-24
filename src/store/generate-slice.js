import { createSlice } from "@reduxjs/toolkit";

const generateSlice = createSlice({
  name: "generate",
  initialState: {
    selectedPhotos: [],
    photoThumbnail: [],
  },
  reducers: {
    updatePhotoThumbnail(state, action) {
      const loadedPictures = action.payload;
      state.photoThumbnail = state.photoThumbnail.concat(loadedPictures);
    },
    addPhotoToList(state, action) {
      const newVideo = action.payload;

      state.selectedPhotos = state.selectedPhotos.concat(newVideo);
    },
    removePhotoFromList(state, action) {},
  },
});

export default generateSlice;

export const generateActions = generateSlice.actions;
