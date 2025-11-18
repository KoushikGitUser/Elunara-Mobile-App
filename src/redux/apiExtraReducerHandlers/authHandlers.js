
export const handleUserLogOut = {
    pending: (state)=>{
        state.authStates.logOutStatus = "pending"; 
    },
    fulfilled: (state,action)=>{
        state.authStates.logOutStatus = true;
        localStorage.clear();
        window.location.reload();
    },
    rejected: (state,action)=>{
        state.authStates.logOutStatus = false;
    }
}