import { createSlice } from "@reduxjs/toolkit";

const generateSlice = createSlice({
  name: "generate",
  initialState: {
    selectedPhoto: [],
    selectedVideo: [],

    generatedImages: [],
    generatedVideos: [],

    totalDuration: 0,

    videoPage: 1,
    videoQuery: "nature",

    imagePage: 1,
    imageQuery: "nature",
  },
  reducers: {
    // Photo
    updateGeneratedImages(state, action) {
      const loadedImages = action.payload;
      state.generatedImages = state.generatedImages.concat(loadedImages);
    },

    addPhotoToList(state, action) {
      const targetPhoto = action.payload;
      state.selectedPhoto = state.selectedPhoto.concat(targetPhoto);
    },

    removePhotoFromList(state, action) {},
    updateImagePage(state, action) {
      state.imagePage++;
    },

    updateImageQuery(state, action) {
      const searchQuery = action.payload;
      state.imageQuery = searchQuery;
      console.log(searchQuery);
      state.generatedImages = [];
      state.imagePage = 1;
    },

    // Video
    updateGeneratedVideos(state, action) {
      const loadedVideos = action.payload;
      state.generatedVideos = state.generatedVideos.concat(loadedVideos);
    },
    addVideoToList(state, action) {
      const targetVideo = action.payload;
      state.totalDuration = state.totalDuration + targetVideo.duration;
      state.selectedVideo = state.selectedVideo.concat(targetVideo);
    },
    removeVideoFromList(state, action) {
      const itemId = action.payload;
      state.selectedVideo = state.selectedVideo.filter((stateItem) => stateItem.id !== itemId.id);
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
    updateDuration(state, action) {},

    // Misc
    clearAll(state, action) {
      state.videoPage = 1;
      state.imagePage = 1;
      state.videoQuery = "nature";
      state.imageQuery = "nature";
      state.generatedVideos = [];
      state.generatedImages = [];
    },
  },
});

export default generateSlice;

export const generateActions = generateSlice.actions;
