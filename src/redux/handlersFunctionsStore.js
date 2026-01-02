import { handleGetAllCitiesAvailable, handleGetAllCountriesAvailable, handleGetAllGendersAvailable, handleGetAllUniversitiesAvailable, handleGetAllDegreeProgramsAvailable, handleGetAllSpecializationsAvailable, handleGetAllGeneralSettings, handleGetAllLanguagesAvailable, handleGetAllLLMsAvailable, handleGetAllPersonalisationsSettings, handleRestoreAllGeneralSettings, handleUpdateGeneralSettings, handleUpdatePersonalisationsSettings, handleGetAllProfileInfos } from "./apiExtraReducerHandlers/settingsHandlers";

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

}