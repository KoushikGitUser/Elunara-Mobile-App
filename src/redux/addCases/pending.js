import {
  settingsHandlersFunctions,
  roomsHandlersFunctions,
  notesHandlersFunctions,
  chatsHandlersFunctions,
  attachmentsHandlersFunctions,
  searchHandlersFunctions,
} from "../handlersFunctionsStore";

export const addCasePending = (state, action) => {
  const name = action.meta.arg.name;

  if (settingsHandlersFunctions[name]?.pending) {
    settingsHandlersFunctions[name].pending(state, action);
  } else if (roomsHandlersFunctions[name]?.pending) {
    roomsHandlersFunctions[name].pending(state, action);
  } else if (notesHandlersFunctions[name]?.pending) {
    notesHandlersFunctions[name].pending(state, action);
  } else if (chatsHandlersFunctions[name]?.pending) {
    chatsHandlersFunctions[name].pending(state, action);
  } else if (attachmentsHandlersFunctions[name]?.pending) {
    attachmentsHandlersFunctions[name].pending(state, action);
  } else if (searchHandlersFunctions[name]?.pending) {
    searchHandlersFunctions[name].pending(state, action);
  }
};
