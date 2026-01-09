export const settingsStates = {
  fetchingAllGeneralSettings: false,
  allGeneralSettings: {
    notificationsSettings: {},
    preferredLLMs: {},
    responseLanguageSettings: {},
    regionSettings: {},
    adSettings: {},
    isAnythingChangedInGeneralSettings: false,
  },
  isGeneralSettingsRestored: null,
  settingsMasterDatas: {
    allLLMsAvailable: [],
    allLanguagesAvailable: [],
    allCountriesAvailable: [],
    allCitiesAvailable: [],
    allGendersAvailable: [],
    allUniversitiesAvailable: [],
    allDegreeProgramsAvailable: [],
    allSpecializationsAvailable: [],
    selectedCountryCode: null,
    isCountrySelectionChanged: false,
  },
  allPersonalisationsSettings: {
    personalInfos: {},
    academicCareer: {},
    learningDevices: {},
    isAnythingChangedInPersonalisationSettings: false,
  },
  allProfileInfos: {},

  // Help Center Feedback
  isSubmittingFeedback: false,
  feedbackSubmitted: false,

  // Academic Links
  fetchingAcademicLinks: false,
  academicLinks: {
    defaultLinks: [],
    userLinks: [],
  },
  addingAcademicLink: false,
  academicLinkAdded: false,
  deletingAcademicLink: false,
  academicLinkDeleted: false,

  // Analytics
  fetchingAnalyticsDashboard: false,
  analyticsDashboard: {},
  fetchingAnalyticsTopics: false,
  analyticsTopics: [],
  fetchingAnalyticsSubjects: false,
  analyticsSubjects: [],
};
