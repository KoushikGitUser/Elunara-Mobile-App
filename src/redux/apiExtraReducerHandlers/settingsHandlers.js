export const handleGetAllGeneralSettings = {
  pending: (state) => {
    state.settingsStates.fetchingAllGeneralSettings = true;
    console.log("Pending");
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
      console.log(action?.payload.data.data.ad_settings,"settings");
    state.settingsStates.fetchingAllGeneralSettings = false; 
  },
  rejected: (state, action) => {
    state.settingsStates.fetchingAllGeneralSettings = false;
    console.log(action?.payload.data.message);
  },
};
