import { handleCreateChatWithAI, handleGetAllDetailsOfChatByID, handleGetAllRecentChats, handleGetAllSubjectsForChat, handleGetAllTopicsOfSelectedSubjects, handleRenameAndUpdateChatTitle, handlePinOrUnpinChat, handleArchiveOrUnarchiveChat, handleDeleteChat, handleUndoDeleteChat, handleFetchAllUserChatsAvailable, handleBulkOperationsForChats, handleFetchAllUserRoomsAvailable } from "./apiExtraReducerHandlers/chatsHandlers";
import { handleGetAllCitiesAvailable, handleGetAllCountriesAvailable, handleGetAllGendersAvailable, handleGetAllUniversitiesAvailable, handleGetAllDegreeProgramsAvailable, handleGetAllSpecializationsAvailable, handleGetAllGeneralSettings, handleGetAllLanguagesAvailable, handleGetAllLLMsAvailable, handleGetAllPersonalisationsSettings, handleRestoreAllGeneralSettings, handleUpdateGeneralSettings, handleUpdatePersonalisationsSettings, handleGetAllProfileInfos, handleUpdateProfileName, handleUpdateProfileImage, handleUpdateProfileAvatarImage, handleFetchResponseStylesAvailable, handleFetchCitationFormatsAvailable } from "./apiExtraReducerHandlers/settingsHandlers";

export const settingsHandlersFunctions = {
  // get all settings of sections
  getAllGeneralSettings:handleGetAllGeneralSettings,
  getAllPersonalisationsSettings:handleGetAllPersonalisationsSettings,
  getAllProfileInfos:handleGetAllProfileInfos,
  // get master datas
  getAllLLMsAvailable:handleGetAllLLMsAvailable,
  getAllLanguagesAvailable:handleGetAllLanguagesAvailable,
  getAllCountriesAvailable:handleGetAllCountriesAvailable,
  getAllCitiesAvailable:handleGetAllCitiesAvailable,
  getAllGendersAvailable:handleGetAllGendersAvailable,
  getAllUniversitiesAvailable:handleGetAllUniversitiesAvailable,
  getAllDegreeProgramsAvailable:handleGetAllDegreeProgramsAvailable,
  getAllSpecializationsAvailable:handleGetAllSpecializationsAvailable,
  fetchResponseStylesAvailable:handleFetchResponseStylesAvailable,
  fetchCitationFormatsAvailable:handleFetchCitationFormatsAvailable,
  // update or change settings
  updateGeneralSettings:handleUpdateGeneralSettings,
  restoreAllGeneralSettings:handleRestoreAllGeneralSettings,
  updatePersonalizationSettings:handleUpdatePersonalisationsSettings,
  // profile section manage
  updateProfileName: handleUpdateProfileName,
  updateProfileImage: handleUpdateProfileImage,
  updateProfileAvatarImage: handleUpdateProfileAvatarImage,
}


export const chatsHandlersFunctions = {
  getAllRecentChats:handleGetAllRecentChats,
  getAllDetailsOfChatByID:handleGetAllDetailsOfChatByID,
  //get master datas
  getAllSubjectsForChat:handleGetAllSubjectsForChat,
  getAllTopicsOfSelectedSubjects:handleGetAllTopicsOfSelectedSubjects,

  createChatWithAI:handleCreateChatWithAI,
  renameAndUpdateChatTitle:handleRenameAndUpdateChatTitle,
  pinOrUnpinChat:handlePinOrUnpinChat,
  archiveOrUnarchiveChat:handleArchiveOrUnarchiveChat,
  deleteChat:handleDeleteChat,
  undoDeleteChat:handleUndoDeleteChat,
  fetchAllUserChatsAvailable:handleFetchAllUserChatsAvailable,
  bulkOperationsForChats:handleBulkOperationsForChats,
  fetchAllUserRoomsAvailable:handleFetchAllUserRoomsAvailable
}

