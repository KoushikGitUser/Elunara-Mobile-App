import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiInstance from "../helper";
import { triggerToast } from "../../services/toast";
import {
  storeToken,
  removeToken,
  storeRefreshToken,
  getToken,
} from "../../utils/Secure/secureStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetAllStates } from "../actions/resetActions";
import { allInitialStates } from "../allInitialStates";
import { Alert } from "react-native";

export const userSignUp = createAsyncThunk(
  "/userSignUp",
  async (registerDetails, { rejectWithValue }) => {
    try {
      let res = await axios.post(
        "http://api.elunara.ai/api/v1/register",
        registerDetails,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
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
      let res = await apiInstance.post(
        "/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
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

export const signWithGoogle = createAsyncThunk(
  "/signWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      let res = await apiInstance.get("/auth/google/redirect?platform=android", {
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

export const signWithApple = createAsyncThunk(
  "/signWithApple",
  async (_, { rejectWithValue }) => {
    try {
      let res = await apiInstance.get("/auth/apple/redirect", {
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

export const signWithLinkedIn = createAsyncThunk(
  "/signWithLinkedIn",
  async (_, { rejectWithValue }) => {
    try {
      let res = await apiInstance.get("/auth/linkedin/redirect", {
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


export const loginUsingProviderCallback = createAsyncThunk(
  "/loginUsingProviderCallback",
  async (providerDetails, { rejectWithValue }) => {
    try {
      let res = await apiInstance.get(`/auth/${providerDetails.provider}/callback?code=${providerDetails.authCode}&state=${providerDetails.state}`, {
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


export const requestForEmailChange = createAsyncThunk(
  "/requestForEmailChange",
  async (userDetails, { rejectWithValue }) => {
    try {
      let res = await apiInstance.post("/settings/profile/email/request",userDetails, {
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


export const verifyEmailChangeRequest = createAsyncThunk(
  "/verifyEmailChangeRequest",
  async (userDetails, { rejectWithValue }) => {
    try {
      let res = await apiInstance.post("/settings/profile/email/verify",userDetails, {
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


export const updatePasswordWithCurrent = createAsyncThunk(
  "/updatePasswordWithCurrent",
  async (userDetails, { rejectWithValue }) => {
    try {
      let res = await apiInstance.put("/settings/profile/password",userDetails, {
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


export const forgotPasswordFromProfile = createAsyncThunk(
  "/forgotPasswordFromProfile",
  async (userDetails, { rejectWithValue }) => {
    try {
      let res = await apiInstance.post("/settings/profile/password/forgot",userDetails, {
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


export const updatePasswordForgotProfile = createAsyncThunk(
  "/updatePasswordForgotProfile",
  async (userDetails, { rejectWithValue }) => {
    try {
      let res = await apiInstance.post("/settings/profile/password/forgot",userDetails, {
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
  initialState: allInitialStates,
  reducers: {
    setIsSignedInToFalse: (state, action) => {
      state.authStates.isSignedIn = false;
    },
    setIsSignedUpToFalse: (state, action) => {
      state.authStates.isSignedUp = false;
    },
    setIsLogOutToFalse: (state, action) => {
      state.authStates.isLogOut = false;
    },
    setIsPasswordResetToFalse: (state, action) => {
      state.authStates.isPasswordReset = false;
    },
    setIsMailVerifiedToFalse: (state, action) => {
      state.authStates.isMailVerified = false;
    },
    setIsAccountRecoverableToFalse: (state, action) => {
      state.authStates.isAccountRecoverable = false;
      state.authStates.accountRecoverableMessage = "";
    },
    setAuthError: (state, action) => {
      state.authStates.error = action.payload;
    },
    setIsOTPReceivedForMobileVerification: (state, action) => {
      state.authStates.isOTPReceivedForMobileVerification = action.payload;
    },
    setIsOTPReceivedForAccountRecovery: (state, action) => {
      state.authStates.isOTPReceivedForAccountRecovery = action.payload;
    },
    setLoggedInUsingProvider: (state, action) => {
      state.authStates.loggedInUsingProvider = action.payload;
    },
    setIsRedirectURLReceivedForGoogle: (state, action) => {
      state.authStates.isRedirectURLReceivedForGoogle = action.payload;
    },
    setIsRedirectURLReceivedForApple: (state, action) => {
      state.authStates.isRedirectURLReceivedForApple = action.payload;
    },
    setIsRedirectURLReceivedForLinkedIn: (state, action) => {
      state.authStates.isRedirectURLReceivedForLinkedIn = action.payload;
    },
    setIsEmailChangeRequestedToFalse: (state, action) => {
      state.authStates.isEmailChangeRequested = false;
    },
    setForgotPasswordProfileStatesToNull: (state) => {
      state.authStates.isCodeSentForForgotPassInProfile = null;
      state.authStates.isPasswordUpdatedForgotProfile = null;
    },
    setIsMobileOTPVerified: (state, action) => {
      state.authStates.isMobileOTPVerified = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      //signup
      .addCase(userSignUp.pending, (state, action) => {
        state.authStates.isSignedUp = "pending";
      })
      .addCase(userSignUp.fulfilled, (state, { payload }) => {
         triggerToast(payload.status,`payload msg - ${payload.message}, payload - ${payload},` ,"error",20000)
          Alert.alert("error",`payload msg - ${payload.message}, payload - ${payload}, status - ${payload.status}`)
        if (payload?.status == 201) {
          state.authStates.isSignedUp = true; 
        }
      })
      .addCase(userSignUp.rejected, (state, { payload }) => {
        state.authStates.isSignedUp = false;
        triggerToast(payload.status,`payload msg - ${payload.message}, payload - ${payload},` ,"error",20000)
         Alert.alert("error",`payload msg - ${payload.message}, payload - ${payload}, status - ${payload.status}`)
        if (payload?.status == 422) {
          if (payload?.data?.data?.account_recoverable === true) {
            state.authStates.isAccountRecoverable = true;
            state.authStates.accountRecoverableMessage = payload?.message;
          } else {
            triggerToast(
              "Account exists",
              "This email is already registered, Log-in to continue",
              "error",
              3000
            );
          }
        }
      })

      //signin
      .addCase(userSignIn.pending, (state, action) => {
        console.log("userSignIn pending - request payload:", action.meta.arg);
        state.authStates.isSignedIn = "pending";
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        const { payload } = action;
        Alert.alert("error",`payload msg - ${payload.message}, payload - ${payload}, status - ${payload.status}`)
         triggerToast(payload.status,`payload msg - ${payload.message}, payload - ${payload},` ,"error",20000)
        state.authStates.isSignedIn = true;
        // Store token in secure storage
        if (payload.data?.data?.access_token) {
          storeToken(payload.data.data.access_token); 
        }
        // Store refresh token in secure storage
        if (payload.data?.data?.refresh_token) {
          storeRefreshToken(payload.data.data.refresh_token);
        }
        setTimeout(() => {
          triggerToast(
            "Logged in",
            "You have been logged in successfully",
            "success",
            3000
          );
           triggerToast(payload.status,`payload msg - ${payload.message}, payload - ${payload},` ,"error",20000)
            Alert.alert("error",`payload msg - ${payload.message}, payload - ${payload}, status - ${payload.status}`)
        }, 300);
      })
      .addCase(userSignIn.rejected, (state, action) => {
        console.log("userSignIn rejected - request payload:", action.meta.arg);
        const { payload } = action;
        state.authStates.isSignedIn = false;
         triggerToast(payload.status,`payload msg - ${payload.message}, payload - ${payload},` ,"error",20000)
        setTimeout(() => {
          triggerToast("Login failed", `${payload.message}`, "error", 3000);
        }, 300);
      })

      //Logout
      .addCase(userLogOut.pending, (state, action) => {
        state.authStates.isLogOut = "pending";
      })
      .addCase(userLogOut.fulfilled, (state, { payload }) => {
        state.authStates.isLogOut = true;
        state.authStates.isAuthenticated = false;
        console.log(payload.message, "logout done");
        setTimeout(() => {
          triggerToast(
            "Logged out",
            "You have been logged out successfully",
            "success",
            3000
          );
        }, 300);
      })
      .addCase(userLogOut.rejected, (state, { payload }) => {
        state.authStates.isLogOut = false;
        console.log(payload.data.message, "logout fail");
        setTimeout(() => {
          triggerToast(
            "Error",
            "Logout failed, try again later",
            "error",
            3000
          );
        }, 300);
      })

      //reset password
      .addCase(resetPassword.pending, (state, action) => {
        state.authStates.isPasswordReset = "pending";
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.authStates.isPasswordReset = true;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.authStates.isPasswordReset = false;
        if (payload.status == 400) {
          triggerToast(
            "Password not set",
            "Invalid or expired token/OTP.",
            "error",
            3000
          );
        } else {
          triggerToast(
            "Password not set",
            "Invalid email provided",
            "error",
            3000
          );
        }
      })

      //verify email
      .addCase(verifyEmail.pending, (state, action) => {
        state.authStates.isMailVerified = "pending";
      })
      .addCase(verifyEmail.fulfilled, (state, { payload }) => {
        state.authStates.isMailVerified = true;
      })
      .addCase(verifyEmail.rejected, (state, { payload }) => {
        state.authStates.isMailVerified = false;
        if (payload.status == 400) {
          triggerToast(
            "Invalid token/OTP",
            "The token/OTP provided is invalid or expired",
            "error",
            3000
          );
        }
      })

      //recover account
      .addCase(recoverAccount.pending, (state, action) => {
        state.authStates.isOTPReceivedForAccountRecovery = "pending";
      })
      .addCase(recoverAccount.fulfilled, (state, { payload }) => {
        state.authStates.isOTPReceivedForAccountRecovery = true;
      })
      .addCase(recoverAccount.rejected, (state, { payload }) => {
        state.authStates.isOTPReceivedForAccountRecovery = false;
        if (payload.status == 422) {
          triggerToast(
            "Invalid email",
            "The selected email is invalid.",
            "error",
            3000
          );
        } else {
          triggerToast(
            "Attempts limit reached",
            "Too many recovery attempts. Please try again after 24 hours.",
            "error",
            3000
          );
        }
      })

      //get mobile otp
      .addCase(getOTPForMobileNumber.pending, (state, action) => {
        state.authStates.isOTPReceivedForMobileVerification = "pending";
      })
      .addCase(getOTPForMobileNumber.fulfilled, (state, { payload }) => {
        state.authStates.isOTPReceivedForMobileVerification = true;
      })
      .addCase(getOTPForMobileNumber.rejected, (state, { payload }) => {
        state.authStates.isOTPReceivedForMobileVerification = false;
        if (payload.status == 422) {
          triggerToast(
            "Already in use",
            "This phone number is already registered with another account.",
            "error",
            3000
          );
        } else if (payload.status == 429) {
          triggerToast(
            "Attempts limit reached",
            "Too many OTP requests. Please try again after 60 minute(s).",
            "error",
            3000
          );
        } else if (payload.status == 500) {
          triggerToast(
            "Server error",
            "Failed to send OTP. Please try again.",
            "error",
            3000
          );
        }
      })

      //verify mobile otp
      .addCase(verifyOTPForMobileNumber.pending, (state, action) => {
        state.authStates.isMobileOTPVerified = "pending";
      })
      .addCase(verifyOTPForMobileNumber.fulfilled, (state, { payload }) => {
        state.authStates.isMobileOTPVerified = true;
      })
      .addCase(verifyOTPForMobileNumber.rejected, (state, action) => {
        state.authStates.isMobileOTPVerified = false;
      })

      //signin/signup with google
      .addCase(signWithGoogle.pending, (state, action) => {
        state.authStates.isRedirectURLReceivedForGoogle = "pending";
        console.log("fetching link");
        
      })
      .addCase(signWithGoogle.fulfilled, (state, { payload }) => {
        state.authStates.isRedirectURLReceivedForGoogle = true;
        state.authStates.redirectURLForGoogle = payload.data.data.redirect_url;
      })
      .addCase(signWithGoogle.rejected, (state, { payload }) => {
        state.authStates.isRedirectURLReceivedForGoogle = false;
      })

      //signin/signup with apple
      .addCase(signWithApple.pending, (state, action) => {
        state.authStates.isRedirectURLReceivedForApple = "pending";
      })
      .addCase(signWithApple.fulfilled, (state, { payload }) => {
        state.authStates.isRedirectURLReceivedForApple = true;
        state.authStates.redirectURLForApple = payload.data.data.redirect_url;
        console.log(payload.data.data.redirect_url, "url");
      })
      .addCase(signWithApple.rejected, (state, { payload }) => {
        state.authStates.isRedirectURLReceivedForApple = false;
        console.log(payload.status);
      })

      //signin/signup with linkedIn
      .addCase(signWithLinkedIn.pending, (state, action) => {
        state.authStates.isRedirectURLReceivedForLinkedIn = "pending";
      })
      .addCase(signWithLinkedIn.fulfilled, (state, { payload }) => {
        state.authStates.isRedirectURLReceivedForLinkedIn = true;
        state.authStates.redirectURLForLinkedIn =
          payload.data.data.redirect_url;
        console.log(payload.data.data.redirect_url, "url");
      })
      .addCase(signWithLinkedIn.rejected, (state, action) => {
        state.authStates.isRedirectURLReceivedForLinkedIn = false;
      })


      .addCase(loginUsingProviderCallback.pending, (state, action) => {
        state.authStates.loggedInUsingProvider = "pending";
      })
      .addCase(loginUsingProviderCallback.fulfilled, (state, { payload }) => {
        state.authStates.loggedInUsingProvider = true;
      })
      .addCase(loginUsingProviderCallback.rejected, (state, action) => {
        state.authStates.loggedInUsingProvider = false;
      })

      //request email change
      .addCase(requestForEmailChange.pending, (state) => {
        state.authStates.isEmailChangeRequested = "pending";
        state.authStates.isOTPSentForEmailChange = "pending";
      })
      .addCase(requestForEmailChange.fulfilled, (state, { payload }) => {
        state.authStates.isEmailChangeRequested = true;
        state.authStates.isOTPSentForEmailChange = true;
        if (payload?.status === 200) {
          triggerToast(
            "Verification email sent",
            "Please check your new email address to verify the change.",
            "success",
            3000
          );
        }
      })
      .addCase(requestForEmailChange.rejected, (state, action) => {
        const { payload } = action;
        // console.log("requestForEmailChange rejected - request payload:", action.meta.arg);
        state.authStates.isEmailChangeRequested = false;
        state.authStates.isOTPSentForEmailChange = false;
        if (payload?.status === 400) {
          triggerToast(
            "Invalid password",
            "The password you entered is incorrect.",
            "error",
            3000
          );
        } else if (payload?.status === 422) {
          triggerToast(
            "Email already in use",
            "This email is already registered, try with another email",
            "error",
            3000
          );
        } else if (payload?.status === 429) {
          triggerToast(
            "Too many attempts",
            "Too many email change requests. Please try again later.",
            "error",
            3000
          );
        } else {
          triggerToast(
            "Request failed",
            "Failed to request email change. Please try again.",
            "error",
            3000
          );
        }
      })

      //verify email change request
      .addCase(verifyEmailChangeRequest.pending, (state) => {
        state.authStates.isEmailChangeRequestVerified = "pending";
      })
      .addCase(verifyEmailChangeRequest.fulfilled, (state, { payload }) => {
        state.authStates.isEmailChangeRequestVerified = true;
        if (payload?.status === 200) {
          triggerToast(
            "Email Address Updated Successfully!",
            "",
            "success",
            3000
          );
        }
      })
      .addCase(verifyEmailChangeRequest.rejected, (state, { payload }) => {
        state.authStates.isEmailChangeRequestVerified = false;
        if (payload?.status === 400) {
          triggerToast(
            "Invalid OTP",
            "The OTP you entered is invalid or expired.",
            "error",
            3000
          );
        } else if (payload?.status === 422) {
          triggerToast(
            "Validation Error",
            "Please check your input and try again.",
            "error",
            3000
          );
        } else {
          triggerToast(
            "Verification failed",
            "Failed to verify email change. Please try again.",
            "error",
            3000
          );
        }
      })

      //update password with current
      .addCase(updatePasswordWithCurrent.pending, (state) => {
        state.authStates.isPasswordUpdated = "pending";
      })
      .addCase(updatePasswordWithCurrent.fulfilled, (state) => {
        state.authStates.isPasswordUpdated = true;
      })
      .addCase(updatePasswordWithCurrent.rejected, (state, { payload }) => {
        state.authStates.isPasswordUpdated = false;
        if (payload?.status === 401) {
          triggerToast(
            "Invalid password",
            "The current password you entered is incorrect.",
            "error",
            3000
          );
        } else if (payload?.status === 422) {
          triggerToast(
            "Validation Error",
            "Please check your input and try again.",
            "error",
            3000
          );
        } else {
          triggerToast(
            "Update failed",
            "Failed to update password. Please try again.",
            "error",
            3000
          );
        }
      })

      //forgot password from profile - send code
      .addCase(forgotPasswordFromProfile.pending, (state) => {
        state.authStates.isCodeSentForForgotPassInProfile = "pending";
      })
      .addCase(forgotPasswordFromProfile.fulfilled, (state) => {
        state.authStates.isCodeSentForForgotPassInProfile = true;
      })
      .addCase(forgotPasswordFromProfile.rejected, (state, { payload }) => {
        state.authStates.isCodeSentForForgotPassInProfile = false;
        if (payload?.status === 429) {
          triggerToast(
            "Too many attempts",
            "Too many requests. Please try again later.",
            "error",
            3000
          );
        } else {
          triggerToast(
            "Request failed",
            "Failed to send verification code. Please try again.",
            "error",
            3000
          );
        }
      })

      //update password forgot profile - reset password with OTP
      .addCase(updatePasswordForgotProfile.pending, (state) => {
        state.authStates.isPasswordUpdatedForgotProfile = "pending";
      })
      .addCase(updatePasswordForgotProfile.fulfilled, (state) => {
        state.authStates.isPasswordUpdatedForgotProfile = true;
      })
      .addCase(updatePasswordForgotProfile.rejected, (state, { payload }) => {
        state.authStates.isPasswordUpdatedForgotProfile = false;
        if (payload?.status === 400) {
          triggerToast(
            "Invalid OTP",
            "The OTP you entered is invalid or expired.",
            "error",
            3000
          );
        } else if (payload?.status === 422) {
          triggerToast(
            "Validation Error",
            "Please check your input and try again.",
            "error",
            3000
          );
        } else {
          triggerToast(
            "Update failed",
            "Failed to update password. Please try again.",
            "error",
            3000
          );
        }
      })
      // Handle reset all states - for auth we keep the logout state
      .addCase(resetAllStates, (state) => {
        // Import initial states
        const { allInitialStates: initialStates } = require('../allInitialStates');
        return initialStates;
      });
  },
});

export const {
  setAuthError,
  setIsAccountRecoverableToFalse,
  setIsLogOutToFalse,
  setIsMailVerifiedToFalse,
  setIsPasswordResetToFalse,
  setIsSignedInToFalse,
  setIsSignedUpToFalse,
  setIsOTPReceivedForMobileVerification,
  setIsOTPReceivedForAccountRecovery,
  setIsEmailChangeRequestedToFalse,
  setForgotPasswordProfileStatesToNull,
  setIsMobileOTPVerified,
} = authSlice.actions;

export default authSlice.reducer;
