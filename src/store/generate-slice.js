import { createSlice } from "@reduxjs/toolkit";

const generateSlice = createSlice({
  name: "generate",
  initialState: {
    selectedPhoto: [],
    selectedVideo: [],

    photoThumbnail: [],
    generatedVideos: [],
    storedNextPageData: "",
    nextPageData: "https://api.pexels.com/videos/search?query=nature&per_page=15",
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
      // state.generatedVideos = state.generatedVideos.concat(loadedVideos);
      return {
        ...state,
        generatedVideos: [...state.generatedVideos, ...loadedVideos],
      };
    },
    addVideoToList(state, action) {
      const targetVideo = action.payload;
      state.selectedVideo = state.selectedVideo.concat(targetVideo);
    },

    // Next Page

    storeNextPageVideoData(state, action) {
      const loadedData = action.payload;
      state.storedNextPageData = loadedData;
    },
    updateNextPageVideoData(state, action) {
      state.nextPageData = state.storedNextPageData;
      console.log(state.nextPageData);
    },
  },
});

export default generateSlice;

export const generateActions = generateSlice.actions;
