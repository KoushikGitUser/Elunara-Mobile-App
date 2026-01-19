import { triggerToast } from "../../services/toast";

// GET /chats/:uuid/notes - Get notes for a chat
export const handleGetNotes = {
  pending: (state) => {
    state.notesStates.fetchingNotes = true;
  },
  fulfilled: (state, action) => {
    state.notesStates.currentChatNotes = action?.payload?.data?.data || null;
    state.notesStates.fetchingNotes = false;
  },
  rejected: (state, action) => {
    state.notesStates.fetchingNotes = false;
    state.notesStates.currentChatNotes = null;
  },
};

// PUT /chats/:uuid/notes - Update (save) notes
export const handleUpdateNotes = {
  pending: (state) => {
    state.notesStates.savingNote = true;
  },
  fulfilled: (state, action) => {
    state.notesStates.savingNote = false;
    const updatedNote = action?.payload?.data?.data;
    if (updatedNote) {
      state.notesStates.currentChatNotes = updatedNote;
    }
    // triggerToast("Success", "Notes saved successfully", "success", 3000); // Optional: Toast might be annoying on auto-save
  },
  rejected: (state, action) => {
    state.notesStates.savingNote = false;
    triggerToast(
      "Error",
      action?.payload?.message || "Failed to save notes",
      "error",
      3000,
    );
  },
};

// DELETE /chats/:uuid/notes - Delete notes
export const handleDeleteNotes = {
  pending: (state) => {
    state.notesStates.deletingNote = true;
  },
  fulfilled: (state, action) => {
    state.notesStates.deletingNote = false;
    state.notesStates.currentChatNotes = null;
    triggerToast("Success", "Notes deleted successfully", "success", 3000);
  },
  rejected: (state, action) => {
    state.notesStates.deletingNote = false;
    triggerToast(
      "Error",
      action?.payload?.message || "Failed to delete notes",
      "error",
      3000,
    );
  },
};
