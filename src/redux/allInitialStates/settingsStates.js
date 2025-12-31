export const settingsStates = {
  fetchingAllGeneralSettings: false,
  allGeneralSettings: {
    notificationsSettings: {},
    preferredLLMs: {},
    responseLanguageSettings: {},
    regionSettings: {},
    adSettings: {},
    isAnythingChangedInGeneralSettings:false,
  },
  isGeneralSettingsRestored:null,
  settingsMasterDatas: {
    allLLMsAvailable: [],
    allLanguagesAvailable: [],
    allCountriesAvailable: [],
    allCitiesAvailable: [],
    selectedCountryCode: null,
    isCountrySelectionChanged: false,
  },
};
