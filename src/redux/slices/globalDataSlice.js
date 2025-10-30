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
    removeSelectedFile: (state, action) => {
      state.globalDataStates.selectedFiles = state.globalDataStates.selectedFiles.filter(
        (_, index) => index !== action.payload
      );
    },
    setUserMessagePrompt: (state, action) => {
      state.globalDataStates.userMessagePrompt = action.payload;
    },
    setChatInputContentLinesNumber: (state, action) => {
      state.globalDataStates.chatInputContentLinesNumber = action.payload;
    },
  },
});

export const {
  setSelecetdFiles,
  removeSelectedFile,
  setUserMessagePrompt,
  setChatInputContentLinesNumber,
} = globalDataSlice.actions;

export default globalDataSlice.reducer; 