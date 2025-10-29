import { createSlice } from "@reduxjs/toolkit";
import { allInitialStates } from "../allInitialStates";
import { setUser } from "./authSlice";

const globalDataSlice = createSlice({
  name: 'globalDatas',
  initialState:allInitialStates,
  reducers: {
    setSelecetdFiles: (state, action) => {
      state.globalDataStates.selectedFiles = action.payload;
    },
    setUserMessagePrompt: (state, action) => {
      state.globalDataStates.userMessagePrompt = action.payload;
    }
  },
});

export const {
  setSelecetdFiles,
  setUserMessagePrompt
} = globalDataSlice.actions;

export default globalDataSlice.reducer; 