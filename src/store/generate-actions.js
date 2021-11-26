import { generateActions } from "./generate-slice";
import { useSelector } from "react-redux";

export const fetchPhotoData = () => {
  return async (dispatch) => {
    const fetchPhoto = async () => {
      const response = await fetch("https://api.pexels.com/v1/search?query=nature&per_page=15", {
        headers: {
          Authorization: "563492ad6f91700001000001290bb5e8cc084013ac451e247fb800fb",
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Could not reach to the server for fetching photo data.");
      }

      const data = await response.json().then((data) => data.photos);

      console.log(data);

      return data;
    };

    try {
      const generatePhoto = await fetchPhoto();
      const loadedPictures = [];

      for (const key in generatePhoto) {
        loadedPictures.push({
          id: key,
          photo: generatePhoto[key].src.large,
        });
      }

      dispatch(generateActions.updatePhotoThumbnail(loadedPictures));
      console.log(loadedPictures);
    } catch {
      throw new Error("Something went wrong on fetching photo data.");
    }
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
        .then((data) => data.videos)
        .then((videoData) => {
          const loadedVideos = [];
          for (const key in videoData) {
            loadedVideos.push({
              id: videoData[key].id,
              duration: videoData[key].duration,
              thumbnail: videoData[key].image,
              videoURL: videoData[key].url,
            });
          }
          console.log(loadedVideos);
          dispatch(generateActions.updateGeneratedVideos(loadedVideos));
        })
        .catch((error) => console.log(error));

      return responseData;
    };
    return fetchVideo();
  };
};
