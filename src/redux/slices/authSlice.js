import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiInstance from "../helper";
import { triggerToast } from "../../services/toast";
import {
  storeToken,
  removeToken,
  storeRefreshToken,
} from "../../utils/Secure/secureStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { allInitialStates } from "../allInitialStates";


export const userSignUp = createAsyncThunk(
  "/userSignUp",
  async (registerDetails, { rejectWithValue }) => {
    try {
      let res = await apiInstance.post("/register", registerDetails, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
          "Content-Type": "application/json",
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
  async (_, { rejectWithValue }) => {
    try {
      let res = await apiInstance.post("/logout", {}, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
          "Content-Type": "application/json",
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

export const verifyEmail = createAsyncThunk(
  "/verifyEmail",
  async (mailDetails, { rejectWithValue }) => {
    try {
      let res = await apiInstance.post("/verify-email", mailDetails, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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


export const recoverAccount = createAsyncThunk(
  "/recoverAccount",
  async (mailDetails, { rejectWithValue }) => {
    try {
      let res = await apiInstance.post("/recover-account", mailDetails, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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


export const getOTPForMobileNumber = createAsyncThunk(
  "/getOTPForMobileNumber",
  async (mobileDetails, { rejectWithValue }) => {
    try {
      let res = await apiInstance.post("/send-phone-otp", mobileDetails, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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


export const verifyOTPForMobileNumber = createAsyncThunk(
  "/verifyOTPForMobileNumber",
  async (otp, { rejectWithValue }) => {
    try {
      let res = await apiInstance.post("/verify-phone", otp, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
  initialState:allInitialStates,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      //signup
      .addCase(userSignUp.pending, (state, action) => {
        state.authStates.isSignedUp = "pending";
      })
      .addCase(userSignUp.fulfilled, (state, { payload }) => {
        if(payload?.status == 201){
        state.authStates.isSignedUp = true;
        }
      })
      .addCase(userSignUp.rejected, (state, {payload}) => {
        state.authStates.isSignedUp = false;
        if(payload?.status == 422){
          if(payload?.data?.data?.account_recoverable === true){
            state.authStates.isAccountRecoverable = true;
            state.authStates.accountRecoverableMessage = payload?.message
          }
          else{
            triggerToast("Account exists","This email is already registered, Log-in to continue","error",3000);
          }

        }
      })

      //signin
      .addCase(userSignIn.pending, (state, action) => {
        state.authStates.isSignedIn = "pending";
      })
      .addCase(userSignIn.fulfilled, (state, { payload }) => {
        state.authStates.isSignedIn = true;
        state.authStates.token = payload.data?.token;
        state.authStates.user = payload.data?.user;
        state.authStates.isAuthenticated = true;

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
        state.authStates.isSignedIn = false;
        setTimeout(() => {
          triggerToast("Error", "Login failed, try again later", "error", 3000);
        }, 300);
      })

      //Logout
      .addCase(userLogOut.pending, (state, action) => {
        state.authStates.isLogOut = "pending";
      })
      .addCase(userLogOut.fulfilled, (state, { payload }) => {
        state.authStates.isLogOut = true;
        state.authStates.isAuthenticated = false;
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
        state.authStates.isLogOut = false;
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
        state.authStates.isPasswordReset = "pending";
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.authStates.isPasswordReset = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.authStates.isPasswordReset = false;
      })


      .addCase(verifyEmail.pending, (state, action) => {
        state.authStates.isMailVerified = "pending";
      })
      .addCase(verifyEmail.fulfilled, (state, { payload }) => {
        state.authStates.isMailVerified = true;
      })
      .addCase(verifyEmail.rejected, (state, {payload}) => {
        state.authStates.isMailVerified = false;
        console.log(payload.status,"failed");
        
      })


      .addCase(recoverAccount.pending, (state, action) => {
        state.authStates.isOTPReceivedForAccountRecovery = "pending";
      })
      .addCase(recoverAccount.fulfilled, (state, { payload }) => {
        state.authStates.isOTPReceivedForAccountRecovery = true;
      })
      .addCase(recoverAccount.rejected, (state, action) => {
        state.authStates.isOTPReceivedForAccountRecovery = false;
      })


      .addCase(getOTPForMobileNumber.pending, (state, action) => {
        state.authStates.isOTPReceivedForMobileVerification = "pending";
      })
      .addCase(getOTPForMobileNumber.fulfilled, (state, { payload }) => {
        state.authStates.isOTPReceivedForMobileVerification = true;
      })
      .addCase(getOTPForMobileNumber.rejected, (state, action) => {
        state.authStates.isOTPReceivedForMobileVerification = false;
      })


      .addCase(verifyOTPForMobileNumber.pending, (state, action) => {
        state.authStates.isMobileOTPVerified = "pending";
      })
      .addCase(verifyOTPForMobileNumber.fulfilled, (state, { payload }) => {
        state.authStates.isMobileOTPVerified = true;
      })
      .addCase(verifyOTPForMobileNumber.rejected, (state, action) => {
        state.authStates.isMobileOTPVerified = false;
      })
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser } =
  authSlice.actions;

export default authSlice.reducer;
