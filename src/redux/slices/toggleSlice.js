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
    }
  },
});

export const {
  setToggleChatHistorySidebar,
  setToggleIsChattingWithAI,
  setToggleChatMenuPopup
} = toggleSlice.actions;

export default toggleSlice.reducer; 