import { triggerToast } from "../../services/toast";

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
  pending: (state) => {},
  fulfilled: (state, action) => {
    state.settingsStates.allPersonalisationsSettings.isAnythingChangedInPersonalisationSettings = true;
    state.settingsStates.fetchingAllGeneralSettings = false;
    // Update state with API response data
    if (action.payload?.data?.data) {
      const data = action.payload.data.data;
      if (data.personal_info) {
        state.settingsStates.allPersonalisationsSettings.personalInfos = data.personal_info;
      }
      if (data.academic_career) {
        state.settingsStates.allPersonalisationsSettings.academicCareer = data.academic_career;
      }
      if (data.learning_devices) {
        state.settingsStates.allPersonalisationsSettings.learningDevices = data.learning_devices;
      }
    }
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
    state.settingsStates.allPersonalisationsSettings.personalInfos =
      action.payload.data.data.personal_info;
    state.settingsStates.allPersonalisationsSettings.academicCareer =
      action.payload.data.data.academic_career;
    state.settingsStates.allPersonalisationsSettings.learningDevices =
      action.payload.data.data.learning_devices;
  },
  rejected: (state, action) => {},
};

export const handleGetAllGendersAvailable = {
  pending: (state) => {},
  fulfilled: (state, action) => {
    state.settingsStates.settingsMasterDatas.allGendersAvailable =
      action.payload.data.data;
  },
  rejected: (state, action) => {},
};

export const handleGetAllUniversitiesAvailable = {
  pending: (state) => {},
  fulfilled: (state, action) => {
    state.settingsStates.settingsMasterDatas.allUniversitiesAvailable =
      action.payload.data.data;
  },
  rejected: (state, action) => {},
};

export const handleGetAllDegreeProgramsAvailable = {
  pending: (state) => {},
  fulfilled: (state, action) => {
    state.settingsStates.settingsMasterDatas.allDegreeProgramsAvailable =
      action.payload.data.data;
  },
  rejected: (state, action) => {},
};

export const handleGetAllSpecializationsAvailable = {
  pending: (state) => {},
  fulfilled: (state, action) => {
    state.settingsStates.settingsMasterDatas.allSpecializationsAvailable =
      action.payload.data.data;
  },
  rejected: (state, action) => {},
};

export const handleFetchResponseStylesAvailable = {
  pending: (state) => {},
  fulfilled: (state, action) => {
    console.log("🎨 HANDLER: Response styles received:", action.payload.data.data);
    state.settingsStates.settingsMasterDatas.allResponseStylesAvailable =
      action.payload.data.data;
  },
  rejected: (state, action) => {
    console.log("🎨 HANDLER: Response styles fetch FAILED:", action.payload);
  },
};

export const handleFetchCitationFormatsAvailable = {
  pending: (state) => {},
  fulfilled: (state, action) => {
    console.log("📚 HANDLER: Citation formats received:", action.payload.data.data);
    state.settingsStates.settingsMasterDatas.allCitationFormatsAvailable =
      action.payload.data.data;
  },
  rejected: (state, action) => {
    console.log("📚 HANDLER: Citation formats fetch FAILED:", action.payload);
  },
};

export const handleGetAllProfileInfos = {
  pending: (state) => {
    state.settingsStates.allPersonalisationsSettings.isPersonalInfosFetched = false;
  },
  fulfilled: (state, action) => {
    state.settingsStates.allProfileInfos = action.payload.data.data;
    state.settingsStates.allPersonalisationsSettings.isPersonalInfosFetched = true;
  },
  rejected: (state, action) => {
    state.settingsStates.allPersonalisationsSettings.isPersonalInfosFetched = false;
  },
};

export const handleUpdateProfileName = {
  pending: (state) => {},
  fulfilled: (state, action) => {
    state.settingsStates.allProfileInfos.first_name =
      action.payload.data.data.first_name;
    state.settingsStates.allProfileInfos.last_name =
      action.payload.data.data.last_name;
    triggerToast(
      "Profile Updated",
      "Your name has been updated successfully",
      "success",
      3000,
    );
  },
  rejected: (state, action) => {},
};

export const handleUpdateProfileImage = {
  pending: (state) => {
    state.settingsStates.uploadingProfileImage = true;
  },
  fulfilled: (state, action) => {
    state.settingsStates.uploadingProfileImage = false;
    state.settingsStates.allProfileInfos.profile_image =
      action.payload.data.data.profile_image;
  },
  rejected: (state, action) => {
    state.settingsStates.uploadingProfileImage = false;
  },
};

export const handleUpdateProfileAvatarImage = {
  pending: (state) => {},
  fulfilled: (state, action) => {
    state.settingsStates.allProfileInfos.profile_image =
      action.payload.data.data.profile_image;
  },
  rejected: (state, action) => {},
};

// Help Center Feedback
export const handleSubmitHelpCenterFeedback = {
  pending: (state) => {
    state.settingsStates.isSubmittingFeedback = true;
  },
  fulfilled: (state, action) => {
    state.settingsStates.isSubmittingFeedback = false;
    state.settingsStates.feedbackSubmitted = true;
    triggerToast(
      "Submitted",
      "Your feedback submitted successfully",
      "success",
      3000,
    );
  },
  rejected: (state, action) => {
    state.settingsStates.isSubmittingFeedback = false;
    state.settingsStates.feedbackSubmitted = false;
    triggerToast(
      "Error",
      action.payload?.message || "Failed to submit feedback",
      "error",
      3000,
    );
  },
};

// Academic Links - GET
export const handleGetAcademicLinks = {
  pending: (state) => {
    state.settingsStates.fetchingAcademicLinks = true;
  },
  fulfilled: (state, action) => {
    state.settingsStates.fetchingAcademicLinks = false;
    state.settingsStates.academicLinks = {
      defaultLinks: action.payload?.data?.data?.default_links || [],
      userLinks: action.payload?.data?.data?.user_links || [],
    };
  },
  rejected: (state, action) => {
    state.settingsStates.fetchingAcademicLinks = false;
  },
};

// Academic Links - POST (Add)
export const handleAddAcademicLink = {
  pending: (state) => {
    state.settingsStates.addingAcademicLink = true;
  },
  fulfilled: (state, action) => {
    state.settingsStates.addingAcademicLink = false;
    state.settingsStates.academicLinkAdded = true;
    triggerToast(
      "Link Added",
      "Link has been added successfully",
      "success",
      3000,
    );
  },
  rejected: (state, action) => {
    state.settingsStates.addingAcademicLink = false;
    state.settingsStates.academicLinkAdded = false;
    triggerToast(
      "Error",
      action.payload?.message || "Failed to add link",
      "error",
      3000,
    );
  },
};

// Academic Links - DELETE
export const handleDeleteAcademicLink = {
  pending: (state) => {
    state.settingsStates.deletingAcademicLink = true;
  },
  fulfilled: (state, action) => {
    state.settingsStates.deletingAcademicLink = false;
    state.settingsStates.academicLinkDeleted = true;
    triggerToast(
      "Link Deleted",
      "Link has been deleted successfully",
      "success",
      3000,
    );
  },
  rejected: (state, action) => {
    state.settingsStates.deletingAcademicLink = false;
    state.settingsStates.academicLinkDeleted = false;
    triggerToast(
      "Error",
      action.payload?.message || "Failed to delete link",
      "error",
      3000,
    );
  },
};

// Analytics Dashboard
export const handleGetAnalyticsDashboard = {
  pending: (state) => {
    state.settingsStates.fetchingAnalyticsDashboard = true;
  },
  fulfilled: (state, action) => {
    state.settingsStates.fetchingAnalyticsDashboard = false;
    state.settingsStates.analyticsDashboard = action.payload?.data?.data || {};
  },
  rejected: (state, action) => {
    state.settingsStates.fetchingAnalyticsDashboard = false;
  },
};

// Analytics Topics
export const handleGetAnalyticsTopics = {
  pending: (state) => {
    state.settingsStates.fetchingAnalyticsTopics = true;
  },
  fulfilled: (state, action) => {
    state.settingsStates.fetchingAnalyticsTopics = false;
    state.settingsStates.analyticsTopics = action.payload?.data?.data || [];
  },
  rejected: (state, action) => {
    state.settingsStates.fetchingAnalyticsTopics = false;
  },
};

// Analytics Subjects
export const handleGetAnalyticsSubjects = {
  pending: (state) => {
    state.settingsStates.fetchingAnalyticsSubjects = true;
  },
  fulfilled: (state, action) => {
    state.settingsStates.fetchingAnalyticsSubjects = false;
    state.settingsStates.analyticsSubjects = action.payload?.data?.data || [];
  },
  rejected: (state, action) => {
    state.settingsStates.fetchingAnalyticsSubjects = false;
  },
};
