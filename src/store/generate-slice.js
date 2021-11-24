import { createSlice } from "@reduxjs/toolkit";

const generateSlice = createSlice({
  name: "generate",
  initialState: {
    selectedPhoto: [],
    selectedVideo: [],

    photoThumbnail: [],
    generatedVideos: [],
  },
  reducers: {
    // Photo
    updatePhotoThumbnail(state, action) {
      const loadedPictures = action.payload;
      state.photoThumbnail = state.photoThumbnail.concat(loadedPictures);
    },
    addPhotoToList(state, action) {
      const targetPhoto = action.payload;
      state.selectedPhoto = state.selectedPhoto.concat(targetPhoto);
    },
    removePhotoFromList(state, action) {},

    // Video
    updateGeneratedVideos(state, action) {
      const loadedVideos = action.payload;
      state.generatedVideos = state.generatedVideos.concat(loadedVideos);
    },
    addVideoToList(state, action) {
      const targetVideo = action.payload;
      state.selectedVideo = state.selectedVideo.concat(targetVideo);
    },
  },
});

export default generateSlice;

export const generateActions = generateSlice.actions;
