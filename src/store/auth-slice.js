import { createSlice } from "@reduxjs/toolkit";

let userData = JSON.parse(localStorage.getItem("userData"));

const expiry = new Date(userData.expireOn);
const timenow = new Date();

if (timenow > expiry) {
  userData = null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: { userData: userData, isLogged: userData },
  reducers: {
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
