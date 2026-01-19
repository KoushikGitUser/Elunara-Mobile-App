import { triggerToast } from "../../services/toast";

// GET /search
export const handleSearch = {
  pending: (state) => {
    state.searchStates.isSearching = true;
  },
  fulfilled: (state, action) => {
    state.searchStates.isSearching = false;
    state.searchStates.searchResults = action?.payload?.data?.data || {
      chats: [],
      rooms: [],
      messages: [],
    };
    state.searchStates.meta = action?.payload?.data?.meta;
  },
  rejected: (state, action) => {
    state.searchStates.isSearching = false;
    triggerToast(
      "Error",
      action?.payload?.message || "Search failed",
      "error",
      3000,
    );
  },
};

// GET /search/history
export const handleGetSearchHistory = {
  pending: (state) => {
    state.searchStates.fetchingHistory = true;
  },
  fulfilled: (state, action) => {
    state.searchStates.fetchingHistory = false;
    state.searchStates.searchHistory = action?.payload?.data?.data || [];
  },
  rejected: (state, action) => {
    state.searchStates.fetchingHistory = false;
  },
};

// DELETE /search/history
export const handleClearSearchHistory = {
  pending: (state) => {
    state.searchStates.clearingHistory = true;
  },
  fulfilled: (state, action) => {
    state.searchStates.clearingHistory = false;
    state.searchStates.searchHistory = [];
    triggerToast("Success", "Search history cleared", "success", 3000);
  },
  rejected: (state, action) => {
    state.searchStates.clearingHistory = false;
    triggerToast(
      "Error",
      action?.payload?.message || "Failed to clear history",
      "error",
      3000,
    );
  },
};
