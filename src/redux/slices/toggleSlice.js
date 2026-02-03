import { createSlice } from '@reduxjs/toolkit';
import { allInitialStates } from '../allInitialStates';
import { resetAllStates } from '../actions/resetActions';


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
    setToggleArchiveChatConfirmPopup: (state, action) => {
      state.toggleStates.toggleArchiveChatConfirmPopup = action.payload;
    },
    setToggleDeleteChatPopup: (state, action) => {
      state.toggleStates.toggleDeleteChatPopup = action.payload;
    },
    setToggleArchiveChatPopup: (state, action) => {
      state.toggleStates.toggleArchiveChatPopup = action.payload;
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
    setToggleAllRoomsOptionsPopup: (state, action) => {
      state.toggleStates.toggleAllRoomsOptionsPopup = action.payload;
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
    setToggleChatScreenGuideStart: (state, action) => {
      state.toggleStates.toggleChatScreenGuideStart = action.payload;
    },
    setToggleChangeResponseLLMWhileChatPopup: (state, action) => {
      state.toggleStates.toggleChangeResponseLLMWhileChatPopup = action.payload;
    },
    setToggleChangeLangWhileChatPopup: (state, action) => {
      state.toggleStates.toggleChangeLangWhileChatPopup = action.payload;
    },
    setToggleChangeResponseStyleWhileChatPopup: (state, action) => {
      state.toggleStates.toggleChangeResponseStyleWhileChatPopup = action.payload;
    },
    setToggleCompareStyleState: (state, action) => {
      state.toggleStates.toggleCompareStyleState = action.payload;
    },
    setToggleNotHelpfulFeedbackPopup: (state, action) => {
      state.toggleStates.toggleNotHelpfulFeedbackPopup = action.payload;
    },
    setToggleAddExistingChatToRoomPopup: (state, action) => {
      state.toggleStates.toggleAddExistingChatToRoomPopup = action.payload;
    },
    setToggleAddChatToLearningLabPopup: (state, action) => {
      state.toggleStates.toggleAddChatToLearningLabPopup = action.payload;
    },
    setToggleAddLinkPopup: (state, action) => {
      state.toggleStates.toggleAddLinkPopup = action.payload;
    },
    setToggleUpdateProfilePicPopup: (state, action) => {
      state.toggleStates.toggleUpdateProfilePicPopup = action.payload;
    },
    setIsEditingUserMessage: (state, action) => {
      state.toggleStates.isEditingUserMessage = action.payload;
    },
    // Chat Customisation Actions
    setSelectedLLM: (state, action) => {
      state.chatCustomisationStates.selectedLLM = action.payload;
    },
    setSelectedResponseStyle: (state, action) => {
      state.chatCustomisationStates.selectedResponseStyle = action.payload;
    },
    setSelectedLanguage: (state, action) => {
      state.chatCustomisationStates.selectedLanguage = action.payload;
    },
    setSelectedCitationFormat: (state, action) => {
      state.chatCustomisationStates.selectedCitationFormat = action.payload;
    },
    // Room Tools Popup Actions
    setToggleRoomToolsPopup: (state, action) => {
      state.toggleStates.toggleRoomToolsPopup = action.payload;
    },
    setToggleRoomToolsPopupStates: (state, action) => {
      state.toggleStates.toggleRoomToolsPopupStates = action.payload;
    },
    // Room Customisation Actions
    setSelectedRoomLLM: (state, action) => {
      state.roomCustomisationStates.selectedRoomLLM = action.payload;
    },
    setSelectedRoomResponseStyle: (state, action) => {
      state.roomCustomisationStates.selectedRoomResponseStyle = action.payload;
    },
    setSelectedRoomLanguage: (state, action) => {
      state.roomCustomisationStates.selectedRoomLanguage = action.payload;
    },
    setSelectedRoomCitationFormat: (state, action) => {
      state.roomCustomisationStates.selectedRoomCitationFormat = action.payload;
    },
    // Initialize room customisation from room details
    initializeRoomCustomisation: (state, action) => {
      const { llm, response_style, response_language, citation_format } = action.payload;
      if (llm) {
        state.roomCustomisationStates.selectedRoomLLM = {
          id: llm.id,
          name: llm.name || "Auto",
        };
      } else {
        state.roomCustomisationStates.selectedRoomLLM = { id: null, name: "Auto" };
      }
      if (response_style) {
        state.roomCustomisationStates.selectedRoomResponseStyle = {
          id: response_style.id,
          name: response_style.name || "Auto",
        };
      } else {
        state.roomCustomisationStates.selectedRoomResponseStyle = { id: null, name: "Auto" };
      }
      if (response_language) {
        state.roomCustomisationStates.selectedRoomLanguage = {
          id: response_language.id,
          name: response_language.name || "English",
        };
      } else {
        state.roomCustomisationStates.selectedRoomLanguage = { id: null, name: "English" };
      }
      if (citation_format) {
        state.roomCustomisationStates.selectedRoomCitationFormat = {
          id: citation_format.id,
          name: citation_format.name || "Harvard",
        };
      } else {
        state.roomCustomisationStates.selectedRoomCitationFormat = { id: null, name: "Harvard" };
      }
    },
    // Reset room customisation to defaults
    resetRoomCustomisation: (state) => {
      state.roomCustomisationStates.selectedRoomLLM = { id: null, name: "Auto" };
      state.roomCustomisationStates.selectedRoomResponseStyle = { id: null, name: "Auto" };
      state.roomCustomisationStates.selectedRoomLanguage = { id: null, name: "English" };
      state.roomCustomisationStates.selectedRoomCitationFormat = { id: null, name: "Harvard" };
    },
    // Room Chats Options Popup
    setToggleRoomChatsOptionsPopup: (state, action) => {
      state.toggleStates.toggleRoomChatsOptionsPopup = action.payload;
    },
    // Remove from Room Confirmation Popup
    setToggleRemoveFromRoomConfirmPopup: (state, action) => {
      state.toggleStates.toggleRemoveFromRoomConfirmPopup = action.payload;
    },
    // Bulk Remove from Room Confirmation Popup
    setToggleBulkRemoveFromRoomConfirmPopup: (state, action) => {
      state.toggleStates.toggleBulkRemoveFromRoomConfirmPopup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAllStates, () => {
      return allInitialStates;
    });
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
  setToggleArchiveChatConfirmPopup,
  setToggleDeleteChatPopup,
  setToggleArchiveChatPopup,
  setToggleRenameChatPopup,
  setToggleUserMessageActionPopup,
  setToggleChatActionsPopupOnLongPress,
  setToggleAllChatsOptionsPopup,
  setToggleAllRoomsOptionsPopup,
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
  setToggleElunaraProWelcomePopup,
  setToggleChatScreenGuideStart,
  setToggleChangeResponseLLMWhileChatPopup,
  setToggleChangeLangWhileChatPopup,
  setToggleChangeResponseStyleWhileChatPopup,
  setToggleCompareStyleState,
  setToggleNotHelpfulFeedbackPopup,
  setToggleAddExistingChatToRoomPopup,
  setToggleAddChatToLearningLabPopup,
  setToggleAddLinkPopup,
  setToggleUpdateProfilePicPopup,
  setIsEditingUserMessage,
  setSelectedLLM,
  setSelectedResponseStyle,
  setSelectedLanguage,
  setSelectedCitationFormat,
  // Room Tools Exports
  setToggleRoomToolsPopup,
  setToggleRoomToolsPopupStates,
  setSelectedRoomLLM,
  setSelectedRoomResponseStyle,
  setSelectedRoomLanguage,
  setSelectedRoomCitationFormat,
  initializeRoomCustomisation,
  resetRoomCustomisation,
  // Room Chats Options Popup
  setToggleRoomChatsOptionsPopup,
  // Remove from Room Confirmation Popup
  setToggleRemoveFromRoomConfirmPopup,
  // Bulk Remove from Room Confirmation Popup
  setToggleBulkRemoveFromRoomConfirmPopup
} = toggleSlice.actions;

export default toggleSlice.reducer; 