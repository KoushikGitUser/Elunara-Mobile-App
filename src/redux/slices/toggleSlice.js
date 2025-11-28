import { createSlice } from '@reduxjs/toolkit';
import { allInitialStates } from '../allInitialStates';


const toggleSlice = createSlice({
  name: 'toggle',
  initialState:allInitialStates,
  reducers: {
    setToggleChatHistorySidebar: (state, action) => {
      state.toggleStates.toggleChatHistorySidebar = action.payload;
    },
    setToggleIsChattingWithAI: (state, action) => {
      state.toggleStates.toggleIsChattingWithAI = action.payload;
    },
    setToggleChatMenuPopup: (state, action) => {
      state.toggleStates.toggleChatMenuPopup = action.payload;
    },
    setToggleAddItemsToInputPopup: (state, action) => {
      state.toggleStates.toggleAddItemsToInputPopup = action.payload;
    },
    setToggleTopicsPopup: (state, action) => {
      state.toggleStates.toggleTopicsPopup = action.payload;
    },
    setToggleToolsPopup: (state, action) => {
      state.toggleStates.toggleToolsPopup = action.payload;
    },
    setToggleToolsPopupStates: (state, action) => {
      state.toggleStates.toggleToolsPopupStates = action.payload;
    },
    setToggleKeyboardVisibilityOnChatScreen: (state, action) => {
      state.toggleStates.toggleKeyboardVisibilityOnChatScreen = action.payload;
    },
    setToggleIsWaitingForResponse: (state, action) => {
      state.toggleStates.toggleIsWaitingForResponse = action.payload;
    },
    setToggleSubTopics: (state, action) => {
      state.toggleStates.toggleSubTopics = action.payload;
    },
    setToggleDeleteChatConfirmPopup: (state, action) => {
      state.toggleStates.toggleDeleteChatConfirmPopup = action.payload;
    },
    setToggleRenameChatPopup: (state, action) => {
      state.toggleStates.toggleRenameChatPopup = action.payload;
    },
    setToggleUserMessageActionPopup: (state, action) => {
      state.toggleStates.toggleUserMessageActionPopup = action.payload;
    },
    setToggleChatActionsPopupOnLongPress: (state, action) => {
      state.toggleStates.toggleChatActionsPopupOnLongPress = action.payload;
    },
    setToggleAllChatsOptionsPopup: (state, action) => {
      state.toggleStates.toggleAllChatsOptionsPopup = action.payload;
    },
    setToggleUnlockPremiumPopup: (state, action) => {
      state.toggleStates.toggleUnlockPremiumPopup = action.payload;
    },
    setToggleResetSettingsPopup: (state, action) => {
      state.toggleStates.toggleResetSettingsPopup = action.payload;
    },
    setToggleIsPaidOrProUser: (state, action) => {
      state.toggleStates.toggleIsPaidOrProUser = action.payload;
    },
    setToggleRoomCreationPopup: (state, action) => {
      state.toggleStates.toggleRoomCreationPopup = action.payload;
    },
    setToggleAddedRoomDetails: (state, action) => {
      state.toggleStates.toggleAddedRoomDetails = action.payload;
    },
    setToggleIsRoomEmpty: (state, action) => {
      state.toggleStates.toggleIsRoomEmpty = action.payload;
    },
    setToggleLearningLabUnlockPopup: (state, action) => {
      state.toggleStates.toggleLearningLabUnlockPopup = action.payload;
    },
    setToggleProPlanUpgradePopup: (state, action) => {
      state.toggleStates.toggleProPlanUpgradePopup = action.payload;
    },
    setToggleUnlockAnalyticsDashboardPopup: (state, action) => {
      state.toggleStates.toggleUnlockAnalyticsDashboardPopup = action.payload;
    },
    setToggleUnlockMaxUploadLimitPopup: (state, action) => {
      state.toggleStates.toggleUnlockMaxUploadLimitPopup = action.payload;
    },
    setToggleUnlockNewChatPopup: (state, action) => {
      state.toggleStates.toggleUnlockNewChatPopup = action.payload;
    },
    setToggleUnlockArchiveLimitPopup: (state, action) => {
      state.toggleStates.toggleUnlockArchiveLimitPopup = action.payload;
    },
    setToggleAdFreeExpPopup: (state, action) => {
      state.toggleStates.toggleAdFreeExpPopup = action.payload;
    },
    setToggleUnlockPersonalisationLimitPopup: (state, action) => {
      state.toggleStates.toggleUnlockPersonalisationLimitPopup = action.payload;
    },
    setToggleElunaraProWelcomePopup: (state, action) => {
      state.toggleStates.toggleElunaraProWelcomePopup = action.payload;
    },
  },
});

export const {
  setToggleChatHistorySidebar,
  setToggleIsChattingWithAI,
  setToggleChatMenuPopup,
  setToggleAddItemsToInputPopup,
  setToggleTopicsPopup,
  setToggleToolsPopup,
  setToggleToolsPopupStates,
  setToggleKeyboardVisibilityOnChatScreen,
  setToggleIsWaitingForResponse,
  setToggleSubTopics,
  setToggleDeleteChatConfirmPopup,
  setToggleRenameChatPopup,
  setToggleUserMessageActionPopup,
  setToggleChatActionsPopupOnLongPress,
  setToggleAllChatsOptionsPopup,
  setToggleUnlockPremiumPopup,
  setToggleResetSettingsPopup,
  setToggleIsPaidOrProUser,
  setToggleRoomCreationPopup,
  setToggleAddedRoomDetails,
  setToggleIsRoomEmpty,
  setToggleLearningLabUnlockPopup,
  setToggleProPlanUpgradePopup,
  setToggleUnlockAnalyticsDashboardPopup,
  setToggleUnlockMaxUploadLimitPopup,
  setToggleUnlockNewChatPopup,
  setToggleUnlockArchiveLimitPopup,
  setToggleAdFreeExpPopup,
  setToggleUnlockPersonalisationLimitPopup,
  setToggleElunaraProWelcomePopup
} = toggleSlice.actions;

export default toggleSlice.reducer; 