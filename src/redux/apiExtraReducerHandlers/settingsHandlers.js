export const handleGetAllGeneralSettings = {
  pending: (state) => {
    state.settingsStates.fetchingAllGeneralSettings = true;
  },
  fulfilled: (state, action) => {
    state.settingsStates.allGeneralSettings.notificationsSettings =
      action?.payload.data.data.notification_settings;
    state.settingsStates.allGeneralSettings.preferredLLMs =
      action?.payload.data.data.llm_preferences;
    state.settingsStates.allGeneralSettings.responseLanguageSettings =
      action?.payload.data.data.language_preferences;
    state.settingsStates.allGeneralSettings.regionSettings =
      action?.payload.data.data.region_settings;
    state.settingsStates.allGeneralSettings.adSettings =
      action?.payload.data.data.ad_settings;
    state.settingsStates.fetchingAllGeneralSettings = false;
  },
  rejected: (state, action) => {
    state.settingsStates.fetchingAllGeneralSettings = false;
  },
};

export const handleGetAllLLMsAvailable = {
  pending: (state) => {
    state.settingsStates.fetchingAllGeneralSettings = true;
  },
  fulfilled: (state, action) => {
    state.settingsStates.settingsMasterDatas.allLLMsAvailable =
      action?.payload.data.data;
    state.settingsStates.fetchingAllGeneralSettings = false;
  },
  rejected: (state, action) => {
    state.settingsStates.fetchingAllGeneralSettings = false;
  },
};

export const handleGetAllLanguagesAvailable = {
  pending: (state) => {
    state.settingsStates.fetchingAllGeneralSettings = true;
  },
  fulfilled: (state, action) => {
    state.settingsStates.settingsMasterDatas.allLanguagesAvailable =
      action?.payload.data.data;
    state.settingsStates.fetchingAllGeneralSettings = false;
  },
  rejected: (state, action) => {
    state.settingsStates.fetchingAllGeneralSettings = false;
  },
};

export const handleGetAllCountriesAvailable = {
  pending: (state) => {
    state.settingsStates.fetchingAllGeneralSettings = true;
  },
  fulfilled: (state, action) => {
    state.settingsStates.settingsMasterDatas.allCountriesAvailable =
      action?.payload.data.data;
    state.settingsStates.fetchingAllGeneralSettings = false;
  },
  rejected: (state, action) => {
    state.settingsStates.fetchingAllGeneralSettings = false;
  },
};

export const handleGetAllCitiesAvailable = {
  pending: (state) => {
    state.settingsStates.fetchingAllGeneralSettings = true;
  },
  fulfilled: (state, action) => {
    state.settingsStates.settingsMasterDatas.allCitiesAvailable =
      action?.payload.data.data;
    state.settingsStates.fetchingAllGeneralSettings = false;
  },
  rejected: (state, action) => {
    state.settingsStates.fetchingAllGeneralSettings = false;
  },
};

export const handleUpdateGeneralSettings = {
  pending: (state) => {
    state.settingsStates.fetchingAllGeneralSettings = true;
  },
  fulfilled: (state, action) => {
    state.settingsStates.allGeneralSettings.isAnythingChangedInGeneralSettings = true;
    state.settingsStates.fetchingAllGeneralSettings = false;
  },
  rejected: (state, action) => {
    state.settingsStates.fetchingAllGeneralSettings = false;
  },
};


export const handleUpdatePersonalisationsSettings = {
  pending: (state) => {
  },
  fulfilled: (state, action) => {
    state.settingsStates.allPersonalisationsSettings.isAnythingChangedInPersonalisationSettings = true;
    state.settingsStates.fetchingAllGeneralSettings = false;
  },
  rejected: (state, action) => {
    state.settingsStates.fetchingAllGeneralSettings = false;
  },
};

export const handleRestoreAllGeneralSettings = {
  pending: (state) => {
    state.settingsStates.fetchingAllGeneralSettings = true;
    state.settingsStates.isGeneralSettingsRestored = "pending";
  },
  fulfilled: (state, action) => {
    state.settingsStates.isGeneralSettingsRestored = true;
    state.settingsStates.fetchingAllGeneralSettings = false;
  },
  rejected: (state, action) => {
    state.settingsStates.fetchingAllGeneralSettings = false;
    state.settingsStates.isGeneralSettingsRestored = false;
  },
};

export const handleGetAllPersonalisationsSettings = {
  pending: (state) => {
    state.settingsStates.isGeneralSettingsRestored = "pending";
  },
  fulfilled: (state, action) => {
    state.settingsStates.allPersonalisationsSettings.personalInfos = action.payload.data.data.personal_info;
    state.settingsStates.allPersonalisationsSettings.academicCareer = action.payload.data.data.academic_career;
    state.settingsStates.allPersonalisationsSettings.learningDevices = action.payload.data.data.learning_devices;
  },
  rejected: (state, action) => {
  },
};



export const handleGetAllGendersAvailable = {
  pending: (state) => {
  },
  fulfilled: (state, action) => {
    state.settingsStates.settingsMasterDatas.allGendersAvailable = action.payload.data.data;
  },
  rejected: (state, action) => {
  },
};

export const handleGetAllUniversitiesAvailable = {
  pending: (state) => {
  },
  fulfilled: (state, action) => {
    state.settingsStates.settingsMasterDatas.allUniversitiesAvailable = action.payload.data.data;
  },
  rejected: (state, action) => {
  },
};

export const handleGetAllDegreeProgramsAvailable = {
  pending: (state) => {
  },
  fulfilled: (state, action) => {
    state.settingsStates.settingsMasterDatas.allDegreeProgramsAvailable = action.payload.data.data;
  },
  rejected: (state, action) => {
  },
};

export const handleGetAllSpecializationsAvailable = {
  pending: (state) => {
  },
  fulfilled: (state, action) => {
    state.settingsStates.settingsMasterDatas.allSpecializationsAvailable = action.payload.data.data;
  },
  rejected: (state, action) => {
  },
};

export const handleGetAllProfileInfos = {
  pending: (state) => {
  },
  fulfilled: (state, action) => {
    state.settingsStates.allProfileInfos = action.payload.data.data;
  },
  rejected: (state, action) => {
  },
};
