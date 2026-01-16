

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

export const handleGetMessagesByChatUuid = {
  pending: (state) => {
    console.log("getMessagesByChatUuid - PENDING");
    state.chatsStates.loaderStates.isMessagesFetched = "pending";
  },
  fulfilled: (state, action) => {
    console.log("getMessagesByChatUuid - FULFILLED", action?.payload.data.data);
    state.chatsStates.allChatsDatas.chatMessages = action?.payload.data.data;
    state.chatsStates.loaderStates.isMessagesFetched = true;
  },
  rejected: (state, {payload}) => {
    console.log("getMessagesByChatUuid - REJECTED", payload);
    state.chatsStates.loaderStates.isMessagesFetched = false;
  },
};

export const handlePostAddToNotes = {
  pending: (state) => {
    console.log("postAddToNotes - PENDING");
    state.chatsStates.loaderStates.isAddToNotesPending = "pending";
  },
  fulfilled: (state, action) => {
    console.log("postAddToNotes - FULFILLED", action?.payload);
    state.chatsStates.allChatsDatas.addToNotes = action?.payload.data.data;
    state.chatsStates.loaderStates.isAddToNotesPending = true;
  },
  rejected: (state, {payload}) => {
    console.log("postAddToNotes - REJECTED", payload);
    state.chatsStates.loaderStates.isAddToNotesPending = false;
  },
};

export const handlePostRemoveFromNotes = {
  pending: (state) => {
    console.log("postRemoveFromNotes - PENDING");
    state.chatsStates.loaderStates.isRemoveFromNotesPending = "pending";
  },
  fulfilled: (state, action) => {
    console.log("postRemoveFromNotes - FULFILLED", action?.payload);
    state.chatsStates.allChatsDatas.addToNotes = {};
    state.chatsStates.loaderStates.isRemoveFromNotesPending = true;
  },
  rejected: (state, {payload}) => {
    console.log("postRemoveFromNotes - REJECTED", payload);
    state.chatsStates.loaderStates.isRemoveFromNotesPending = false;
  },
};