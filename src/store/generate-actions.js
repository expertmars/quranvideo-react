import { generateActions } from "./generate-slice";

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

export const fetchVideoData = () => {
  return async (dispatch) => {
    const fetchVideo = async () => {
      const response = await fetch("https://api.pexels.com/videos/search?query=nature&per_page=15", {
        headers: {
          Authorization: "563492ad6f91700001000001290bb5e8cc084013ac451e247fb800fb",
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Could not react to the server for fetching video data.");
      }

      const data = response.json().then((data) => data.videos);

      return data;
    };

    try {
      const generateVideo = await fetchVideo();
      console.log(generateVideo);
      const loadedVideos = [];

      for (const key in generateVideo) {
        loadedVideos.push({
          id: key,
          duration: generateVideo[key].duration,
          thumbnail: generateVideo[key].image,
          videoURL: generateVideo[key].url,
        });
      }
      dispatch(generateActions.updateGeneratedVideos(loadedVideos));
      console.log(loadedVideos);
    } catch {
      throw new Error("Something went wrong on fetching video data!");
    }
  };
};

export const fetchMoreVideoData = () => {
  return async (dispatch) => {
    const fetchMoreVideo = async () => {
      const response = await fetch("https://api.pexels.com/videos/search?query=nature&per_page=15", {
        headers: {
          Authorization: "563492ad6f91700001000001290bb5e8cc084013ac451e247fb800fb",
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Could not react to the server for fetching more video data.");
      }

      const data = response.json().then((data) => data.next_page);

      return data;
    };

    try {
      const generateVideo = await fetchMoreVideo();
      console.log(generateVideo);
    } catch {
      throw new Error("Something went wrong on fetching more video data!");
    }
  };
};
