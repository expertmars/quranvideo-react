import { generateActions } from "./generate-slice";
import { uiActions } from "./ui-slice";

import socketIO from "../components/hooks/socket";
import convertToFML from "../store/converter";
import { BACKEND_URL } from "../config";
import { useSelector } from "react-redux";

export const fetchImageData = (imagePage, imageQuery) => {
  return async (dispatch) => {
    const fetchImage = async () => {
      const response = await fetch(
        `https://api.pexels.com/v1/search?page=${imagePage}&query=${imageQuery}&per_page=15`,
        {
          headers: {
            Authorization: "563492ad6f91700001000001290bb5e8cc084013ac451e247fb800fb",
          },
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Could not react to the server for fetching video data.");
      }

      const responseData = response
        .json()
        .then((data) => {
          console.log(data);
          return data.photos;
        })
        .then((imageData) => {
          const loadedImages = [];
          for (const key in imageData) {
            loadedImages.push({
              id: imageData[key].id,
              image: imageData[key].src.large,
              name: imageData[key].url,
            });
          }
          dispatch(generateActions.updateGeneratedImages(loadedImages));
        })
        .catch((error) => console.log(error));
      return responseData;
    };
    return fetchImage();
  };
};

export const fetchTranslationList = () => {
  return async (dispatch) => {
    fetch("https://api.quran.com/api/v4/resources/translations")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.translations);
        dispatch(generateActions.updateTransList(data.translations));
      });
  };
};

export const fetchGoogleFonts = () => {
  return async (dispatch) => {
    fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyA_MVkjzkLXjbGN0YFf3aMJ3HlMmoT1TDM")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data.items);
        dispatch(generateActions.updateGoogleFonts(data.items));
      });
  };
};

export const fetchVideoData = (videoPage, videoQuery) => {
  return async (dispatch) => {
    const fetchVideo = async () => {
      const response = await fetch(
        `https://api.pexels.com/videos/search?page=${videoPage}&query=${videoQuery}&per_page=15&size=medium`,
        {
          headers: {
            Authorization: "563492ad6f91700001000001290bb5e8cc084013ac451e247fb800fb",
          },
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Could not react to the server for fetching video data.");
      }

      const responseData = response
        .json()
        .then((data) => {
          console.log(data);
          return data.videos;
        })
        .then((videoData) => {
          const loadedVideos = [];
          for (const key in videoData) {
            loadedVideos.push({
              id: videoData[key].id,
              duration: videoData[key].duration,
              thumbnail: videoData[key].image,
              videoURL: videoData[key].video_files[0].link,
            });
          }
          dispatch(generateActions.updateGeneratedVideos(loadedVideos));
        })
        .catch((error) => console.log(error));

      return responseData;
    };
    return fetchVideo();
  };
};

export const fetchQuranData = () => {
  return async (dispatch) => {
    const fetchQuran = async () => {
      const response = await fetch("https://api.quran.com/api/v4/chapters?language=en", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Could not react to the server for fetching quran data.");
      }

      const responseData = await response
        .json()
        .then((data) => data.chapters)
        .then((quranData) => {
          for (const key in quranData) {
            const loadedQuranData = [];
            loadedQuranData.push({
              id: quranData[key].id,
              name: quranData[key].name_simple,
              versesCount: quranData[key].verses_count,
            });

            dispatch(generateActions.updateQuranSurah(loadedQuranData));
          }
        })
        .catch((error) => console.log(error));

      console.log(responseData);

      return responseData;
    };

    return fetchQuran();
  };
};

export const fetchRecitorData = () => {
  return async (dispatch) => {
    const fetchRecitor = async () => {
      const response = await fetch("https://api.quran.com/api/v4/resources/recitations?language=en", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Could not react to the server for fetching quran data.");
      }

      const responseData = await response
        .json()
        .then((data) => data.recitations)
        .then((recitorData) => {
          for (const key in recitorData) {
            const loadedRecitorData = [];
            loadedRecitorData.push({
              id: recitorData[key].id,
              name: recitorData[key].reciter_name,
            });

            dispatch(generateActions.updateRecitor(loadedRecitorData));
          }
        })
        .catch((error) => console.log(error));

      console.log(responseData);

      return responseData;
    };

    return fetchRecitor();
  };
};

export const startGenerateVideoData = (videoData, formData, ayahEditor, showUI) => {
  return async (dispatch) => {
    const startGenerateVideo = async () => {
      if (videoData[0].ayahEditor.length === 0) {
        // await fetchAyah(dispatch, formData, showUI);
        console.log("+++++++++++ EMPTY ++++++++++++");
      }

      const response = await fetch(`${BACKEND_URL}/generate`, {
        method: "POST",
        body: JSON.stringify(videoData),
        headers: { "Content-Type": "application/json" },
      });

      // var socket = socketIO.connectIO();
      // socket.emit("generateVideo", videoData);

      // const data = await response.json();
      // console.log(data);
    };

    return startGenerateVideo();
  };
};

export const fetchAyahData = (formData, showUI) => {
  return async (dispatch) => {
    return fetchAyah(dispatch, formData, showUI);
  };
};

// THIS IS ONLY FUNCTION, dispatch is below this function.

export const fetchAyah = async (dispatch, formData, showUI) => {
  // const surahName = this.downloadOption["surahName"];
  const from = formData[0].fromAyah;
  const to = formData[0].toAyah;
  const translationIdLocal = formData[0].localTranslation;
  const translationIdEng = formData[0].englishTranslation;
  const convertFML = true;
  const transLocal = [];
  const transEnglish = [];
  const api = "https://verses.quran.com/";

  console.log(from, " to ", to);

  let ayahIndex = 0;

  const promises = [];

  for (var i = from; i <= to; i++) {
    const verseKey = formData[0].surahName + ":" + i;
    const recitor = formData[0].recitor;

    const audio = `https://api.quran.com/api/v4/recitations/${recitor}/by_ayah/${verseKey}`;

    console.log(i);

    await fetch(audio)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let url = api + data["audio_files"][0].url;

        if (recitor == 6 || recitor == 11 || recitor == 12) {
          url = "https:" + data["audio_files"][0].url;
        }

        dispatch(generateActions.updateAyahEditor({ task: "audio", value: url, index: ayahIndex }));

        console.log("RESOLVING AUDIO");
      });

    await fetch(
      `https://api.quran.com/api/v4/quran/verses/code_v2?chapter_number=${formData[0].surahName}&verse_key=${verseKey}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const glyph = data["verses"][0].code_v2;
        const page = data["verses"][0].v2_page;

        // dispatch(generateActions.updateAyahKeys({ verseKey: verseKey, glyph: glyph }));
        // dispatch(generateActions.updateListOfAyah({ page: page, glyph: glyph }));
        // dispatch(generateActions.updateArab([glyph]));

        dispatch(generateActions.updateAyahEditor({ task: "arab", value: glyph, index: ayahIndex }));
        dispatch(generateActions.updateAyahEditor({ task: "ayahKey", value: verseKey, index: ayahIndex }));
        dispatch(generateActions.updateAyahEditor({ task: "page", value: page, index: ayahIndex }));

        console.log("RESOLVING ARAB");
      });

    await fetch(`https://api.quran.com/api/v4/quran/translations/${translationIdLocal}?verse_key=${verseKey}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(convertToFML(response.data["translations"][0].text).replace('\n', '\​n'));
        // transLocal.push([data["translations"][0].text]);

        const el = document.createElement("div");
        el.innerHTML = data["translations"][0].text;

        var element = el.getElementsByTagName("sup"),
          index;

        for (index = element.length - 1; index >= 0; index--) {
          el.removeChild(element[index]);
        }

        let txt = el.textContent;
        txt = txt.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        txt = txt.replace("[", "");

        dispatch(
          generateActions.updateAyahEditor({
            task: "local",
            value: txt,
            index: ayahIndex,
          })
        );

        console.log("RESOLVING LOCAL TRANS");
      });

    await fetch(`https://api.quran.com/api/v4/quran/translations/${translationIdEng}?verse_key=${verseKey}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(convertToFML(response.data["translations"][0].text).replace('\n', '\​n'));
        // transEnglish.push([data["translations"][0].text]);

        const el = document.createElement("div");
        el.innerHTML = data["translations"][0].text;

        var element = el.getElementsByTagName("sup"),
          index;

        for (index = element.length - 1; index >= 0; index--) {
          el.removeChild(element[index]);
        }

        let txt = el.textContent;
        txt = txt.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        dispatch(
          generateActions.updateAyahEditor({
            task: "eng",
            value: txt, //data["translations"][0].text,
            index: ayahIndex,
          })
        );

        console.log("RESOLVING ENG TRANS");
        console.log("FETCHED AYAH DATA");
      });

    ayahIndex++;
  }

  if (showUI) {
    dispatch(uiActions.hideLoading());

    dispatch(uiActions.showAyahEditorModal());
  }
};
