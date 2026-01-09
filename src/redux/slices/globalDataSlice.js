import { createSlice } from "@reduxjs/toolkit";
import { allInitialStates } from "../allInitialStates";
import { setUser } from "./authSlice";

const globalDataSlice = createSlice({
  name: 'globalDatas',
  initialState:allInitialStates,
  reducers: {
    setSelecetdFiles: (state, action) => {
      state.globalDataStates.selectedFiles = action.payload;
    },
    removeSelectedFile: (state, action) => {
      state.globalDataStates.selectedFiles = state.globalDataStates.selectedFiles.filter(
        (_, index) => index !== action.payload
      );
    },
    setUserMessagePrompt: (state, action) => {
      state.globalDataStates.userMessagePrompt = action.payload;
    },
    setChatInputContentLinesNumber: (state, action) => {
      state.globalDataStates.chatInputContentLinesNumber = action.payload;
    },
    setChatMessagesArray: (state, action) => {
      state.globalDataStates.chatMessagesArray = action.payload;
    },
    setCurrentSelectedTopic: (state, action) => {
      state.globalDataStates.currentSelectedTopic = action.payload;
    },
    setChatTitleOnLongPress: (state, action) => {
      state.globalDataStates.chatTitleOnLongPress = action.payload;
    },
    setUserMessageOnLongPress: (state, action) => {
      state.globalDataStates.userMessageOnLongPress = action.payload;
    },
    setSettingsInnerPageHeaderTitle: (state, action) => {
      state.globalDataStates.settingsInnerPageHeaderTitle = action.payload;
    },
    setSettingsInnerPageComponentToRender: (state, action) => {
      state.globalDataStates.settingsInnerPageComponentToRender = action.payload;
    },
    setCompareResponseStyleItemsArray: (state, action) => {
      state.globalDataStates.compareResponseStyleItemsArray = action.payload;
    },
    setDeleteConfirmPopupFrom: (state, action) => {
      state.globalDataStates.deleteConfirmPopupFrom = action.payload;
    },
    setGuidedTourStepsCount: (state, action) => {
      state.globalDataStates.guidedTourStepsCount = action.payload;
    },
    setProfilePictureAvatar: (state, action) => {
      state.globalDataStates.profilePictureAvatar = action.payload;
    },
    setProfilePictureType: (state, action) => {
      state.globalDataStates.profilePictureType = action.payload;
    },
    setUserMailIDOnSignup: (state, action) => {
      state.globalDataStates.userMailIDOnSignup = action.payload;
    },
    setUserMailIDOnForgotPassword: (state, action) => {
      state.globalDataStates.userMailIDOnForgotPassword = action.payload;
    },
    setUserOTPOnForgotPassword: (state, action) => {
      state.globalDataStates.userOTPOnForgotPassword = action.payload;
    },
    setUserMobileNumberForMobileVerification: (state, action) => {
      state.globalDataStates.userMobileNumberForMobileVerification = action.payload;
    },
    setManualGuidedTourRunning: (state, action) => {
      state.globalDataStates.manualGuidedTourRunning = action.payload;
    },
    setNavigationBasicsGuideTourSteps: (state, action) => {
      state.globalDataStates.navigationBasicsGuideTourSteps = action.payload;
    },
    setChatFunctionsGuideTourSteps: (state, action) => {
      state.globalDataStates.chatFunctionsGuideTourSteps = action.payload;
    },
    setLearningLabsGuideTourSteps: (state, action) => {
      state.globalDataStates.learningLabsGuideTourSteps = action.payload;
    },
    resetAllGuidedTourSteps: (state) => {
      state.globalDataStates.manualGuidedTourRunning = false;
      state.globalDataStates.navigationBasicsGuideTourSteps = 0;
      state.globalDataStates.chatFunctionsGuideTourSteps = 0;
      state.globalDataStates.learningLabsGuideTourSteps = 0;
    },
  },
});

export const {
  setSelecetdFiles,
  removeSelectedFile,
  setUserMessagePrompt,
  setChatInputContentLinesNumber,
  setChatMessagesArray,
  setCurrentSelectedTopic,
  setChatTitleOnLongPress,
  setUserMessageOnLongPress,
  setSettingsInnerPageHeaderTitle,
  setSettingsInnerPageComponentToRender,
  setCompareResponseStyleItemsArray,
  setDeleteConfirmPopupFrom,
  setGuidedTourStepsCount,
  setProfilePictureAvatar,
  setProfilePictureType,
  setUserMailIDOnSignup,
  setUserMailIDOnForgotPassword,
  setUserOTPOnForgotPassword,
  setUserMobileNumberForMobileVerification,
  setManualGuidedTourRunning,
  setNavigationBasicsGuideTourSteps,
  setChatFunctionsGuideTourSteps,
  setLearningLabsGuideTourSteps,
  resetAllGuidedTourSteps,
} = globalDataSlice.actions;

export default globalDataSlice.reducer; 