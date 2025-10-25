import { createSlice } from "@reduxjs/toolkit";
import { allInitialStates } from "../allInitialStates";

const globalDataSlice = createSlice({
  name: 'globalDatas',
  initialState:allInitialStates,
  reducers: {
    setSelecetdFiles: (state, action) => {
      state.globalDataStates.selectedFiles = action.payload;
    },

  },
});

export const {
  setToggleChatHistorySidebar,
  setToggleIsChattingWithAI,
  setToggleChatMenuPopup,
  setToggleAddItemsToInputPopup,
} = globalDataSlice.actions;

export default globalDataSlice.reducer; 