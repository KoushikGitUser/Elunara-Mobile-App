import { triggerToast } from "../../services/toast";

// GET /rooms - Get all rooms
export const handleGetRooms = {
  pending: (state) => {
    state.roomsStates.fetchingRooms = true;
  },
  fulfilled: (state, action) => {
    const rooms = action?.payload?.data?.data || [];
    state.roomsStates.rooms = rooms.map((room) => ({
      ...room,
      uuid: room.id || room.uuid,
    }));
    state.roomsStates.fetchingRooms = false;
  },
  rejected: (state, action) => {
    state.roomsStates.fetchingRooms = false;
  },
};

// POST /rooms - Create a room
export const handleCreateRoom = {
  pending: (state) => {
    state.roomsStates.creatingRoom = true;
  },
  fulfilled: (state, action) => {
    state.roomsStates.creatingRoom = false;
    const newRoom = action?.payload?.data?.data;
    if (newRoom) {
      const roomWithUuid = { ...newRoom, uuid: newRoom.id || newRoom.uuid };
      state.roomsStates.rooms = [roomWithUuid, ...state.roomsStates.rooms];
      // Set as current room so room details screen can access it
      state.roomsStates.currentRoom = roomWithUuid;
    }
    triggerToast("Success", "Room created successfully", "success", 3000);
  },
  rejected: (state, action) => {
    state.roomsStates.creatingRoom = false;
    const errorMessage =
      action?.payload?.data?.message ||
      action?.payload?.message ||
      action?.error?.message ||
      "Failed to create room";
    triggerToast("Error", errorMessage, "error", 3000);
  },
};

// GET /rooms/pinned - Get pinned rooms
export const handleGetPinnedRooms = {
  pending: (state) => {
    state.roomsStates.fetchingPinnedRooms = true;
  },
  fulfilled: (state, action) => {
    const allRooms = action?.payload?.data?.data || [];
    // Workaround: Backend /rooms/pinned 404s, and /rooms returning all. Filter client-side.
    const pinnedRooms = allRooms.filter((room) => room.is_pinned);

    state.roomsStates.pinnedRooms = pinnedRooms.map((room) => ({
      ...room,
      uuid: room.id || room.uuid,
    }));
    state.roomsStates.fetchingPinnedRooms = false;
  },
  rejected: (state, action) => {
    state.roomsStates.fetchingPinnedRooms = false;
  },
};

// POST /rooms/bulk - Bulk operations on rooms
export const handleBulkOperations = {
  pending: (state) => {
    state.roomsStates.operatingBulkRooms = true;
  },
  fulfilled: (state, action) => {
    state.roomsStates.operatingBulkRooms = false;
    triggerToast("Success", "Bulk operation completed", "success", 3000);
  },
  rejected: (state, action) => {
    state.roomsStates.operatingBulkRooms = false;
    triggerToast(
      "Error",
      action?.payload?.message || "Bulk operation failed",
      "error",
      3000
    );
  },
};

// GET /rooms/:uuid - Get a single room
export const handleGetRoom = {
  pending: (state) => {
    state.roomsStates.fetchingRoom = true;
  },
  fulfilled: (state, action) => {
    console.log("═══════════════════════════════════════════════════════");
    console.log("🏠 GET ROOM - FULFILLED");
    console.log("🏠 Full response:", JSON.stringify(action?.payload?.data, null, 2));
    console.log("═══════════════════════════════════════════════════════");
    const room = action?.payload?.data?.data;
    state.roomsStates.currentRoom = room
      ? { ...room, uuid: room.id || room.uuid }
      : null;
    state.roomsStates.fetchingRoom = false;
  },
  rejected: (state, action) => {
    console.log("🏠 GET ROOM - REJECTED:", action?.payload?.message || "Unknown error");
    state.roomsStates.fetchingRoom = false;
  },
};

// PUT /rooms/:uuid - Update a room
export const handleUpdateRoom = {
  pending: (state) => {
    state.roomsStates.updatingRoom = true;
  },
  fulfilled: (state, action) => {
    state.roomsStates.updatingRoom = false;
    const updatedRoom = action?.payload?.data?.data;
    if (updatedRoom) {
      const roomWithUuid = {
        ...updatedRoom,
        uuid: updatedRoom.id || updatedRoom.uuid,
      };
      state.roomsStates.rooms = state.roomsStates.rooms.map((room) =>
        room.uuid === roomWithUuid.uuid ? roomWithUuid : room
      );
      if (state.roomsStates.currentRoom?.uuid === roomWithUuid.uuid) {
        state.roomsStates.currentRoom = roomWithUuid;
      }
    }
    triggerToast("Success", "Room updated successfully", "success", 3000);
  },
  rejected: (state, action) => {
    state.roomsStates.updatingRoom = false;
    triggerToast(
      "Error",
      action?.payload?.message || "Failed to update room",
      "error",
      3000
    );
  },
};

// DELETE /rooms/:uuid - Delete a room
export const handleDeleteRoom = {
  pending: (state) => {
    state.roomsStates.deletingRoom = true;
  },
  fulfilled: (state, action) => {
    state.roomsStates.deletingRoom = false;
    const deletedUuid = action?.meta?.arg?.uuid;
    if (deletedUuid) {
      state.roomsStates.rooms = state.roomsStates.rooms.filter(
        (room) => room.uuid !== deletedUuid
      );
    }
    triggerToast("Success", "Room deleted successfully", "success", 3000);
  },
  rejected: (state, action) => {
    state.roomsStates.deletingRoom = false;
    triggerToast(
      "Error",
      action?.payload?.message || "Failed to delete room",
      "error",
      3000
    );
  },
};

// POST /rooms/:uuid/pin - Pin a room
export const handlePinRoom = {
  pending: (state) => {
    state.roomsStates.pinningRoom = true;
  },
  fulfilled: (state, action) => {
    state.roomsStates.pinningRoom = false;
    triggerToast("Success", "Room pinned", "success", 3000);
    const pinnedUuid = action.meta.arg.url.split("/")[2];
    if (pinnedUuid) {
      // Find the room in the main list
      const roomToPin = state.roomsStates.rooms.find(
        (r) => r.uuid === pinnedUuid || r.id === pinnedUuid
      );

      // Add to pinnedRooms if found and not already there
      if (roomToPin) {
        const alreadyPinned = state.roomsStates.pinnedRooms.some(
          (r) => r.uuid === pinnedUuid || r.id === pinnedUuid
        );
        if (!alreadyPinned) {
          state.roomsStates.pinnedRooms = [
            roomToPin,
            ...state.roomsStates.pinnedRooms,
          ];
        }
      }
    }
  },
  rejected: (state, action) => {
    state.roomsStates.pinningRoom = false;
    triggerToast(
      "Error",
      action?.payload?.message || "Failed to pin room",
      "error",
      3000
    );
  },
};

// POST /rooms/:uuid/unpin - Unpin a room
export const handleUnpinRoom = {
  pending: (state) => {
    state.roomsStates.unpinningRoom = true;
  },
  fulfilled: (state, action) => {
    state.roomsStates.unpinningRoom = false;
    triggerToast("Success", "Room unpinned", "success", 3000);

    // Optimistic Update
    // Extract UUID from URL: /rooms/:uuid/unpin
    // expected format: /rooms/7c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f/unpin
    // split('/') gives ["", "rooms", "uuid", "unpin"] -> index 2
    const unpinnedUuid =
      action.meta?.arg?.url?.split("/")[2] || action.meta?.arg?.uuid;

    if (unpinnedUuid) {
      state.roomsStates.pinnedRooms = state.roomsStates.pinnedRooms.filter(
        (r) => (r.uuid || r.id) !== unpinnedUuid
      );
    }
  },
  rejected: (state, action) => {
    state.roomsStates.unpinningRoom = false;
    triggerToast(
      "Error",
      action?.payload?.message || "Failed to unpin room",
      "error",
      3000
    );
  },
};

// GET /rooms/:uuid/chats - Get chats in a room
export const handleGetRoomChats = {
  pending: (state) => {
    state.roomsStates.fetchingRoomChats = true;
  },
  fulfilled: (state, action) => {
    state.roomsStates.roomChats = action?.payload?.data?.data || [];
    state.roomsStates.fetchingRoomChats = false;
  },
  rejected: (state, action) => {
    state.roomsStates.fetchingRoomChats = false;
  },
};

// POST /rooms/:uuid/chats - Add chats to a room
export const handleAddChatsToRoom = {
  pending: (state) => {
    state.roomsStates.addingChatsToRoom = true;
  },
  fulfilled: (state, action) => {
    state.roomsStates.addingChatsToRoom = false;
    triggerToast("Success", "Chats added to room", "success", 3000);
  },
  rejected: (state, action) => {
    state.roomsStates.addingChatsToRoom = false;
    triggerToast(
      "Error",
      action?.payload?.message || "Failed to add chats to room",
      "error",
      3000
    );
  },
};

// GET /rooms/:uuid/available-chats - Get available chats for a room
export const handleGetAvailableChats = {
  pending: (state) => {
    state.roomsStates.fetchingAvailableChats = true;
  },
  fulfilled: (state, action) => {
    state.roomsStates.availableChats = action?.payload?.data?.data || [];
    state.roomsStates.fetchingAvailableChats = false;
  },
  rejected: (state, action) => {
    state.roomsStates.fetchingAvailableChats = false;
  },
};

// POST /rooms/:uuid/undo-delete - Undo room deletion
export const handleUndoDeleteRoom = {
  pending: (state) => {
    state.roomsStates.undoingDeleteRoom = true;
  },
  fulfilled: (state, action) => {
    state.roomsStates.undoingDeleteRoom = false;
    triggerToast("Success", "Room restored", "success", 3000);
  },
  rejected: (state, action) => {
    state.roomsStates.undoingDeleteRoom = false;
    triggerToast(
      "Error",
      action?.payload?.message || "Failed to restore room",
      "error",
      3000
    );
  },
};
