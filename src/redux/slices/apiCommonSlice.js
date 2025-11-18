import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";         
import apiInstance from "../helper";
import { allInitialStates } from "../allInitialStates";
import { addCasePending } from "../addCases/pending";
import { addCaseFulfilled } from "../addCases/fulfilled";
import { addCaseRejected } from "../addCases/rejected";

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

export default apiCommonSlice.reducer;
