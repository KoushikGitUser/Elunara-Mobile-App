export const handleInitiatePayment = {
  pending: (state) => {
    state.walletStates.isPaymentLoading = true;
  },
  fulfilled: (state, action) => {
    const fullPayload = action.payload?.data?.data;
    console.log("initiatePayment fulfilled - full payload:", JSON.stringify(fullPayload));
    state.walletStates.isPaymentLoading = false;
    state.walletStates.isPaymentFulfilled = true;
    state.walletStates.hyperPayload = fullPayload || null;
  },
  rejected: (state, action) => {
    console.log("initiatePayment rejected:", JSON.stringify(action.payload));
    state.walletStates.isPaymentLoading = false;
    state.walletStates.isPaymentFulfilled = false;
  },
};

export const handleVerifyPayment = {
  pending: (state) => {
    state.walletStates.isVerifyingPayment = true;
    state.walletStates.verifyPaymentStatus = null;
    state.walletStates.verifyPaymentMessage = null;
  },
  fulfilled: (state, action) => {
    console.log("verifyPayment fulfilled:", JSON.stringify(action.payload));
    const data = action.payload?.data;
    state.walletStates.isVerifyingPayment = false;
    state.walletStates.verifyPaymentStatus = data?.status;
    state.walletStates.verifyPaymentMessage = data?.message || null;
    state.walletStates.verifyPaymentAmount = data?.data?.amount || null;
    if (data?.status === "success" && data?.data?.wallet_balance !== undefined) {
      state.walletStates.walletBalance = data.data.wallet_balance;
      state.walletStates.isInitialRechargeCompleted = true;
    }
  },
  rejected: (state, action) => {
    console.log("verifyPayment rejected:", JSON.stringify(action.payload));
    state.walletStates.isVerifyingPayment = false;
    state.walletStates.verifyPaymentStatus = "error";
    state.walletStates.verifyPaymentMessage = action.payload?.message || "Payment verification failed.";
  },
};

export const handleGetTransactions = {
  pending: (state) => {
    state.walletStates.isTransactionsFetched = false;
  },
  fulfilled: (state, action) => {
    const data = action.payload.data.data;
    console.log(data);
    
    state.walletStates.walletTransactions = data.data;
    state.walletStates.isTransactionsFetched = true;
  },
  rejected: (state, action) => {
    state.walletStates.isTransactionsFetched = false;
    console.log("error", action.payload.message);
  },
};

export const handleGetUserWalletInfo = {
  pending: (state) => {
    state.walletStates.isWalletInfoFetched = false;
  },
  fulfilled: (state, action) => {
    const data = action.payload.data.data;
    console.log(data,"all wallet data");
    
    state.walletStates.walletBalance = data.balance;
    state.walletStates.isInitialRechargeCompleted = data.is_initial_recharge_done;
    state.walletStates.isPromotionalUser = data.is_promo;
    state.walletStates.promotionalDaysRemaining = Math.floor(data.promo_days_left);
    state.walletStates.isWalletInfoFetched = true;
  },
  rejected: (state, action) => {
    state.walletStates.isWalletInfoFetched = false;
    console.log("error",action.payload.message);
    
  },
};
