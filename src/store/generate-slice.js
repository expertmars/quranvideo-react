import { createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../config";

const generateSlice = createSlice({
  name: "generate",
  initialState: {
    // GenerateForm
    generateForm: [],
    submissionButton: false,

    // Edit Button
    editForm: [{ recitor: 7, surahName: 1, fromAyah: 1, toAyah: 3, localTranslation: 37, englishTranslation: 203 }],
    editButtonIsClicked: false,

    // ChooseVideoCard
    isAyahwise: true,
    selectedMedia: [],
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

    //Logo / watermark

    customLogo: false,
    customAudio: false,

    // Custom Audio Modal
    showCustomAudioModal: false,

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
    transList: [],
    googleFonts: [],
  },
  reducers: {
    customAudioModal(state, action) {
      const status = action.payload.status;
      state.showCustomAudioModal = status;
    },

    updateCustomLogo(state, action) {
      const status = action.payload.status;
      state.customLogo = status;
      // console.log(status);
    },

    updateTransList(state, action) {
      const loadedTrans = action.payload;
      state.transList = loadedTrans;
    },

    updateGoogleFonts(state, action) {
      const loadedFonts = action.payload;
      state.googleFonts = loadedFonts;
    },

    // GenerateForm
    updateToGenerateForm(state, action) {
      const loadedItems = action.payload;
      const formItems = {
        ...loadedItems,
        ayahEditor: state.ayahEditor,
        customLogo: state.customLogo,
        customAudio: state.customAudio,
      };
      state.generateForm = [formItems, state.selectedMedia];
      state.submissionButton = false;
    },

    // Edit Button

    updateToEditForm(state, action) {
      const { name, value } = action.payload;
      state.editForm[0][name] = value;
    },

    editButtonIsClicked(state, action) {
      state.editButtonIsClicked = true;
    },

    editButtonIsClosed(state, action) {
      state.editButtonIsClicked = false;
    },

    updateSubmissionButton(state, action) {
      state.submissionButton = true;
    },

    emptyAyahEditorData(state, action) {
      console.log("EMPTYING AYAH EDITO");
      state.ayahEditor = [];
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

    updateCustomAyahAudio(state, action) {
      const uid = action.payload.uid;

      state.ayahEditor.map((ayahData, index) => {
        state.ayahEditor[index] = {
          ...state.ayahEditor[index],
          audio: BACKEND_URL + `/assets/${uid}/${index + 1}.mp3`,
        };
      });
      state.customAudio = true;
    },

    resetCustomAudio(state, action) {
      state.customAudio = false;
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

    resetSplit(state, action) {
      const ayahIndex = action.payload.index;

      if (action.payload.mode === "arab") {
        state.ayahEditor[ayahIndex] = {
          ...state.ayahEditor[ayahIndex],
          arab: action.payload.value,
        };
      } else if (action.payload.mode === "eng") {
        state.ayahEditor[ayahIndex] = {
          ...state.ayahEditor[ayahIndex],
          eng: action.payload.value,
        };
      } else if (action.payload.mode === "local") {
        state.ayahEditor[ayahIndex] = {
          ...state.ayahEditor[ayahIndex],
          local: action.payload.value,
        };
      } else {
        throw "cannot find a matching task on resetSplit call";
      }
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

    splitEng(state, action) {
      const ayahIndex = action.payload.index;

      const tags = action.payload.tags;

      state.ayahEditor[ayahIndex] = {
        ...state.ayahEditor[ayahIndex],
        eng: tags,
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

    splitArab(state, action) {
      const ayahIndex = action.payload.index;

      const tags = action.payload.tags;

      state.ayahEditor[ayahIndex] = {
        ...state.ayahEditor[ayahIndex],
        arab: tags,
      };
    },

    // Photo - (ChooseVideoCard)
    updateAudiowise(state, action) {
      const status = action.payload.status;
      state.isAyahwise = status;
    },

    updateGeneratedImages(state, action) {
      const loadedImages = action.payload;
      return {
        ...state,
        generatedImages: [...state.generatedImages, ...loadedImages],
      };
    },

    addPhotoToList(state, action) {
      const targetPhoto = action.payload;
      const preparedData = { ...targetPhoto, type: "photo" };
      state.selectedMedia = state.selectedMedia.concat(preparedData);
    },

    removePhotoFromList(state, action) {
      console.log("remvoing");
    },

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
      console.log(targetVideo);
      state.totalDuration = state.totalDuration + targetVideo.duration;
      const preparedData = { ...targetVideo, type: "video" };
      state.selectedMedia = state.selectedMedia.concat(preparedData);
    },

    removeVideoFromList(state, action) {
      const targetVideo = action.payload;
      state.selectedMedia = state.selectedMedia.filter((stateItem) => stateItem.id !== targetVideo.id);
      state.totalDuration = state.totalDuration - targetVideo.duration;
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
