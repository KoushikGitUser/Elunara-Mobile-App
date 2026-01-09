import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slices/authSlice";
import ToggleSlice from "../slices/toggleSlice";
import GlobalDataSlice from "../slices/globalDataSlice";
import apiCommonSlice from "../slices/apiCommonSlice";

export const Store = configureStore({
  reducer: {
    Auth: AuthSlice,
    Toggle: ToggleSlice,
    Global: GlobalDataSlice,
    API: apiCommonSlice,
  },
});

export default Store;
