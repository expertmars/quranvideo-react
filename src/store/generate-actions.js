import { generateActions } from "./generate-slice";

export const fetchGenerateData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://api.pexels.com/v1/search?query=nature&per_page=15", {
        headers: {
          Authorization: "563492ad6f91700001000001290bb5e8cc084013ac451e247fb800fb",
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Could not fetch generate data!");
      }

      const data = await response.json().then((data) => data.photos);

      console.log(data);

      return data;
    };

    try {
      const generateData = await fetchData();
      const loadedPictures = [];

      for (const key in generateData) {
        loadedPictures.push({
          id: key,
          photo: generateData[key].src.large,
          video: generateData,
        });
      }

      dispatch(generateActions.updatePhotoThumbnail(loadedPictures));
      console.log(loadedPictures);
    } catch {
      throw new Error("Failed to connect! Something went wrong!");
    }
  };
};
