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
    arab: [],
    splittingTimes: [],
    /* 
      Splitting time structure.
      [
       0:  [2.30, 2.34, 2.45],
       1:  [2.50, 2.54, 2.56],
       2:  [2.61, 2.62, 2.66],
        
      ]
    */
    unChangedArab: [],
    unChangedLocal: [],
    unChangedEnglish: [],

    // REDESIGN OF THE AYAHEDITOR
    ayahCount: 0,
    ayahEditor: [
      /*
        {ayah1},
        {
          pageNo: 233,
          ayahKey: '113:4',
          audio: 'verses.quran.com/mp3/3233.mp3',
          arab: ['ﮐ ﮑ ﮒ' ,'ﮓ ﮔ ﮕ'],
          eng: ['The most merciful', 'and the most powerful'],
          local: ['എന്തൊക്കെ' ,'ഉണ്ട് വിശീശ്മ'],
          unchanged: {
            arab: ['ﮐ ﮑ ﮒ ﮓ ﮔ ﮕ'],
            eng: ['The most merciful and the most powerful'],
            local: ['എന്തൊക്കെ ഉണ്ട് വിശീശ്മ'],
          },
          splitTimes: [1.26, 2.36, 2.44],
          splittingCount: 3
        },
        {ayah3},


      */
    ],
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

    updateAyahEditor(state, action) {
      try {
        const ayahIndex = action.payload.index;
        const value = action.payload.value;

        if (action.payload.task === "page") {
          state.ayahEditor[ayahIndex] = {
            ...state.ayahEditor[ayahIndex],
            page: value,
          };
        } else if (action.payload.task === "ayahKey") {
          state.ayahEditor[ayahIndex] = {
            ...state.ayahEditor[ayahIndex],
            ayahKey: value,
          };
        } else if (action.payload.task === "audio") {
          state.ayahEditor[ayahIndex] = {
            ...state.ayahEditor[ayahIndex],
            audio: value,
          };
        } else if (action.payload.task === "arab") {
          state.ayahEditor[ayahIndex] = {
            ...state.ayahEditor[ayahIndex],
            arab: [value],
            unchanged: {
              ...state.ayahEditor[ayahIndex].unchanged,
              arab: [value],
            },
            splitTimes: [],
            splitCount: 0,
          };
          state.ayahCount++;
        } else if (action.payload.task === "eng") {
          state.ayahEditor[ayahIndex] = {
            ...state.ayahEditor[ayahIndex],
            eng: [value],
            unchanged: {
              ...state.ayahEditor[ayahIndex].unchanged,
              eng: [value],
            },
          };
        } else if (action.payload.task === "local") {
          state.ayahEditor[ayahIndex] = {
            ...state.ayahEditor[ayahIndex],
            local: [value],
            unchanged: {
              ...state.ayahEditor[ayahIndex].unchanged,
              local: [value],
            },
          };
        } else if (action.payload.task === "updateSplitTime") {
          const currentSplitTimeArray = state.ayahEditor[ayahIndex].splitTimes;
          currentSplitTimeArray[state.ayahEditor[ayahIndex].splitCount] = value;
          state.ayahEditor[ayahIndex] = {
            ...state.ayahEditor[ayahIndex],
            splitTimes: currentSplitTimeArray, // add the new split second to the array.
            // splitCount: state.ayahEditor[ayahIndex].splitCount + 1, // Increase split count by 1
          };
        } else if (action.payload.task === "IncreaseSplitCount") {
          state.ayahEditor[ayahIndex] = {
            ...state.ayahEditor[ayahIndex],
            splitCount: state.ayahEditor[ayahIndex].splitCount + 1,
          };
        } else {
          throw new Error("NO AYAH EDITING TASK IS MATCHING");
        }
      } catch (err) {
        console.log(err);
      }
    },

    resetAllSplit(state, action) {
      const ayahIndex = action.payload.index;

      state.ayahEditor[ayahIndex] = {
        ...state.ayahEditor[ayahIndex],
        arab: state.ayahEditor[ayahIndex].unchanged.arab,
        eng: state.ayahEditor[ayahIndex].unchanged.eng,
        local: state.ayahEditor[ayahIndex].unchanged.local,
        splitTimes: [],
        splitCount: 0,
      };
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
      state.arab = [];
    },

    updateTransLocal(state, action) {
      const loadedTrans = action.payload;
      state.localTrans = loadedTrans;
      //Unchanged
      state.unChangedLocal = loadedTrans;
    },

    updateTransEnglish(state, action) {
      const loadedTrans = action.payload;
      state.engTrans = loadedTrans;
      //Unchanged
      state.unChangedEnglish = loadedTrans;
    },

    updateEnglish(state, action) {
      const loadedEng = action.payload;
      return {
        ...state,
        engTrans: [...state.engTrans, [...loadedEng]],
      };
    },

    splitEng(state, action) {
      const ayahIndex = action.payload.index;

      const tags = action.payload.tags;

      state.ayahEditor[ayahIndex] = {
        ...state.ayahEditor[ayahIndex],
        eng: tags,
      };
    },

    updateLocal(state, action) {
      const loadedLocal = action.payload;
      return {
        ...state,
        localTrans: [...state.localTrans, [...loadedLocal]],
      };
    },

    splitLocal(state, action) {
      const ayahIndex = action.payload.index;

      const tags = action.payload.tags;

      state.ayahEditor[ayahIndex] = {
        ...state.ayahEditor[ayahIndex],
        local: tags,
      };
    },

    updateArab(state, action) {
      const loadedArab = action.payload;
      return {
        ...state,
        arab: [...state.arab, [...loadedArab]],
        //unchanged
        unChangedArab: [...state.arab, [...loadedArab]],
      };
    },

    splitArab(state, action) {
      const ayahIndex = action.payload.index;

      const tags = action.payload.tags;

      state.ayahEditor[ayahIndex] = {
        ...state.ayahEditor[ayahIndex],
        arab: tags,
      };
    },

    updateSplittingTime(state, action) {
      const currentIndex = action.payload.index;
      const time = action.payload.time;
      if (state.splittingTimes[currentIndex] == null) {
        state.splittingTimes[currentIndex] = [time];
      } else {
        state.splittingTimes[currentIndex] = [...state.splittingTimes[currentIndex], time];
      }
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
