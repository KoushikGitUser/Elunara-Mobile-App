import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiInstance from "../helper";

// Get Analytics Dashboard
export const getAnalyticsDashboard = createAsyncThunk(
  "/analytics/dashboard",
  async (_, { rejectWithValue }) => {
    try {
      let res = await apiInstance.get("/analytics/dashboard");
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

// Get Analytics Topics (with filters)
export const getAnalyticsTopics = createAsyncThunk(
  "/analytics/topics",
  async ({ subject_id, sort_by, sort_order }, { rejectWithValue }) => {
    try {
      const params = {};
      if (subject_id) params.subject_id = subject_id;
      if (sort_by) params.sort_by = sort_by;
      if (sort_order) params.sort_order = sort_order;

      let res = await apiInstance.get("/analytics/topics", { params });
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

// Get Analytics Subjects
export const getAnalyticsSubjects = createAsyncThunk(
  "/analytics/subjects",
  async (_, { rejectWithValue }) => {
    try {
      let res = await apiInstance.get("/analytics/subjects");
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

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    dashboard: null,
    topics: [],
    subjects: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Dashboard
      .addCase(getAnalyticsDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnalyticsDashboard.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.dashboard = payload.data.data;
      })
      .addCase(getAnalyticsDashboard.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Failed to fetch dashboard";
      })

      // Topics
      .addCase(getAnalyticsTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnalyticsTopics.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.topics = payload.data.data.topics;
      })
      .addCase(getAnalyticsTopics.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Failed to fetch topics";
      })

      // Subjects
      .addCase(getAnalyticsSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnalyticsSubjects.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.subjects = payload.data.data.subjects;
      })
      .addCase(getAnalyticsSubjects.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message || "Failed to fetch subjects";
      });
  },
});

export const { clearError } = analyticsSlice.actions;
export default analyticsSlice.reducer;
