import { createSlice } from "@reduxjs/toolkit";

const generateSlice = createSlice({
  name: "generate",
  initialState: {
    selectedVideos: [],
  },
  reducers: {
    addVideoToList(state, action) {
      const newVideo = action.payload;

      state.selectedVideos = state.selectedVideos.concat(newVideo);
    },
    removeVideoFromList(state, action) {},
  },
});

export default generateSlice;

export const generateActions = generateSlice.actions;
