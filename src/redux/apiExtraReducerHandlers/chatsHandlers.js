import { triggerToast } from "../../services/toast";

// POST /chats/:uuid/room - Add chat to a room
export const handleAddToRoom = {
  pending: (state) => {
    state.chatsStates.addingToRoom = true;
  },
  fulfilled: (state, action) => {
    state.chatsStates.addingToRoom = false;
    triggerToast("Success", "Chat added to room", "success", 3000);
  },
  rejected: (state, action) => {
    state.chatsStates.addingToRoom = false;
    triggerToast(
      "Error",
      action?.payload?.message || "Failed to add chat to room",
      "error",
      3000,
    );
  },
};

// DELETE /chats/:uuid/room - Remove chat from a room
export const handleRemoveFromRoom = {
  pending: (state) => {
    state.chatsStates.removingFromRoom = true;
  },
  fulfilled: (state, action) => {
    state.chatsStates.removingFromRoom = false;
    triggerToast("Success", "Chat removed from room", "success", 3000);
  },
  rejected: (state, action) => {
    state.chatsStates.removingFromRoom = false;
    triggerToast(
      "Error",
      action?.payload?.message || "Failed to remove chat from room",
      "error",
      3000,
    );
  },
};

export const handleGetAllRecentChats = {
  pending: (state) => {
    state.chatsStates.loaderStates.isAllRecentChatsFetched = "pending";
  },
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.allRecentChats = action?.payload.data.data;
    state.chatsStates.loaderStates.isAllRecentChatsFetched = true;
    console.log(action?.payload.data.data, "chats");
  },
  rejected: (state, { payload }) => {
    state.chatsStates.loaderStates.isAllRecentChatsFetched = false;
  },
};

export const handleGetAllDetailsOfChatByID = {
  pending: (state) => {},
  fulfilled: (state, action) => {
    const chatDetails = action?.payload.data.data;

    // Store in currentActionChatDetails for actions (rename, delete, etc.)
    state.chatsStates.allChatsDatas.currentActionChatDetails = chatDetails;

    // Also update createdChatDetails so ChatHeader shows the correct name
    state.chatsStates.allChatsDatas.createdChatDetails = chatDetails;

    console.log(chatDetails, "Chat details fetched");
  },
  rejected: (state, { payload }) => {
    console.log(payload.message);
  },
};

export const handleGetAllSubjectsForChat = {
  pending: (state) => {},
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.allSubjectsAvailable =
      action?.payload.data.data;
  },
  rejected: (state, { payload }) => {},
};

export const handleGetAllTopicsOfSelectedSubjects = {
  pending: (state) => {
    state.chatsStates.loaderStates.isTopicsOfSelectedSubjectsFetched =
      "pending";
  },
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.allTopicsOfSelectedSubjects =
      action?.payload.data.data;
    state.chatsStates.loaderStates.isTopicsOfSelectedSubjectsFetched = true;
    console.log(action?.payload.data.data, "data");
  },
  rejected: (state, { payload }) => {
    console.log(payload.message);
    state.chatsStates.loaderStates.isTopicsOfSelectedSubjectsFetched = false;
  },
};

export const handleCreateChatWithAI = {
  pending: (state) => {
    console.log("═══════════════════════════════════════════════════════");
    console.log("🔵 CREATE CHAT WITH AI - PENDING");
    console.log("═══════════════════════════════════════════════════════");
    state.chatsStates.loaderStates.isChatCreatedWithAI = "pending";
    // Clear stale data from previous chat to prevent incorrect popup states
    state.chatsStates.allChatsDatas.currentActionChatDetails = null;
  },
  fulfilled: (state, action) => {
    console.log("═══════════════════════════════════════════════════════");
    console.log("🔵 CREATE CHAT WITH AI - FULFILLED");
    console.log(
      "🔵 REQUEST PAYLOAD:",
      JSON.stringify(action?.meta?.arg, null, 2),
    );
    console.log(
      "🔵 FULL RESPONSE:",
      JSON.stringify(action?.payload, null, 2),
    );
    console.log(
      "🔵 Chat ID:",
      action?.payload?.data?.data?.id,
    );
    console.log("═══════════════════════════════════════════════════════");
    state.chatsStates.allChatsDatas.createdChatDetails =
      action?.payload.data.data;
    // Also set currentActionChatDetails to the new chat so popup uses fresh data
    state.chatsStates.allChatsDatas.currentActionChatDetails =
      action?.payload.data.data;
    state.chatsStates.loaderStates.isChatCreatedWithAI = true;
  },
  rejected: (state, { payload }) => {
    console.log("═══════════════════════════════════════════════════════");
    console.log("🔴 CREATE CHAT WITH AI - REJECTED");
    console.log("🔴 Error:", payload?.message || "Unknown error");
    console.log("═══════════════════════════════════════════════════════");
    state.chatsStates.loaderStates.isChatCreatedWithAI = false;
  },
};

export const handleRenameAndUpdateChatTitle = {
  pending: (state) => {
    state.chatsStates.loaderStates.isChatTitleUpdated = "pending";
  },
  fulfilled: (state, action) => {
    const responseData = action?.payload.data.data;
    console.log(
      "Chat renamed - Response:",
      JSON.stringify(responseData, null, 2),
    );

    // Update the chat title in createdChatDetails
    if (
      state.chatsStates.allChatsDatas.createdChatDetails &&
      responseData?.name
    ) {
      state.chatsStates.allChatsDatas.createdChatDetails = {
        ...state.chatsStates.allChatsDatas.createdChatDetails,
        name: responseData.name,
      };
      console.log("Updated chat title to:", responseData.name);
    }

    state.chatsStates.loaderStates.isChatTitleUpdated = true;
  },
  rejected: (state, { payload }) => {
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
        3000,
      );
    }, 500);
  },
  rejected: (state, { payload }) => {
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
    // Check if it's archive or unarchive action
    const isArchived =
      action?.meta?.arg?.url?.includes("/archive") &&
      !action?.meta?.arg?.url?.includes("/unarchive");

    // Update createdChatDetails.is_archived for ChatScreen UI
    if (state.chatsStates.allChatsDatas.createdChatDetails) {
      state.chatsStates.allChatsDatas.createdChatDetails.is_archived =
        isArchived;
    }

    // Show toast based on action with delay to ensure popup is closed
    setTimeout(() => {
      triggerToast(
        isArchived ? "Chat Archived" : "Chat Unarchived",
        isArchived
          ? "Your chat has been successfully archived"
          : "Your chat has been successfully unarchived",
        "success",
        3000,
      );
    }, 500);
  },
  rejected: (state, { payload }) => {
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
  rejected: (state, { payload }) => {
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
        3000,
      );
    }, 500);
  },
  rejected: (state, { payload }) => {
    console.log(payload.message);
    state.chatsStates.loaderStates.isChatDeleteUndone = false;
  },
};

export const handleFetchAllUserChatsAvailable = {
  pending: (state) => {
    state.chatsStates.loaderStates.isAllUserChatsFetched = "pending";
  },
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.allUserChatsAvailable =
      action?.payload.data.data;
    state.chatsStates.loaderStates.isAllUserChatsFetched = true;
    console.log(action?.payload.data.data, "all user chats");
  },
  rejected: (state, { payload }) => {
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
    const count =
      action?.meta?.arg?.data?.chat_ids?.length ||
      action?.meta?.arg?.data?.chat_uuids?.length ||
      0;

    state.chatsStates.allChatsDatas.lastBulkOperationInfo = {
      action: actionType,
      count: count,
    };
  },
  rejected: (state, { payload }) => {
    console.log(payload.message);
    state.chatsStates.loaderStates.isBulkOperationCompleted = false;
  },
};

export const handleFetchAllUserRoomsAvailable = {
  pending: (state) => {
    state.chatsStates.loaderStates.isAllUserRoomsFetched = "pending";
  },
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.allUserRoomsAvailable =
      action?.payload.data.data;
    state.chatsStates.loaderStates.isAllUserRoomsFetched = true;
    console.log(action?.payload.data.data, "all user chats");
  },
  rejected: (state, { payload }) => {
    console.log(payload.message);
    state.chatsStates.loaderStates.isAllUserRoomsFetched = false;
  },
};

export const handleSendPromptAndGetMessageFromAI = {
  pending: (state) => {
    console.log("═══════════════════════════════════════════════════════");
    console.log("🟡 SEND MESSAGE - PENDING");
    console.log("═══════════════════════════════════════════════════════");
    state.chatsStates.loaderStates.isMessagesFetched = "pending";
    state.chatsStates.allChatsDatas.aiMessageContent = null;
    state.chatsStates.allChatsDatas.latestUserMessageData = null;
    state.chatsStates.allChatsDatas.latestAiMessageData = null;
    // Reset isChatCreatedWithAI after using it to trigger send-message
    state.chatsStates.loaderStates.isChatCreatedWithAI = null;
  },
  fulfilled: (state, action) => {
    console.log("═══════════════════════════════════════════════════════");
    console.log("🟡 SEND MESSAGE - FULFILLED");
    console.log("🟡 FULL RESPONSE:", JSON.stringify(action?.payload, null, 2));
    console.log("═══════════════════════════════════════════════════════");
    const responseData = action?.payload.data.data;
    state.chatsStates.allChatsDatas.chatMessages = responseData;

    // Store AI message content separately
    state.chatsStates.allChatsDatas.aiMessageContent =
      responseData?.assistant_message?.content || null;

    // Store full user and AI message data including uuid for notes functionality
    const userMessage = responseData?.user_message;
    const aiMessage = responseData?.assistant_message;

    // Store latest message data for updating chatMessagesArray with uuid
    state.chatsStates.allChatsDatas.latestUserMessageData = userMessage
      ? {
          uuid: userMessage.uuid || userMessage.id,
          is_saved_to_notes: userMessage.is_saved_to_notes || false,
        }
      : null;

    state.chatsStates.allChatsDatas.latestAiMessageData = aiMessage
      ? {
          uuid: aiMessage.uuid || aiMessage.id,
          is_saved_to_notes: aiMessage.is_saved_to_notes || false,
          suggestions: aiMessage.suggestions || [],
          sources: aiMessage.sources || [],
          generation: aiMessage.generation || null,
        }
      : null;

    // Store message IDs in the messageIDsArray
    const userMessageId = userMessage?.id;
    const aiMessageId = aiMessage?.id;

    // Get current messageIDsArray from globalDataStates
    const currentMessageIds = state.globalDataStates?.messageIDsArray;
    // Add both user and AI message IDs
    state.globalDataStates.messageIDsArray = [
      ...currentMessageIds,
      userMessageId,
      aiMessageId,
    ];

    state.chatsStates.loaderStates.isMessagesFetched = true;
  },
  rejected: (state, { payload }) => {
    console.log("═══════════════════════════════════════════════════════");
    console.log("🔴 SEND MESSAGE - REJECTED");
    console.log("🔴 Error:", JSON.stringify(payload, null, 2));
    console.log("═══════════════════════════════════════════════════════");
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
    state.chatsStates.allChatsDatas.lastNotesActionMessageUuid = match
      ? match[1]
      : null;
  },
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.addToNotes = action?.payload.data.data;
    state.chatsStates.loaderStates.isAddToNotesPending = true;
  },
  rejected: (state, { payload }) => {
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
    state.chatsStates.allChatsDatas.lastNotesActionMessageUuid = match
      ? match[1]
      : null;
  },
  fulfilled: (state, action) => {
    state.chatsStates.allChatsDatas.addToNotes = {};
    state.chatsStates.loaderStates.isRemoveFromNotesPending = true;
  },
  rejected: (state, { payload }) => {
    state.chatsStates.loaderStates.isRemoveFromNotesPending = false;
    state.chatsStates.allChatsDatas.lastNotesActionMessageUuid = null;
  },
};

export const handleUpdateUserMessageForRegeneration = {
  pending: (state) => {
    state.chatsStates.loaderStates.isUserMessageUpdated = "pending";
  },
  fulfilled: (state, action) => {
    state.chatsStates.loaderStates.isUserMessageUpdated = true;
    console.log("User message updated:", action?.payload.data);
  },
  rejected: (state, { payload }) => {
    console.log(payload.message);
    state.chatsStates.loaderStates.isUserMessageUpdated = false;
  },
};

export const handleRegenerateAIResponse = {
  pending: (state) => {
    console.log("pending regenbrate");
    state.chatsStates.loaderStates.isAIResponseRegenerated = "pending";
    state.chatsStates.allChatsDatas.aiMessageContent = null;
    state.toggleStates.toggleIsWaitingForResponse = true;
  },
  fulfilled: (state, action) => {
    const responseData = action?.payload.data.data;
    state.chatsStates.allChatsDatas.regeneratedResponse = responseData;

    // Store AI message content separately (flat structure)
    state.chatsStates.allChatsDatas.aiMessageContent =
      responseData?.content || null;

    // Update message ID in the messageIDsArray at the correct index
    const aiMessageId = responseData?.id;
    const messageIndex =
      state.globalDataStates.currentAIMessageIndexForRegeneration;

    if (aiMessageId && messageIndex !== null && messageIndex >= 0) {
      // Replace the ID at the message index instead of appending
      const updatedMessageIds = [
        ...(state.globalDataStates?.messageIDsArray || []),
      ];
      updatedMessageIds[messageIndex] = aiMessageId;
      state.globalDataStates.messageIDsArray = updatedMessageIds;
      console.log(
        "Updated messageIDsArray at index:",
        messageIndex,
        "with ID:",
        aiMessageId,
      );
    }
    state.chatsStates.loaderStates.isAIResponseRegenerated = true;
    state.toggleStates.toggleIsWaitingForResponse = false;
    console.log("AI response regenerated:", JSON.stringify(responseData));
  },
  rejected: (state, { payload }) => {
    console.log("yfyuyfu");

    console.log(payload, "yfyuyfu");
    state.chatsStates.loaderStates.isAIResponseRegenerated = false;
    state.chatsStates.allChatsDatas.aiMessageContent = null;
    state.toggleStates.toggleIsWaitingForResponse = false;
  },
};

export const handleGetAllMessagesOfParticularChat = {
  pending: (state) => {
    console.log("📨 FETCHING MESSAGES: Starting to fetch all messages for chat...");
    state.chatsStates.loaderStates.isAllMessagesOfChatFetched = "pending";
  },
  fulfilled: (state, action) => {
    console.log("📨 MESSAGES RESPONSE - FULL PAYLOAD:", JSON.stringify(action?.payload, null, 2));
    console.log("📨 MESSAGES RESPONSE - data.data:", JSON.stringify(action?.payload?.data?.data, null, 2));
    const responseData = action?.payload.data.data;
    console.log("📨 MESSAGES: Total messages received:", Array.isArray(responseData) ? responseData.length : 0);

    // Response is directly an array of messages
    const messages = Array.isArray(responseData) ? responseData : [];

    // Transform messages to chatMessagesArray format
    const chatMessagesArray = messages.map((msg) => ({
      role: msg.role === "assistant" ? "ai" : msg.role,
      message: msg.content,
      uuid: msg.id, // Use 'id' from API response
      is_saved_to_notes: msg.added_to_notes || false, // Use 'added_to_notes' from API response
      suggestions: msg.suggestions || [], // Store suggestions from API
      sources: msg.sources || [], // Store sources from API for APA citations
      version: msg.version || 1,
      total_versions: msg.total_versions || 1,
      versions: [
        {
          content: msg.content,
          uuid: msg.uuid || msg.id,
          version: msg.version || 1,
          total_versions: msg.total_versions || 1,
        },
      ],
      generation: msg.generation || null, // Store generation data for badges
      currentVersionIndex: 0,
    }));

    // Extract and store message IDs in messageIDsArray
    // Simply extract IDs in the order they appear (user, ai, user, ai...)
    const messageIDsArray = messages
      .filter((msg) => msg.id) // Only include messages with IDs
      .map((msg) => msg.id);

    // Store transformed data in API slice for the component to pick up
    state.chatsStates.allChatsDatas.fetchedMessages = {
      chatMessagesArray,
      messageIDsArray,
    };

    state.chatsStates.loaderStates.isAllMessagesOfChatFetched = true;
    console.log("All messages fetched:", chatMessagesArray);
    console.log("Message IDs array:", messageIDsArray);
  },
  rejected: (state, { payload }) => {
    console.log("📨 MESSAGES FETCH FAILED - Error:", JSON.stringify(payload, null, 2));
    console.log("📨 MESSAGES FETCH FAILED - Message:", payload?.message || "Failed to fetch messages");
    state.chatsStates.loaderStates.isAllMessagesOfChatFetched = false;
  },
};

export const handleSwitchVersionsOfAIResponse = {
  pending: (state) => {
    console.log("opendihfg switch version");

    state.chatsStates.loaderStates.isVersionSwitched = "pending";
  },
  fulfilled: (state, action) => {
    const responseData = action?.payload.data.data;
    console.log(
      "Version switched - Full Response:",
      JSON.stringify(responseData, null, 2),
    );
    state.chatsStates.allChatsDatas.switchedVersionData = responseData;

    // Get the message index that was stored before the API call
    const messageIndex =
      state.globalDataStates.currentAIMessageIndexForRegeneration;

    if (
      messageIndex !== undefined &&
      messageIndex !== null &&
      messageIndex >= 0
    ) {
      // Update the message at the index with the new version data
      const updatedChatMessagesArray =
        state.globalDataStates.chatMessagesArray.map((msg, index) => {
          if (index === messageIndex) {
            console.log("Updating message at index:", messageIndex);
            console.log("New version:", responseData.version);

            return {
              ...msg,
              message: responseData?.content || msg.message,
              uuid: responseData?.id || msg.uuid,
              version: responseData?.version || msg.version,
              total_versions:
                responseData?.total_versions || msg.total_versions,
              is_active_version: responseData?.is_active_version || false,
              generation: responseData?.generation || msg.generation,
            };
          }
          return msg;
        });

      state.globalDataStates.chatMessagesArray = updatedChatMessagesArray;
      console.log(
        "Updated chatMessagesArray:",
        JSON.stringify(updatedChatMessagesArray[messageIndex], null, 2),
      );

      // Update messageIDsArray with the new ID at the same index
      const newMessageId = responseData?.id;
      if (newMessageId) {
        const updatedMessageIds = [
          ...(state.globalDataStates?.messageIDsArray || []),
        ];
        updatedMessageIds[messageIndex] = newMessageId;
        state.globalDataStates.messageIDsArray = updatedMessageIds;
        console.log(
          "Updated messageIDsArray at index:",
          messageIndex,
          "with ID:",
          newMessageId,
        );
      }
    }

    state.chatsStates.loaderStates.isVersionSwitched = true;
  },
  rejected: (state, { payload }) => {
    console.log(payload?.message || "Failed to switch version");
    state.chatsStates.loaderStates.isVersionSwitched = false;
  },
};

export const handleCompareAIResponses = {
  pending: (state) => {
    // Only set to pending on first call
    if (
      state.chatsStates.loaderStates.isCompareResponsesLoading !== "pending"
    ) {
      state.chatsStates.loaderStates.isCompareResponsesLoading = "pending";
      // Initialize responses array to collect both responses
      state.chatsStates.allChatsDatas.comparisonResponses = { responses: [] };
    }
  },
  fulfilled: (state, action) => {
    const responseData = action?.payload.data.data;
    console.log(
      "Compare AI Response - Single Response:",
      JSON.stringify(responseData, null, 2),
    );

    // Add this response to the responses array
    if (!state.chatsStates.allChatsDatas.comparisonResponses) {
      state.chatsStates.allChatsDatas.comparisonResponses = { responses: [] };
    }

    // Add the response to the array
    state.chatsStates.allChatsDatas.comparisonResponses.responses.push(
      responseData,
    );

    console.log(
      "Current responses count:",
      state.chatsStates.allChatsDatas.comparisonResponses.responses.length,
    );

    // Mark as loaded when we have both responses
    if (
      state.chatsStates.allChatsDatas.comparisonResponses.responses.length === 2
    ) {
      state.chatsStates.loaderStates.isCompareResponsesLoading = true;
      console.log(
        "Both comparison responses received:",
        state.chatsStates.allChatsDatas.comparisonResponses,
      );
    }
  },
  rejected: (state, { payload }) => {
    console.log(payload?.message || "Failed to compare AI responses");
    state.chatsStates.loaderStates.isCompareResponsesLoading = false;
    state.chatsStates.allChatsDatas.comparisonResponses = null;
  },
};

export const handleCompareAIResponsesFirst = {
  pending: (state) => {
    state.chatsStates.loaderStates.isFirstCompareResponseLoading = "pending";
    state.chatsStates.allChatsDatas.firstComparisonResponse = null;
  },
  fulfilled: (state, action) => {
    const responseData = action?.payload.data.data;
    console.log(
      "Compare AI Response - First Response:",
      JSON.stringify(responseData, null, 2),
    );
    state.chatsStates.allChatsDatas.firstComparisonResponse = responseData;
    state.chatsStates.loaderStates.isFirstCompareResponseLoading = true;
  },
  rejected: (state, { payload }) => {
    console.log(
      payload?.message || "Failed to fetch first comparison response",
    );
    state.chatsStates.loaderStates.isFirstCompareResponseLoading = false;
    state.chatsStates.allChatsDatas.firstComparisonResponse = null;
  },
};

export const handleCompareAIResponsesSecond = {
  pending: (state) => {
    state.chatsStates.loaderStates.isSecondCompareResponseLoading = "pending";
    state.chatsStates.allChatsDatas.secondComparisonResponse = null;
  },
  fulfilled: (state, action) => {
    const responseData = action?.payload.data.data;
    console.log(
      "Compare AI Response - Second Response:",
      JSON.stringify(responseData, null, 2),
    );
    state.chatsStates.allChatsDatas.secondComparisonResponse = responseData;
    state.chatsStates.loaderStates.isSecondCompareResponseLoading = true;
  },
  rejected: (state, { payload }) => {
    console.log(
      payload?.message || "Failed to fetch second comparison response",
    );
    state.chatsStates.loaderStates.isSecondCompareResponseLoading = false;
    state.chatsStates.allChatsDatas.secondComparisonResponse = null;
  },
};

export const handleStoreCompareResponses = {
  pending: (state) => {
    state.chatsStates.loaderStates.isStoreCompareResponsePending = "pending";
  },
  fulfilled: (state, action) => {
    const responseData = action?.payload.data.data;
    console.log(
      "Store Compare Response - Full Response:",
      JSON.stringify(responseData, null, 2),
    );

    // Get the AI message index that was stored before comparison
    const messageIndex =
      state.globalDataStates.currentAIMessageIndexForRegeneration;

    if (messageIndex !== null && messageIndex >= 0) {
      // Update the specific message at the stored index
      const updatedChatMessagesArray =
        state.globalDataStates.chatMessagesArray.map((msg, index) => {
          if (index === messageIndex) {
            console.log("Updating message at index:", messageIndex);
            console.log("New version:", responseData.version);
            console.log("Total versions:", responseData.total_versions);
            console.log(
              "Generation data:",
              JSON.stringify(responseData.generation),
            );

            return {
              ...msg,
              message: responseData.content,
              uuid: responseData.id,
              version: responseData.version,
              total_versions: responseData.total_versions,
              is_active_version: responseData.is_active_version,
              generation: responseData.generation, // Store generation data for badges
            };
          }
          return msg;
        });

      state.globalDataStates.chatMessagesArray = updatedChatMessagesArray;
      console.log(
        "Updated chatMessagesArray with compare response:",
        JSON.stringify(updatedChatMessagesArray[messageIndex], null, 2),
      );

      // Update messageIDsArray with the new ID at the same index
      const newMessageId = responseData?.id;
      if (newMessageId) {
        const updatedMessageIds = [
          ...(state.globalDataStates?.messageIDsArray || []),
        ];
        updatedMessageIds[messageIndex] = newMessageId;
        state.globalDataStates.messageIDsArray = updatedMessageIds;
        console.log(
          "Updated messageIDsArray at index:",
          messageIndex,
          "with ID:",
          newMessageId,
        );
      }
    }

    // Store the response for AIMessageBox to read
    state.chatsStates.allChatsDatas.regeneratedResponse = responseData;

    // DO NOT set aiMessageContent - this prevents adding a new message
    // state.chatsStates.allChatsDatas.aiMessageContent = null;

    state.chatsStates.loaderStates.isStoreCompareResponsePending = true;

    // Close the popup by setting all comparison-related toggles to false
    state.toggleStates.toggleCompareStyleState = false;
    state.toggleStates.toggleChangeResponseLLMWhileChatPopup = false;

    console.log("Compare response stored successfully, popup closed");
  },
  rejected: (state, { payload }) => {
    console.log(payload?.message || "Failed to store compare response");
    state.chatsStates.loaderStates.isStoreCompareResponsePending = false;
  },
};

export const handleCompareAIResponseStyles = {
  pending: (state) => {
    // Only set to pending on first call
    if (
      state.chatsStates.loaderStates.isCompareStyleResponsesLoading !==
      "pending"
    ) {
      state.chatsStates.loaderStates.isCompareStyleResponsesLoading = "pending";
      // Initialize responses array to collect both responses
      state.chatsStates.allChatsDatas.comparisonStyleResponses = {
        responses: [],
      };
    }
  },
  fulfilled: (state, action) => {
    const responseData = action?.payload.data.data;
    console.log(
      "Compare AI Response Style - Single Response:",
      JSON.stringify(responseData, null, 2),
    );

    // Add this response to the responses array
    if (!state.chatsStates.allChatsDatas.comparisonStyleResponses) {
      state.chatsStates.allChatsDatas.comparisonStyleResponses = {
        responses: [],
      };
    }

    // Add the response to the array
    state.chatsStates.allChatsDatas.comparisonStyleResponses.responses.push(
      responseData,
    );

    console.log(
      "Current style responses count:",
      state.chatsStates.allChatsDatas.comparisonStyleResponses.responses.length,
    );

    // Mark as loaded when we have both responses
    if (
      state.chatsStates.allChatsDatas.comparisonStyleResponses.responses
        .length === 2
    ) {
      state.chatsStates.loaderStates.isCompareStyleResponsesLoading = true;
      console.log(
        "Both style comparison responses received:",
        state.chatsStates.allChatsDatas.comparisonStyleResponses,
      );
    }
  },
  rejected: (state, { payload }) => {
    console.log(payload?.message || "Failed to compare AI response styles");
    state.chatsStates.loaderStates.isCompareStyleResponsesLoading = false;
    state.chatsStates.allChatsDatas.comparisonStyleResponses = null;
  },
};

export const handleCompareAIResponseStylesFirst = {
  pending: (state) => {
    state.chatsStates.loaderStates.isFirstCompareStyleResponseLoading =
      "pending";
    state.chatsStates.allChatsDatas.firstComparisonStyleResponse = null;
  },
  fulfilled: (state, action) => {
    const responseData = action?.payload.data.data;
    console.log(
      "Compare AI Response Style - First Response:",
      JSON.stringify(responseData, null, 2),
    );
    state.chatsStates.allChatsDatas.firstComparisonStyleResponse = responseData;
    state.chatsStates.loaderStates.isFirstCompareStyleResponseLoading = true;
  },
  rejected: (state, { payload }) => {
    console.log(
      payload?.message || "Failed to fetch first style comparison response",
    );
    state.chatsStates.loaderStates.isFirstCompareStyleResponseLoading = false;
    state.chatsStates.allChatsDatas.firstComparisonStyleResponse = null;
  },
};

export const handleCompareAIResponseStylesSecond = {
  pending: (state) => {
    state.chatsStates.loaderStates.isSecondCompareStyleResponseLoading =
      "pending";
    state.chatsStates.allChatsDatas.secondComparisonStyleResponse = null;
  },
  fulfilled: (state, action) => {
    const responseData = action?.payload.data.data;
    console.log(
      "Compare AI Response Style - Second Response:",
      JSON.stringify(responseData, null, 2),
    );
    state.chatsStates.allChatsDatas.secondComparisonStyleResponse =
      responseData;
    state.chatsStates.loaderStates.isSecondCompareStyleResponseLoading = true;
  },
  rejected: (state, { payload }) => {
    console.log(
      payload?.message || "Failed to fetch second style comparison response",
    );
    state.chatsStates.loaderStates.isSecondCompareStyleResponseLoading = false;
    state.chatsStates.allChatsDatas.secondComparisonStyleResponse = null;
  },
};

export const handleStoreCompareStyleResponses = {
  pending: (state) => {
    state.chatsStates.loaderStates.isStoreCompareStyleResponsePending =
      "pending";
  },
  fulfilled: (state, action) => {
    const responseData = action?.payload.data.data;
    console.log(
      "Store Compare Style Response - Full Response:",
      JSON.stringify(responseData, null, 2),
    );

    // Get the AI message index that was stored before comparison
    const messageIndex =
      state.globalDataStates.currentAIMessageIndexForRegeneration;

    if (messageIndex !== null && messageIndex >= 0) {
      // Update the specific message at the stored index
      const updatedChatMessagesArray =
        state.globalDataStates.chatMessagesArray.map((msg, index) => {
          if (index === messageIndex) {
            console.log("Updating message at index:", messageIndex);
            console.log("New version:", responseData.version);
            console.log("Total versions:", responseData.total_versions);
            console.log(
              "Generation data:",
              JSON.stringify(responseData.generation),
            );

            return {
              ...msg,
              message: responseData.content,
              uuid: responseData.id,
              version: responseData.version,
              total_versions: responseData.total_versions,
              is_active_version: responseData.is_active_version,
              generation: responseData.generation, // Store generation data for badges
            };
          }
          return msg;
        });

      state.globalDataStates.chatMessagesArray = updatedChatMessagesArray;
      console.log(
        "Updated chatMessagesArray with compare style response:",
        JSON.stringify(updatedChatMessagesArray[messageIndex], null, 2),
      );

      // Update messageIDsArray with the new ID at the same index
      const newMessageId = responseData?.id;
      if (newMessageId) {
        const updatedMessageIds = [
          ...(state.globalDataStates?.messageIDsArray || []),
        ];
        updatedMessageIds[messageIndex] = newMessageId;
        state.globalDataStates.messageIDsArray = updatedMessageIds;
        console.log(
          "Updated messageIDsArray at index:",
          messageIndex,
          "with ID:",
          newMessageId,
        );
      }
    }

    // Store the response for AIMessageBox to read
    state.chatsStates.allChatsDatas.regeneratedResponse = responseData;

    // DO NOT set aiMessageContent - this prevents adding a new message
    // state.chatsStates.allChatsDatas.aiMessageContent = null;

    state.chatsStates.loaderStates.isStoreCompareStyleResponsePending = true;

    // Close the popup by setting all comparison-related toggles to false
    state.toggleStates.toggleCompareStyleState = false;
    state.toggleStates.toggleChangeResponseStyleWhileChatPopup = false;

    console.log("Compare style response stored successfully, popup closed");
  },
  rejected: (state, { payload }) => {
    console.log(payload?.message || "Failed to store compare style response");
    state.chatsStates.loaderStates.isStoreCompareStyleResponsePending = false;
  },
};
