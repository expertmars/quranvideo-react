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

export const fetchVideoData = (fetchURL) => {
  return async (dispatch) => {
    const fetchVideo = async () => {
      const response = await fetch(fetchURL, {
        headers: {
          Authorization: "563492ad6f91700001000001290bb5e8cc084013ac451e247fb800fb",
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Could not react to the server for fetching video data.");
      }

      const data = response.json();
      const nextPageData = data.then((data) => data.next_page);
      const videoData = data.then((data) => data.videos);

      return {
        videoData: videoData,
        nextPageData: nextPageData,
        data: data,
      };
    };

    try {
      const generateVideo = await (await fetchVideo()).videoData;
      const generateNextPageVideos = await (await fetchVideo()).nextPageData;
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
      dispatch(generateActions.storeNextPageVideoData(generateNextPageVideos));
      dispatch(generateActions.updateGeneratedVideos(loadedVideos));
    } catch {
      throw new Error("Something went wrong on fetching video data!");
    }
  };
};

export const fetchNewVideoData = (fetchURL) => {
  return async (dispatch) => {
    const fetchNewVideo = async () => {
      const response = await fetch(fetchURL(), {
        headers: {
          Authorization: "563492ad6f91700001000001290bb5e8cc084013ac451e247fb800fb",
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Could not react to the server for fetching video data.");
      }

      const data = response.json();
      const nextPageData = data.then((data) => data.next_page);
      const videoData = data.then((data) => data.videos);

      return {
        videoData: videoData,
        nextPageData: nextPageData,
        data: data,
      };
    };

    try {
      const generateVideo = await (await fetchNewVideo()).videoData;
      const generateNextPageVideos = await (await fetchNewVideo()).nextPageData;
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
      dispatch(generateActions.updateNextPageVideoData(generateNextPageVideos));
      dispatch(generateActions.updateGeneratedVideos(loadedVideos));
      console.log(loadedVideos);
      console.log(generateNextPageVideos);
    } catch {
      throw new Error("Something went wrong on fetching video data!");
    }
  };
};
