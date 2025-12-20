export const authStates = { 
  loading: false,
  error: null,
  isSignedUp: null,
  isSignedIn: null,
  isLogOut: null,
  isPasswordReset: null,
  isMailVerified: null,
  isOTPReceivedForAccountRecovery:false,
  isOTPReceivedForMobileVerification:false,
  isMobileOTPVerified:false,
  isAccountRecoverable:false,
  accountRecoverableMessage:"",

  //oauth states, signin/signup with social
  isRedirectURLReceivedForGoogle:false,
  redirectURLForGoogle:"",
  isRedirectURLReceivedForApple:false,
  redirectURLForApple:"",
  isRedirectURLReceivedForLinkedIn:false,
  redirectURLForLinkedIn:"",
};