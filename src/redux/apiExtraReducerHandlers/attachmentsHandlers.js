import { triggerToast } from "../../services/toast";

// POST /attachments - Upload an attachment
export const handleUploadAttachment = {
  pending: (state) => {
    state.attachmentsStates.uploadingAttachment = true;
    state.attachmentsStates.attachmentUploaded = false;
  },
  fulfilled: (state, action) => {
    state.attachmentsStates.uploadingAttachment = false;
    state.attachmentsStates.attachmentUploaded = true;
    state.attachmentsStates.lastUploadedAttachment =
      action?.payload?.data?.data;
    triggerToast(
      "Success",
      "Attachment uploaded successfully",
      "success",
      3000,
    );
  },
  rejected: (state, action) => {
    state.attachmentsStates.uploadingAttachment = false;
    state.attachmentsStates.attachmentUploaded = false;
    triggerToast(
      "Error",
      action?.payload?.message || "Failed to upload attachment",
      "error",
      3000,
    );
  },
};

// DELETE /attachments/:uuid - Delete an attachment
export const handleDeleteAttachment = {
  pending: (state) => {
    state.attachmentsStates.deletingAttachment = true;
    state.attachmentsStates.attachmentDeleted = false;
  },
  fulfilled: (state, action) => {
    state.attachmentsStates.deletingAttachment = false;
    state.attachmentsStates.attachmentDeleted = true;
    triggerToast("Success", "Attachment deleted successfully", "success", 3000);
  },
  rejected: (state, action) => {
    state.attachmentsStates.deletingAttachment = false;
    state.attachmentsStates.attachmentDeleted = false;
    triggerToast(
      "Error",
      action?.payload?.message || "Failed to delete attachment",
      "error",
      3000,
    );
  },
};

// GET /attachments/:uuid - Get an attachment
export const handleGetAttachment = {
  pending: (state) => {
    state.attachmentsStates.fetchingAttachment = true;
  },
  fulfilled: (state, action) => {
    state.attachmentsStates.currentAttachment =
      action?.payload?.data?.data || null;
    state.attachmentsStates.fetchingAttachment = false;
  },
  rejected: (state, action) => {
    state.attachmentsStates.fetchingAttachment = false;
  },
};
