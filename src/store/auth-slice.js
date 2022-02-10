import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const usrData = JSON.parse(localStorage.getItem("userData"));

const authSlice = createSlice({
  name: "auth",
  initialState: { userData: usrData, isLogged: usrData },
  reducers: {
    // getUserData(state, action) {
    //   let data = JSON.parse(localStorage.getItem("userData"));
    //   console.log(data);
    //   if (data != null) {
    //     state.userData = data;
    //     state.isLogged = true;
    //   } else {
    //     state.isLogged = false;
    //     state.userData = {};
    //   }
    // },

    updateUserData(state, action) {
      const loadedData = action.payload;
      localStorage.setItem("userData", JSON.stringify(loadedData));

      state.userData = loadedData;
      state.isLogged = true;
    },

    logoutHandler(state, action) {
      state.isLogged = false;
      state.userData = {};
      localStorage.removeItem("userData");
    },
  },
});

export default authSlice;

export const authActions = authSlice.actions;
