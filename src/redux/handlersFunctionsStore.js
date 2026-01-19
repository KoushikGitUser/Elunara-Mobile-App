import {
  handleGetAllCitiesAvailable,
  handleGetAllCountriesAvailable,
  handleGetAllGendersAvailable,
  handleGetAllUniversitiesAvailable,
  handleGetAllDegreeProgramsAvailable,
  handleGetAllSpecializationsAvailable,
  handleGetAllGeneralSettings,
  handleGetAllLanguagesAvailable,
  handleGetAllLLMsAvailable,
  handleGetAllPersonalisationsSettings,
  handleRestoreAllGeneralSettings,
  handleUpdateGeneralSettings,
  handleUpdatePersonalisationsSettings,
  handleGetAllProfileInfos,
  handleUpdateProfileName,
  handleUpdateProfileImage,
  handleUpdateProfileAvatarImage,
  handleSubmitHelpCenterFeedback,
  handleGetAcademicLinks,
  handleAddAcademicLink,
  handleDeleteAcademicLink,
  handleGetAnalyticsDashboard,
  handleGetAnalyticsTopics,
  handleGetAnalyticsSubjects,
  handleFetchResponseStylesAvailable,
  handleFetchCitationFormatsAvailable,
} from "./apiExtraReducerHandlers/settingsHandlers";

import {
  handleCreateChatWithAI,
  handleGetAllDetailsOfChatByID,
  handleGetAllRecentChats,
  handleGetAllSubjectsForChat,
  handleGetAllTopicsOfSelectedSubjects,
  handleRenameAndUpdateChatTitle,
  handlePinOrUnpinChat,
  handleArchiveOrUnarchiveChat,
  handleDeleteChat,
  handleUndoDeleteChat,
  handleFetchAllUserChatsAvailable,
  handleBulkOperationsForChats,
  handleFetchAllUserRoomsAvailable,
  handlePostAddToNotes,
  handlePostRemoveFromNotes,
  handleSendPromptAndGetMessageFromAI,
  handleUpdateUserMessageForRegeneration,
  handleRegenerateAIResponse,
  handleGetAllMessagesOfParticularChat,
} from "./apiExtraReducerHandlers/chatsHandlers";

import {
  handleGetRooms,
  handleCreateRoom,
  handleGetPinnedRooms,
  handleBulkOperations,
  handleGetRoom,
  handleUpdateRoom,
  handleDeleteRoom,
  handlePinRoom,
  handleUnpinRoom,
  handleGetRoomChats,
  handleAddChatsToRoom,
  handleGetAvailableChats,
  handleUndoDeleteRoom,
} from "./apiExtraReducerHandlers/roomsHandlers";

import {
  handleGetNotes,
  handleUpdateNotes,
  handleDeleteNotes,
} from "./apiExtraReducerHandlers/notesHandlers";

import {
  handleAddToRoom,
  handleRemoveFromRoom,
} from "./apiExtraReducerHandlers/chatsHandlers";

import {
  handleUploadAttachment,
  handleDeleteAttachment,
  handleGetAttachment,
} from "./apiExtraReducerHandlers/attachmentsHandlers";

import {
  handleSearch,
  handleGetSearchHistory,
  handleClearSearchHistory,
} from "./apiExtraReducerHandlers/searchHandlers";

// Settings Handlers
export const settingsHandlersFunctions = {
  // get all settings of sections
  getAllGeneralSettings: handleGetAllGeneralSettings,
  getAllPersonalisationsSettings: handleGetAllPersonalisationsSettings,
  getAllProfileInfos: handleGetAllProfileInfos,

  // get master datas
  getAllLLMsAvailable: handleGetAllLLMsAvailable,
  getAllLanguagesAvailable: handleGetAllLanguagesAvailable,
  getAllCountriesAvailable: handleGetAllCountriesAvailable,
  getAllCitiesAvailable: handleGetAllCitiesAvailable,
  getAllGendersAvailable: handleGetAllGendersAvailable,
  getAllUniversitiesAvailable: handleGetAllUniversitiesAvailable,
  getAllDegreeProgramsAvailable: handleGetAllDegreeProgramsAvailable,
  getAllSpecializationsAvailable: handleGetAllSpecializationsAvailable,
  fetchResponseStylesAvailable: handleFetchResponseStylesAvailable,
  fetchCitationFormatsAvailable: handleFetchCitationFormatsAvailable,

  // update or change settings
  updateGeneralSettings: handleUpdateGeneralSettings,
  restoreAllGeneralSettings: handleRestoreAllGeneralSettings,
  updatePersonalizationSettings: handleUpdatePersonalisationsSettings,

  // profile section manage
  updateProfileName: handleUpdateProfileName,
  updateProfileImage: handleUpdateProfileImage,
  updateProfileAvatarImage: handleUpdateProfileAvatarImage,

  // Help Center
  submitHelpCenterFeedback: handleSubmitHelpCenterFeedback,

  // Academic Links
  getAcademicLinks: handleGetAcademicLinks,
  addAcademicLink: handleAddAcademicLink,
  deleteAcademicLink: handleDeleteAcademicLink,

  // Analytics
  getAnalyticsDashboard: handleGetAnalyticsDashboard,
  getAnalyticsTopics: handleGetAnalyticsTopics,
  getAnalyticsSubjects: handleGetAnalyticsSubjects,
};

export const chatsHandlersFunctions = {
  getAllRecentChats: handleGetAllRecentChats,
  getAllDetailsOfChatByID: handleGetAllDetailsOfChatByID,
  //get master datas
  getAllSubjectsForChat: handleGetAllSubjectsForChat,
  getAllTopicsOfSelectedSubjects: handleGetAllTopicsOfSelectedSubjects,

  createChatWithAI: handleCreateChatWithAI,
  sendPromptAndGetMessageFromAI: handleSendPromptAndGetMessageFromAI,
  getAllMessagesOfParticularChat: handleGetAllMessagesOfParticularChat,
  //Chat Notes
  postAddToNotes: handlePostAddToNotes,
  postRemoveFromNotes: handlePostRemoveFromNotes,
  renameAndUpdateChatTitle: handleRenameAndUpdateChatTitle,
  pinOrUnpinChat: handlePinOrUnpinChat,
  archiveOrUnarchiveChat: handleArchiveOrUnarchiveChat,
  deleteChat: handleDeleteChat,
  undoDeleteChat: handleUndoDeleteChat,
  fetchAllUserChatsAvailable: handleFetchAllUserChatsAvailable,
  bulkOperationsForChats: handleBulkOperationsForChats,
  fetchAllUserRoomsAvailable: handleFetchAllUserRoomsAvailable,
  //Message editing and regeneration
  updateUserMessageForRegeneration: handleUpdateUserMessageForRegeneration,
  regenerateAIResponse: handleRegenerateAIResponse,
  //  Room operations
  addToRoom: handleAddToRoom,
  removeFromRoom: handleRemoveFromRoom,
};

// Rooms Handlers
export const roomsHandlersFunctions = {
  "get-rooms": handleGetRooms,
  "create-room": handleCreateRoom,
  "get-pinned-rooms": handleGetPinnedRooms,
  "bulk-operations": handleBulkOperations,
  "get-room": handleGetRoom,
  "update-room": handleUpdateRoom,
  "delete-room": handleDeleteRoom,
  "pin-room": handlePinRoom,
  "unpin-room": handleUnpinRoom,
  "get-room-chats": handleGetRoomChats,
  "add-chats-to-room": handleAddChatsToRoom,
  "get-available-chats": handleGetAvailableChats,
  "undo-delete-room": handleUndoDeleteRoom,
};

// Notes Handlers
export const notesHandlersFunctions = {
  "get-notes": handleGetNotes,
  "update-notes": handleUpdateNotes,
  "delete-notes": handleDeleteNotes,
};

// Attachments Handlers
export const attachmentsHandlersFunctions = {
  "upload-attachment": handleUploadAttachment,
  "delete-attachment": handleDeleteAttachment,
  "get-attachment": handleGetAttachment,
};

// Search Handlers
export const searchHandlersFunctions = {
  "search-global": handleSearch,
  "get-search-history": handleGetSearchHistory,
  "clear-search-history": handleClearSearchHistory,
};
