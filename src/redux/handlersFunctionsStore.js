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
} from "./apiExtraReducerHandlers/settingsHandlers";

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
