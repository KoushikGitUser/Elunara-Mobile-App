

export const handleGetAllRecentChats = {
  pending: (state) => {
    state.chatsStates.loaderStates.isAllRecentChatsFetched = "pending";
  },
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.allRecentChats = action?.payload.data.data;
     state.chatsStates.loaderStates.isAllRecentChatsFetched = true;
  },
  rejected: (state, {payload}) => {
    state.chatsStates.loaderStates.isAllRecentChatsFetched = false;
  },
};

export const handleGetAllDetailsOfChatByID = {
  pending: (state) => {
  },
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.currentActionChatDetails = action?.payload.data.data;
    console.log(action?.payload.data.data,"data");
    
  },
  rejected: (state, {payload}) => {
  },
};

export const handleGetAllSubjectsForChat = {
  pending: (state) => {
  },
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.allSubjectsAvailable = action?.payload.data.data;
  },
  rejected: (state, {payload}) => {
  },
};


export const handleGetAllTopicsOfSelectedSubjects = {
  pending: (state) => {
  },
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.allTopicsOfSelectedSubjects = action?.payload.data.data;
    console.log(action?.payload.data.data,"data");
    
  },
  rejected: (state, {payload}) => {
    console.log(payload.message);
    
  },
};


export const handleCreateChatWithAI = {
  pending: (state) => {
    state.chatsStates.loaderStates.isChatCreatedWithAI = "pending";
  },
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.createdChatDetails = action?.payload.data.data;
    console.log(action?.payload.data.data,"data");
    state.chatsStates.loaderStates.isChatCreatedWithAI = true;
    
  },
  rejected: (state, {payload}) => {
    console.log(payload.message);
    state.chatsStates.loaderStates.isChatCreatedWithAI = false;
  },
};