import { createSlice } from "@reduxjs/toolkit";

const generateSlice = createSlice({
  name: "generate",
  initialState: {
    // GenerateForm
    generateForm: [],
    submissionButton: false,

    // Edit Button
    editForm: [],
    editButtonIsClicked: false,

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
    selectedSurahVerseCount: 7,
    quranSurah: [],
    generatedRecitors: [],

    // Fetch Ayah - (generate-actions.js)
    ayahKeys: {}, // ayahKey: glyph
    listOfAyah: {}, // glyph : page
    ayahAudios: {}, // ayahkey : audio url
    localTrans: [],
    engTrans: [],
  },
  reducers: {
    // GenerateForm
    updateToGenerateForm(state, action) {
      const loadedItems = action.payload;
      state.generateForm = [loadedItems, state.selectedVideo, state.selectedPhoto];
      state.submissionButton = false;

      // return {
      //   ...state,
      //   generateForm: [loadedItems],
      //   submissionButton: false,
      // };
    },

    // Edit Button

    updateToEditForm(state, action) {
      const loadedItems = action.payload;
      state.editForm = [loadedItems, state.selectedVideo, state.selectedPhoto];
      state.submissionButton = false;
    },

    updateEditButtonIsClicked(state, action) {
      state.editButtonIsClicked = true;
    },

    updateSubmissionButton(state, action) {
      state.submissionButton = true;
    },

    // Fetch Ayah - (generate-actions.js)
    updateAyahKeys(state, action) {
      const verseKey = action.payload.verseKey;
      const glyph = action.payload.glyph;
      console.log(verseKey, glyph);
      state.ayahKeys[verseKey] = glyph;
    },

    updateAyahAudios(state, action) {
      const url = action.payload.url;
      const verseKey = action.payload.verseKey;
      console.log(verseKey, url);
      state.ayahAudios[verseKey] = url;
    },

    updateListOfAyah(state, action) {
      const page = action.payload.page;
      const glyph = action.payload.glyph;
      // console.log(page);
      state.listOfAyah[glyph] = page;
    },

    resetAyahKeysAndListOfAyah(state, action) {
      state.listOfAyah = {};
      state.ayahKeys = {};
    },

    updateTransLocal(state, action) {
      const loadedTrans = action.payload;
      state.localTrans = loadedTrans;
    },

    updateTransEnglish(state, action) {
      const loadedTrans = action.payload;
      state.engTrans = loadedTrans;
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
