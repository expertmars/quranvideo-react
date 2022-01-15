import { generateActions } from "./generate-slice";
import { uiActions } from "./ui-slice";

import socketIO from "../components/hooks/socket";
import convertToFML from "../store/converter";

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

export const startGenerateVideoData = (videoData) => {
  return async (dispatch) => {
    const startGenerateVideo = async () => {
      const response = await fetch("http://localhost:3050/generate", {
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

export const fetchAyahData = (formData, ayahKeys) => {
  return async (dispatch) => {
    const fetchAyah = async () => {
      // const surahName = this.downloadOption["surahName"];
      const from = formData[0].fromAyah;
      const to = formData[0].toAyah;
      const translationIdLocal = 37;
      const translationIdEng = 149;
      const convertFML = true;
      const transLocal = [];
      const transEnglish = [];
      const api = "https://verses.quran.com/";

      console.log(from, " to ", to);

      let ayahIndex = 0;

      const promises = [];

      for (var i = from; i <= to; i++) {
        const verseKey = formData[0].surahName + ":" + i;
        console.log(i);

        await fetch(`https://api.quran.com/api/v4/recitations/7/by_ayah/${verseKey}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            const url = api + data["audio_files"][0].url;

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
            dispatch(
              generateActions.updateAyahEditor({
                task: "local",
                value: data["translations"][0].text,
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
            dispatch(
              generateActions.updateAyahEditor({
                task: "eng",
                value: data["translations"][0].text,
                index: ayahIndex,
              })
            );

            console.log("RESOLVING ENG TRANS");
          });

        ayahIndex++;
      }

      // Promise.all(promises)
      //   .then((result) => {
      dispatch(uiActions.hideLoading());
      //     console.log("ALL RESOLVED ============");
      //     setTimeout(() => {
      dispatch(uiActions.showAyahEditorModal());
      //     }, 10000);
      //   })
      //   .catch((err) => {
      //     console.log("something went wrong");
      //   });

      // dispatch(generateActions.updateTransEnglish(transEnglish));
      // dispatch(generateActions.updateTransLocal(transLocal));
    };

    return fetchAyah();
  };
};
