export const searchStates = {
  // Data states
  searchResults: {
    chats: [],
    rooms: [],
    messages: [],
  },
  searchHistory: [],
  meta: null,

  // Loading states
  isSearching: false,
  fetchingHistory: false,
  clearingHistory: false,

  // Highlight states for scroll-to feature
  highlightChatId: null,
  highlightRoomId: null,
};
