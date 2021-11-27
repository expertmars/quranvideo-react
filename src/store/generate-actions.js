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
