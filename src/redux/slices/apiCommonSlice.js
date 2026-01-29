import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiInstance, { baseURL } from "../helper";
import { allInitialStates } from "../allInitialStates";
import { addCasePending } from "../addCases/pending";
import { addCaseFulfilled } from "../addCases/fulfilled";
import { addCaseRejected } from "../addCases/rejected";

export const commonFunctionForAPICalls = createAsyncThunk(
  "/common-api-call",
  async ({ method, url, data, params, headers }, { rejectWithValue }) => {
    try {
      let res = await apiInstance({
        method,
        url,
        data,
        params,
        headers,
      });
      return {
        data: res.data,
        status: res.status,
      };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  },
);

const apiCommonSlice = createSlice({
  name: "apiCommonSlice",
  initialState: allInitialStates,
  reducers: {
    setSelectedCountryCode: (state, action) => {
      state.settingsStates.settingsMasterDatas.selectedCountryCode =
        action?.payload;
    },
    setIsCountrySelectionChanged: (state, action) => {
      state.settingsStates.settingsMasterDatas.isCountrySelectionChanged =
        action?.payload;
    },
    setIsAnythingChangedInGeneralSettings: (state, action) => {
      state.settingsStates.allGeneralSettings.isAnythingChangedInGeneralSettings =
        action.payload;
    },
    setIsAnythingChangedInPersonalisationSettings: (state, action) => {
      state.settingsStates.allPersonalisationsSettings.isAnythingChangedInPersonalisationSettings =
        action.payload;
    },
    setIsGeneralSettingsRestored: (state, action) => {
      state.settingsStates.isGeneralSettingsRestored = action.payload;
    },
    setCurrentRoom: (state, action) => {
      state.roomsStates.currentRoom = action.payload;
    },
    setTempRoomProperty: (state, action) => {
      const { key, value } = action.payload;
      state.roomsStates.tempRoomSettings[key] = value;
    },
    resetTempRoomSettings: (state) => {
      state.roomsStates.tempRoomSettings = {
        llm_id: null,
        response_style_id: null,
        response_language_id: null,
        citation_format_id: null,
      };
    },
    resetChatArchiveUnarchiveUpdated: (state) => {
      state.chatsStates.loaderStates.isChatArchiveUnarchiveUpdated = null;
    },
    resetAIResponseRegenerated: (state) => {
      state.chatsStates.loaderStates.isAIResponseRegenerated = null;
    },
    resetVersionSwitched: (state) => {
      state.chatsStates.loaderStates.isVersionSwitched = null;
    },
    resetCompareStates: (state) => {
      // Reset loader states for compare
      state.chatsStates.loaderStates.isFirstCompareResponseLoading = null;
      state.chatsStates.loaderStates.isSecondCompareResponseLoading = null;
      state.chatsStates.loaderStates.isFirstCompareStyleResponseLoading = null;
      state.chatsStates.loaderStates.isSecondCompareStyleResponseLoading = null;
      state.chatsStates.loaderStates.isStoreCompareResponsePending = null;
      state.chatsStates.loaderStates.isStoreCompareStyleResponsePending = null;
      // Reset comparison data
      state.chatsStates.allChatsDatas.firstComparisonResponse = null;
      state.chatsStates.allChatsDatas.secondComparisonResponse = null;
      state.chatsStates.allChatsDatas.firstComparisonStyleResponse = null;
      state.chatsStates.allChatsDatas.secondComparisonStyleResponse = null;
    },
    resetChatDeleted: (state) => {
      state.chatsStates.loaderStates.isChatDeleted = null;
    },
    resetChatDeleteUndone: (state) => {
      state.chatsStates.loaderStates.isChatDeleteUndone = null;
    },
    resetBulkOperationCompleted: (state) => {
      state.chatsStates.loaderStates.isBulkOperationCompleted = null;
    },
    setCurrentActionChatDetails: (state, action) => {
      state.chatsStates.allChatsDatas.currentActionChatDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending API calls
      .addCase(commonFunctionForAPICalls.pending, (state, action) => {
        addCasePending(state, action);
      })
      // Handle fulfilled API calls
      .addCase(commonFunctionForAPICalls.fulfilled, (state, action) => {
        addCaseFulfilled(state, action);
      })
      // Handle rejected API calls
      .addCase(commonFunctionForAPICalls.rejected, (state, action) => {
        addCaseRejected(state, action);
      });
  },
});

export const {
  setIsCountrySelectionChanged,
  setSelectedCountryCode,
  setIsAnythingChangedInGeneralSettings,
  setIsGeneralSettingsRestored,
  setIsAnythingChangedInPersonalisationSettings,
  setCurrentRoom,
  setTempRoomProperty,
  resetTempRoomSettings,
  setIsPersonalInfosFetched,
  resetChatTitleUpdated,
  resetChatPinUnpinUpdated,
  resetChatArchiveUnarchiveUpdated,
  resetChatDeleted,
  resetChatDeleteUndone,
  resetBulkOperationCompleted,
  setCurrentActionChatDetails,
  resetAIResponseRegenerated,
  resetVersionSwitched,
  resetCompareStates,
} = apiCommonSlice.actions;

export default apiCommonSlice.reducer;
