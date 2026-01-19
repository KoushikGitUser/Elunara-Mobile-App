export const roomsStates = {
  // List states
  rooms: [],
  pinnedRooms: [],
  roomChats: [],
  availableChats: [],
  currentRoom: null,

  // Loading states
  fetchingRooms: false,
  fetchingPinnedRooms: false,
  fetchingRoom: false,
  fetchingRoomChats: false,
  fetchingAvailableChats: false,

  // Action states
  creatingRoom: false,
  updatingRoom: false,
  deletingRoom: false,
  pinningRoom: false,
  unpinningRoom: false,
  addingChatsToRoom: false,
  operatingBulkRooms: false,
  undoingDeleteRoom: false,

  // Temp states for editing
  tempRoomSettings: {
    llm_id: null,
    response_style_id: null,
    response_language_id: null,
    citation_format_id: null,
  },
};
