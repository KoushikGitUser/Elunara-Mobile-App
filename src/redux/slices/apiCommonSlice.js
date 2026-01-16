import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiInstance from "../helper";
import { allInitialStates } from "../allInitialStates";
import { addCasePending } from "../addCases/pending";
import { addCaseFulfilled } from "../addCases/fulfilled";
import { addCaseRejected } from "../addCases/rejected";
import { resetAllStates } from "../actions/resetActions";

export const commonFunctionForAPICalls = createAsyncThunk(
  "/common-api-call",
  async ({ method, url, data, params }, { rejectWithValue }) => {
    try {
      let res = await apiInstance({
        method,
        url,
        data,
        params,
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
  }
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
    setIsAnythingChangedInGeneralSettings:(state,action)=>{
      state.settingsStates.allGeneralSettings.isAnythingChangedInGeneralSettings = action.payload;
    },
    setIsAnythingChangedInPersonalisationSettings:(state,action)=>{
      state.settingsStates.allPersonalisationsSettings.isAnythingChangedInPersonalisationSettings = action.payload;
    },
    setIsGeneralSettingsRestored:(state,action)=>{
      state.settingsStates.isGeneralSettingsRestored = action.payload;
    },
    setIsPersonalInfosFetched:(state,action)=>{
      state.settingsStates.allPersonalisationsSettings.isPersonalInfosFetched = action.payload;
    },
    resetChatTitleUpdated:(state)=>{
      state.chatsStates.loaderStates.isChatTitleUpdated = null;
    },
    resetChatPinUnpinUpdated:(state)=>{
      state.chatsStates.loaderStates.isChatPinUnpinUpdated = null;
    },
    resetChatArchiveUnarchiveUpdated:(state)=>{
      state.chatsStates.loaderStates.isChatArchiveUnarchiveUpdated = null;
    },
    resetChatDeleted:(state)=>{
      state.chatsStates.loaderStates.isChatDeleted = null;
    },
    resetChatDeleteUndone:(state)=>{
      state.chatsStates.loaderStates.isChatDeleteUndone = null;
    },
    resetBulkOperationCompleted:(state)=>{
      state.chatsStates.loaderStates.isBulkOperationCompleted = null;
    },
    setCurrentActionChatDetails:(state,action)=>{
      state.chatsStates.allChatsDatas.currentActionChatDetails = action.payload;
    }
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
      })
      // Handle reset all states
      .addCase(resetAllStates, () => {
        return allInitialStates;
      });
  },
});

export const { setIsCountrySelectionChanged, setSelectedCountryCode,setIsAnythingChangedInGeneralSettings,setIsGeneralSettingsRestored,setIsAnythingChangedInPersonalisationSettings,setIsPersonalInfosFetched,resetChatTitleUpdated,resetChatPinUnpinUpdated,resetChatArchiveUnarchiveUpdated,resetChatDeleted,resetChatDeleteUndone,resetBulkOperationCompleted,setCurrentActionChatDetails} =
  apiCommonSlice.actions;

export default apiCommonSlice.reducer;
