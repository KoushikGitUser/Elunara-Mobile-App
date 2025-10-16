import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toggleChatHistorySidebar: false,
};

const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    setToggleChatHistorySidebar: (state, action) => {
      state.toggleChatHistorySidebar = action.payload;
    }
  },
});

export const {
  setToggleChatHistorySidebar,
} = toggleSlice.actions;

export default toggleSlice.reducer;