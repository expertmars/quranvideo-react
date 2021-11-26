import { createSlice } from "@reduxjs/toolkit";

const generateSlice = createSlice({
  name: "generate",
  initialState: {
    selectedPhoto: [],
    selectedVideo: [],

    photoThumbnail: [],
    generatedVideos: [],

    videoPage: 1,
    videoQuery: "nature",
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

    updateVideoPage(state, action) {
      state.videoPage++;
    },

    updateVideoQuery(state, action) {
      const searchQuery = action.payload;
      state.videoQuery = searchQuery;
      console.log(searchQuery);
      state.generatedVideos = [];
      state.videoPage = 1;
    },

    // Misc
    clearAll(state, action) {
      state.videoPage = 1;
      state.videoQuery = "nature";
      state.generatedVideos = [];
    },
  },
});

export default generateSlice;

export const generateActions = generateSlice.actions;
