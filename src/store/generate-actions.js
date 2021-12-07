import { generateActions } from "./generate-slice";

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
        `https://api.pexels.com/videos/search?page=${videoPage}&query=${videoQuery}&per_page=15`,
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

      const data = await response.json();
      console.log(data);
    };

    return startGenerateVideo();
  };
};
