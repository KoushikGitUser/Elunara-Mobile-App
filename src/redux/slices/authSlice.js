import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiInstance from "../helper";
import { triggerToast } from "../../services/toast";
import {
  storeToken,
  removeToken,
  storeRefreshToken,
} from "../../utils/Secure/secureStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isSignedUp: null,
  isSignedIn: null,
  isLogOut: null,
  isPasswordReset: null,
};

export const userSignUp = createAsyncThunk(
  "/userSignUp",
  async (registerDetails, { rejectWithValue }) => {
    try {
      let res = await apiInstance.post("/register", registerDetails, {
        headers: {
          Accept: "application/json",
        },
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

export const userSignIn = createAsyncThunk(
  "/userSignIn",
  async (loginDetails, { rejectWithValue }) => {
    try {
      let res = await apiInstance.post("/login", loginDetails, {
        headers: {
          Accept: "application/json",
        },
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

export const userLogOut = createAsyncThunk(
  "/userLogOut",
  async ({ rejectWithValue }) => {
    const details = {
      token: "",
    };
    try {
      let res = await apiInstance.post("/logout", details, {
        headers: {
          Accept: "application/json",
        },
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

export const resetPassword = createAsyncThunk(
  "/resetPassword",
  async (passDetails, { rejectWithValue }) => {
    try {
      let res = await apiInstance.post("/reset-password", passDetails, {
        headers: {
          Accept: "application/json",
        },
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isSignedIn = null;
      state.loading = false;
      state.error = null;

      // Remove token from secure storage
      removeToken();
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //signup
      .addCase(userSignUp.pending, (state, action) => {
        state.isSignedUp = "pending";
      })
      .addCase(userSignUp.fulfilled, (state, { payload }) => {
        state.isSignedUp = true;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.isSignedUp = false;
      })

      //signin
      .addCase(userSignIn.pending, (state, action) => {
        state.isSignedIn = "pending";
      })
      .addCase(userSignIn.fulfilled, (state, { payload }) => {
        state.isSignedIn = true;
        state.token = payload.data?.token;
        state.user = payload.data?.user;
        state.isAuthenticated = true;

        // Store token in secure storage
        if (payload.data?.token) {
          storeToken(payload.data.token);
        }

        // Store refresh token in secure storage
        if (payload.data?.refreshToken) {
          storeRefreshToken(payload.data.refreshToken);
        }

        // Set authenticated user flag in AsyncStorage
        AsyncStorage.setItem("authenticUser", "true");

        setTimeout(() => {
          triggerToast(
            "Logged in",
            "You have been logged in successfully",
            "success",
            3000
          );
        }, 300);
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.isSignedIn = false;
        setTimeout(() => {
          triggerToast("Error", "Login failed, try again later", "error", 3000);
        }, 300);
      })

      //Logout
      .addCase(userLogOut.pending, (state, action) => {
        state.isLogOut = "pending";
      })
      .addCase(userLogOut.fulfilled, (state, { payload }) => {
        state.isLogOut = true;
        state.isAuthenticated = false;

        setTimeout(() => {
          triggerToast(
            "Logged out",
            "You have been logged out successfully",
            "success",
            3000
          );
        }, 300);
      })
      .addCase(userLogOut.rejected, (state, action) => {
        state.isLogOut = false;
        setTimeout(() => {
          triggerToast(
            "Error",
            "Logout failed, try again later",
            "error",
            3000
          );
        }, 300);
      })

      .addCase(resetPassword.pending, (state, action) => {
        state.isPasswordReset = "pending";
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.isPasswordReset = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isPasswordReset = false;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser } =
  authSlice.actions;

export default authSlice.reducer;
