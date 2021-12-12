import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import generateSlice from "./generate-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, generate: generateSlice.reducer, auth: authSlice.reducer },
});

export default store;
