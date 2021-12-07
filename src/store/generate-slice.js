import { createSlice } from "@reduxjs/toolkit";

const generateSlice = createSlice({
  name: "generate",
  initialState: {
    // GenerateForm
    generateForm: [],
    submissionButton: false,

    // ChooseVideoCard
    selectedPhoto: [],
    selectedVideo: [],
    generatedImages: [],
    generatedVideos: [],
    totalDuration: 0,
    videoPage: 1,
    videoQuery: "nature",
    imagePage: 1,
    imageQuery: "nature",

    // Fetched quran data
    selectedSurahVerseCount: 17,
    quranSurah: [],
    generatedRecitors: [],
  },
  reducers: {
    // GenerateForm
    updateToGenerateForm(state, action) {
      const loadedItems = action.payload;
      state.generateForm = [loadedItems];
      state.submissionButton = false;

      // return {
      //   ...state,
      //   generateForm: [loadedItems],
      //   submissionButton: false,
      // };
    },

    updateSubmissionButton(state, action) {
      state.submissionButton = true;
    },

    // Photo - (ChooseVideoCard)
    updateGeneratedImages(state, action) {
      const loadedImages = action.payload;
      return {
        ...state,
        generatedImages: [...state.generatedImages, ...loadedImages],
      };
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

    // Video - (ChooseVideoCard)
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

    // Quran Data Fetching
    updateQuranSurah(state, action) {
      const loadedQuranData = action.payload;
      state.quranSurah = state.quranSurah.concat(loadedQuranData);
    },

    updateSelectedSurahVerseCount(state, action) {
      const loadedSelectedSurahVerseCount = action.payload;
      state.selectedSurahVerseCount = loadedSelectedSurahVerseCount;
    },

    updateRecitor(state, action) {
      const loadedRecitorData = action.payload;
      state.generatedRecitors = state.generatedRecitors.concat(loadedRecitorData);
    },

    // Misc - (ChooseVideoCard)
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
