import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slices/authSlice";
import ToggleSlice from "../slices/toggleSlice";
import GlobalDataSlice from "../slices/globalDataSlice";
import apiCommonSlice from "../slices/apiCommonSlice";
import analyticsSlice from "../slices/analyticsSlice";

export const Store = configureStore({
  reducer: {
    Auth: AuthSlice,
    Toggle: ToggleSlice,
    Global: GlobalDataSlice,
    API: apiCommonSlice,
    Analytics: analyticsSlice,
  },
});

export default Store;
