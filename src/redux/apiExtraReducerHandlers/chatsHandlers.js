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
      3000
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
      3000
    );
  },
};
