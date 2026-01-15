import { triggerToast } from "../../services/toast";


export const handleGetAllRecentChats = {
  pending: (state) => {
    state.chatsStates.loaderStates.isAllRecentChatsFetched = "pending";
  },
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.allRecentChats = action?.payload.data.data;
     state.chatsStates.loaderStates.isAllRecentChatsFetched = true;
     console.log(action?.payload.data.data,"chats");
     
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
    console.log(payload.message);
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

export const handleRenameAndUpdateChatTitle = {
  pending: (state) => {
    state.chatsStates.loaderStates.isChatTitleUpdated = "pending";
  },
  fulfilled: (state, action) => {
    console.log("renameddddd",action?.payload.data);
    state.chatsStates.loaderStates.isChatTitleUpdated = true;
  },
  rejected: (state, {payload}) => {
    console.log(payload.message);
    state.chatsStates.loaderStates.isChatTitleUpdated = false;
  },
};

export const handlePinOrUnpinChat = {
  pending: (state) => {
    state.chatsStates.loaderStates.isChatPinUnpinUpdated = "pending";
  },
  fulfilled: (state, action) => {
    state.chatsStates.loaderStates.isChatPinUnpinUpdated = true;
     console.log(action?.payload.data);

    // Show toast based on action with delay to ensure popup is closed
    const isPinned = action?.meta?.arg?.url?.includes("/pin");
    setTimeout(() => {
      triggerToast(
        isPinned ? "Chat Pinned" : "Chat Unpinned",
        isPinned
          ? "Your chat has been successfully pinned"
          : "Your chat has been successfully unpinned",
        "success",
        3000
      );
    }, 500);
  },
  rejected: (state, {payload}) => {
    console.log(payload.message);
    state.chatsStates.loaderStates.isChatPinUnpinUpdated = false;
  },
};

export const handleArchiveOrUnarchiveChat = {
  pending: (state) => {
    state.chatsStates.loaderStates.isChatArchiveUnarchiveUpdated = "pending";
  },
  fulfilled: (state, action) => {
    state.chatsStates.loaderStates.isChatArchiveUnarchiveUpdated = true;
 console.log(action?.payload.data);
    // Show toast based on action with delay to ensure popup is closed
    const isArchived = action?.meta?.arg?.url?.includes("/archive");
    setTimeout(() => {
      triggerToast(
        isArchived ? "Chat Archived" : "Chat Unarchived",
        isArchived
          ? "Your chat has been successfully archived"
          : "Your chat has been successfully unarchived",
        "success",
        3000
      );
    }, 500);
  },
  rejected: (state, {payload}) => {
    console.log(payload.message);
    state.chatsStates.loaderStates.isChatArchiveUnarchiveUpdated = false;
  },
};

export const handleDeleteChat = {
  pending: (state) => {
    state.chatsStates.loaderStates.isChatDeleted = "pending";
  },
  fulfilled: (state, action) => {
    state.chatsStates.loaderStates.isChatDeleted = true;
  },
  rejected: (state, {payload}) => {
    console.log(payload.message);
    state.chatsStates.loaderStates.isChatDeleted = false;
  },
};

export const handleUndoDeleteChat = {
  pending: (state) => {
    state.chatsStates.loaderStates.isChatDeleteUndone = "pending";
  },
  fulfilled: (state, action) => {
    state.chatsStates.loaderStates.isChatDeleteUndone = true;

    // Show toast with delay
    setTimeout(() => {
      triggerToast(
        "Undo Successful",
        "Your chat has been restored",
        "success",
        3000
      );
    }, 500);
  },
  rejected: (state, {payload}) => {
    console.log(payload.message);
    state.chatsStates.loaderStates.isChatDeleteUndone = false;
  },
};

export const handleFetchAllUserChatsAvailable = {
  pending: (state) => {
    state.chatsStates.loaderStates.isAllUserChatsFetched = "pending";
  },
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.allUserChatsAvailable = action?.payload.data.data;
    state.chatsStates.loaderStates.isAllUserChatsFetched = true;
    console.log(action?.payload.data.data, "all user chats");
  },
  rejected: (state, {payload}) => {
    console.log(payload.message);
    state.chatsStates.loaderStates.isAllUserChatsFetched = false;
  },
};

export const handleBulkOperationsForChats = {
  pending: (state) => {
    state.chatsStates.loaderStates.isBulkOperationCompleted = "pending";
  },
  fulfilled: (state, action) => {
    state.chatsStates.loaderStates.isBulkOperationCompleted = true;
    console.log(action?.payload.data);

    // Store action info for later use in toast
    const actionType = action?.meta?.arg?.data?.action;
    const count = action?.meta?.arg?.data?.chat_ids?.length || action?.meta?.arg?.data?.chat_uuids?.length || 0;

    state.chatsStates.allChatsDatas.lastBulkOperationInfo = {
      action: actionType,
      count: count
    };
  },
  rejected: (state, {payload}) => {
    console.log(payload.message);
    state.chatsStates.loaderStates.isBulkOperationCompleted = false;
  },
};


export const handleFetchAllUserRoomsAvailable = {
  pending: (state) => {
    state.chatsStates.loaderStates.isAllUserRoomsFetched = "pending";
  },
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.allUserRoomsAvailable = action?.payload.data.data;
    state.chatsStates.loaderStates.isAllUserRoomsFetched = true;
    console.log(action?.payload.data.data, "all user chats");
  },
  rejected: (state, {payload}) => {
    console.log(payload.message);
    state.chatsStates.loaderStates.isAllUserRoomsFetched = false;
  },
};