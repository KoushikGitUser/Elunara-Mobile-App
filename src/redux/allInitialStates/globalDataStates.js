export const globalDataStates = {
  chatMessagesArray: [],
  messageIDsArray: [], // Stores message IDs in order: [userMessageId, aiMessageId, userMessageId, aiMessageId, ...]
  userMessagePrompt: "",
  allMessagesForAChat: null,
  selectedFiles: [],
  uploadedAttachmentIds: [], // Stores uploaded attachment IDs for sending with message
  isUploadingAttachment: false, // Tracks if attachment is currently uploading 
  noteForIndividualChat: null,            
  chatInputContentLinesNumber:0,
  currentSelectedTopic: null,
  chatTitleOnLongPress:null,
  userMessageOnLongPress:null,
  editingMessageData:null, // {message: string, messageIndex: number, chat: object}
  settingsInnerPageHeaderTitle:"",
  settingsInnerPageComponentToRender:"General Settings",
  compareResponseStyleItemsArray:[],
  deleteConfirmPopupFrom:"chat",
  guidedTourStepsCount:0,
  profilePictureAvatar:null,
  profilePictureType:"photo", //or avatar
  userMailIDOnSignup:"",
  userMailIDOnForgotPassword:"",
  userOTPOnForgotPassword:"",
  userMobileNumberForMobileVerification:"",
  manualGuidedTourRunning:false,
  navigationBasicsGuideTourSteps:0,
  chatFunctionsGuideTourSteps:0,
  learningLabsGuideTourSteps:0,

  // chats states
  selectedSubjectID:1,
  selectedTopicsID:1,
  currentAIMessageIndexForRegeneration: null, // Stores AI message index for regeneration (to get UUID from messageIDsArray)
};

export const demoChatMessages = [
  {
    role:"user",
    message:"Hello",
    file:null,//optional
  },
  {
    role:"ai",
    message:"Hello,How can I help you today?",
    file:null,//optional
    uuid: null,
    is_saved_to_notes: false,
    versions: [], // Array to store all versions: [{content: string, uuid: string, version: number, total_versions: number}]
    currentVersionIndex: 0, // Index of currently displayed version in versions array
  },
]
