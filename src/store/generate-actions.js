export const fetchVideoData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://api.pexels.com/v1/search?query=nature&per_page=1", {
        headers: {
          Authorization: "563492ad6f91700001000001290bb5e8cc084013ac451e247fb800fb",
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Could not fetch generate data!");
      }

      const data = await response.json();

      console.log(data);
    };
  };
};
