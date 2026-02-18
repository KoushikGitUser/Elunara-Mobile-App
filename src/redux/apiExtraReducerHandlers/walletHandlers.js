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
