import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import generateSlice from "./generate-slice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, generate: generateSlice.reducer },
});

export default store;
