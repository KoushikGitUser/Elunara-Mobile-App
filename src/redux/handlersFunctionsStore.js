import { handleCreateChatWithAI, handleGetAllDetailsOfChatByID, handleGetAllRecentChats, handleGetAllSubjectsForChat, handleGetAllTopicsOfSelectedSubjects } from "./apiExtraReducerHandlers/chatsHandlers";
import { handleGetAllCitiesAvailable, handleGetAllCountriesAvailable, handleGetAllGendersAvailable, handleGetAllUniversitiesAvailable, handleGetAllDegreeProgramsAvailable, handleGetAllSpecializationsAvailable, handleGetAllGeneralSettings, handleGetAllLanguagesAvailable, handleGetAllLLMsAvailable, handleGetAllPersonalisationsSettings, handleRestoreAllGeneralSettings, handleUpdateGeneralSettings, handleUpdatePersonalisationsSettings, handleGetAllProfileInfos, handleUpdateProfileName, handleUpdateProfileImage, handleUpdateProfileAvatarImage } from "./apiExtraReducerHandlers/settingsHandlers";

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
}