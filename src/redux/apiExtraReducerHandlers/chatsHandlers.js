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
    state.chatsStates.loaderStates.isTopicsOfSelectedSubjectsFetched = "pending";
  },
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.allTopicsOfSelectedSubjects = action?.payload.data.data;
    state.chatsStates.loaderStates.isTopicsOfSelectedSubjectsFetched = true;
    console.log(action?.payload.data.data,"data");

  },
  rejected: (state, {payload}) => {
    console.log(payload.message);
    state.chatsStates.loaderStates.isTopicsOfSelectedSubjectsFetched = false;
  },
};


export const handleCreateChatWithAI = {
  pending: (state) => {
    state.chatsStates.loaderStates.isChatCreatedWithAI = "pending";
  },
  fulfilled: (state, action) => {
    console.log("createChatWithAI - REQUEST PAYLOAD:", JSON.stringify(action?.meta?.arg, null, 2));
    console.log("createChatWithAI - FULL RESPONSE:", JSON.stringify(action?.payload, null, 2));
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

export const handleSendPromptAndGetMessageFromAI = {
  pending: (state) => {
    state.chatsStates.loaderStates.isMessagesFetched = "pending";
    state.chatsStates.allChatsDatas.aiMessageContent = null;
    state.chatsStates.allChatsDatas.latestUserMessageData = null;
    state.chatsStates.allChatsDatas.latestAiMessageData = null;
    // Reset isChatCreatedWithAI after using it to trigger send-message
    state.chatsStates.loaderStates.isChatCreatedWithAI = null;
  },
  fulfilled: (state, action) => {
    const responseData = action?.payload.data.data;
    state.chatsStates.allChatsDatas.chatMessages = responseData;

    // Store AI message content separately
    state.chatsStates.allChatsDatas.aiMessageContent = responseData?.assistant_message?.content || null;

    // Store full user and AI message data including uuid for notes functionality
    const userMessage = responseData?.user_message;
    const aiMessage = responseData?.assistant_message;

    // Store latest message data for updating chatMessagesArray with uuid
    state.chatsStates.allChatsDatas.latestUserMessageData = userMessage ? {
      uuid: userMessage.uuid || userMessage.id,
      is_saved_to_notes: userMessage.is_saved_to_notes || false,
    } : null;

    state.chatsStates.allChatsDatas.latestAiMessageData = aiMessage ? {
      uuid: aiMessage.uuid || aiMessage.id,
      is_saved_to_notes: aiMessage.is_saved_to_notes || false,
    } : null;

    // Store message IDs in the messageIDsArray
    const userMessageId = userMessage?.id;
    const aiMessageId = aiMessage?.id;

    if (userMessageId && aiMessageId) {
      // Get current messageIDsArray from globalDataStates
      const currentMessageIds = state.globalDataStates?.messageIDsArray || [];
      // Add both user and AI message IDs
      state.globalDataStates.messageIDsArray = [...currentMessageIds, userMessageId, aiMessageId];
    }

    state.chatsStates.loaderStates.isMessagesFetched = true;
  },
  rejected: (state, {payload}) => {
    state.chatsStates.loaderStates.isMessagesFetched = false;
    state.chatsStates.allChatsDatas.aiMessageContent = null;
    state.chatsStates.allChatsDatas.latestUserMessageData = null;
    state.chatsStates.allChatsDatas.latestAiMessageData = null;
  },
};

export const handlePostAddToNotes = {
  pending: (state, action) => {
    state.chatsStates.loaderStates.isAddToNotesPending = "pending";
    // Extract message UUID from the URL pattern /messages/{uuid}/add-to-notes
    const url = action?.meta?.arg?.url || "";
    const match = url.match(/\/messages\/([^/]+)\/add-to-notes/);
    state.chatsStates.allChatsDatas.lastNotesActionMessageUuid = match ? match[1] : null;
  },
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.addToNotes = action?.payload.data.data;
    state.chatsStates.loaderStates.isAddToNotesPending = true;
  },
  rejected: (state, {payload}) => {
    state.chatsStates.loaderStates.isAddToNotesPending = false;
    state.chatsStates.allChatsDatas.lastNotesActionMessageUuid = null;
  },
};

export const handlePostRemoveFromNotes = {
  pending: (state, action) => {
    state.chatsStates.loaderStates.isRemoveFromNotesPending = "pending";
    // Extract message UUID from the URL pattern /messages/{uuid}/remove-from-notes
    const url = action?.meta?.arg?.url || "";
    const match = url.match(/\/messages\/([^/]+)\/remove-from-notes/);
    state.chatsStates.allChatsDatas.lastNotesActionMessageUuid = match ? match[1] : null;
  },
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.addToNotes = {};
    state.chatsStates.loaderStates.isRemoveFromNotesPending = true;
  },
  rejected: (state, {payload}) => {
    state.chatsStates.loaderStates.isRemoveFromNotesPending = false;
    state.chatsStates.allChatsDatas.lastNotesActionMessageUuid = null;
  },
};