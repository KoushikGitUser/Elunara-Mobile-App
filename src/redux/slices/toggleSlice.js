import { createSlice } from '@reduxjs/toolkit';
import { allInitialStates } from '../allInitialStates';


const toggleSlice = createSlice({
  name: 'toggle',
  initialState:allInitialStates,
  reducers: {
    setToggleChatHistorySidebar: (state, action) => {
      state.toggleStates.toggleChatHistorySidebar = action.payload;
    },
    setToggleIsChattingWithAI: (state, action) => {
      state.toggleStates.toggleIsChattingWithAI = action.payload;
    },
    setToggleChatMenuPopup: (state, action) => {
      state.toggleStates.toggleChatMenuPopup = action.payload;
    },
    setToggleAddItemsToInputPopup: (state, action) => {
      state.toggleStates.toggleAddItemsToInputPopup = action.payload;
    },
    setToggleTopicsPopup: (state, action) => {
      state.toggleStates.toggleTopicsPopup = action.payload;
    },
    setToggleToolsPopup: (state, action) => {
      state.toggleStates.toggleToolsPopup = action.payload;
    },
    setToggleToolsPopupStates: (state, action) => {
      state.toggleStates.toggleToolsPopupStates = action.payload;
    }
  },
});

export const {
  setToggleChatHistorySidebar,
  setToggleIsChattingWithAI,
  setToggleChatMenuPopup,
  setToggleAddItemsToInputPopup,
  setToggleTopicsPopup,
  setToggleToolsPopup,
  setToggleToolsPopupStates
} = toggleSlice.actions;

export default toggleSlice.reducer; 