import {
  settingsHandlersFunctions,
  roomsHandlersFunctions,
  notesHandlersFunctions,
  chatsHandlersFunctions,
  attachmentsHandlersFunctions,
  searchHandlersFunctions,
  walletHandlersFunctions,
} from "../handlersFunctionsStore";

export const addCaseFulfilled = (state, action) => {
  const name = action.meta.arg.name;

  if (settingsHandlersFunctions[name]?.fulfilled) {
    settingsHandlersFunctions[name].fulfilled(state, action);
  } else if (roomsHandlersFunctions[name]?.fulfilled) {
    roomsHandlersFunctions[name].fulfilled(state, action);
  } else if (notesHandlersFunctions[name]?.fulfilled) {
    notesHandlersFunctions[name].fulfilled(state, action);
  } else if (chatsHandlersFunctions[name]?.fulfilled) {
    chatsHandlersFunctions[name].fulfilled(state, action);
  } else if (attachmentsHandlersFunctions[name]?.fulfilled) {
    attachmentsHandlersFunctions[name].fulfilled(state, action);
  } else if (searchHandlersFunctions[name]?.fulfilled) {
    searchHandlersFunctions[name].fulfilled(state, action);
  } else if (walletHandlersFunctions[name]?.fulfilled) {
    walletHandlersFunctions[name].fulfilled(state, action);
  }
};
