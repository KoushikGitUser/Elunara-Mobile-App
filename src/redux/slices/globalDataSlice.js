import { createSlice } from "@reduxjs/toolkit";
import { allInitialStates } from "../allInitialStates";
import { setUser } from "./authSlice";
import { resetAllStates } from "../actions/resetActions";

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
    setUploadedAttachmentIds: (state, action) => {
      state.globalDataStates.uploadedAttachmentIds = action.payload;
    },
    addUploadedAttachmentId: (state, action) => {
      console.log("🔴 REDUX: Adding attachment ID:", action.payload);
      console.log("🔴 REDUX: Current IDs before add:", state.globalDataStates.uploadedAttachmentIds);
      state.globalDataStates.uploadedAttachmentIds.push(action.payload);
      console.log("🔴 REDUX: IDs after add:", state.globalDataStates.uploadedAttachmentIds);
    },
    removeUploadedAttachmentId: (state, action) => {
      state.globalDataStates.uploadedAttachmentIds = state.globalDataStates.uploadedAttachmentIds.filter(
        (id) => id !== action.payload
      );
    },
    clearUploadedAttachmentIds: (state) => {
      console.log("🔴 REDUX: Clearing attachment IDs. Current:", state.globalDataStates.uploadedAttachmentIds);
      state.globalDataStates.uploadedAttachmentIds = [];
    },
    setIsUploadingAttachment: (state, action) => {
      state.globalDataStates.isUploadingAttachment = action.payload;
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
    setMessageIDsArray: (state, action) => {
      state.globalDataStates.messageIDsArray = action.payload;
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
    setEditingMessageData: (state, action) => {
      state.globalDataStates.editingMessageData = action.payload;
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
    setSelectedSubjectID: (state, action) => {
      state.globalDataStates.selectedSubjectID = action.payload;
    },
    setSelectedTopicsID: (state, action) => {
      state.globalDataStates.selectedTopicsID = action.payload;
    },
    setCurrentAIMessageIndexForRegeneration: (state, action) => {
      state.globalDataStates.currentAIMessageIndexForRegeneration = action.payload;
    },
    navigateToNextVersion: (state, action) => {
      const messageIndex = action.payload;
      const message = state.globalDataStates.chatMessagesArray[messageIndex];
      if (message && message.versions && message.currentVersionIndex < message.versions.length - 1) {
        message.currentVersionIndex += 1;
        const newVersion = message.versions[message.currentVersionIndex];
        message.message = newVersion.content;
        message.uuid = newVersion.uuid;
        message.version = newVersion.version;
        message.total_versions = newVersion.total_versions;
      }
    },
    navigateToPreviousVersion: (state, action) => {
      const messageIndex = action.payload;
      const message = state.globalDataStates.chatMessagesArray[messageIndex];
      if (message && message.versions && message.currentVersionIndex > 0) {
        message.currentVersionIndex -= 1;
        const newVersion = message.versions[message.currentVersionIndex];
        message.message = newVersion.content;
        message.uuid = newVersion.uuid;
        message.version = newVersion.version;
        message.total_versions = newVersion.total_versions;
      }
    },
    resetAllGuidedTourSteps: (state) => {
      state.globalDataStates.manualGuidedTourRunning = false;
      state.globalDataStates.navigationBasicsGuideTourSteps = 0;
      state.globalDataStates.chatFunctionsGuideTourSteps = 0;
      state.globalDataStates.learningLabsGuideTourSteps = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAllStates, () => {
      return allInitialStates;
    });
  },
});

export const {
  setSelecetdFiles,
  removeSelectedFile,
  setUploadedAttachmentIds,
  addUploadedAttachmentId,
  removeUploadedAttachmentId,
  clearUploadedAttachmentIds,
  setIsUploadingAttachment,
  setUserMessagePrompt,
  setChatInputContentLinesNumber,
  setChatMessagesArray,
  setMessageIDsArray,
  setCurrentSelectedTopic,
  setChatTitleOnLongPress,
  setUserMessageOnLongPress,
  setEditingMessageData,
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
  setSelectedSubjectID,
  setSelectedTopicsID,
  setCurrentAIMessageIndexForRegeneration,
  navigateToNextVersion,
  navigateToPreviousVersion,
} = globalDataSlice.actions;

export default globalDataSlice.reducer; 