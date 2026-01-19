import {
  settingsHandlersFunctions,
  roomsHandlersFunctions,
  notesHandlersFunctions,
  chatsHandlersFunctions,
  attachmentsHandlersFunctions,
  searchHandlersFunctions,
} from "../handlersFunctionsStore";

export const addCaseRejected = (state, action) => {
  const name = action.meta.arg.name;

  if (settingsHandlersFunctions[name]?.rejected) {
    settingsHandlersFunctions[name].rejected(state, action);
  } else if (roomsHandlersFunctions[name]?.rejected) {
    roomsHandlersFunctions[name].rejected(state, action);
  } else if (notesHandlersFunctions[name]?.rejected) {
    notesHandlersFunctions[name].rejected(state, action);
  } else if (chatsHandlersFunctions[name]?.rejected) {
    chatsHandlersFunctions[name].rejected(state, action);
  } else if (attachmentsHandlersFunctions[name]?.rejected) {
    attachmentsHandlersFunctions[name].rejected(state, action);
  } else if (searchHandlersFunctions[name]?.rejected) {
    searchHandlersFunctions[name].rejected(state, action);
  }
};
