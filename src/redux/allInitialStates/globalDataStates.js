export const globalDataStates = {
  chatMessagesArray: [],
  userMessagePrompt: "",
  allMessagesForAChat: null,
  selectedFiles: [], 
  noteForIndividualChat: null,
  chatInputContentLinesNumber:0,
  currentSelectedTopic: null,
  chatTitleOnLongPress:null,
  userMessageOnLongPress:null,
  settingsInnerPageHeaderTitle:"",
  settingsInnerPageComponentToRender:"General Settings",
  compareResponseStyleItemsArray:[],
  deleteConfirmPopupFrom:"chat",
  guidedTourStepsCount:0,
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
  },
]
