import {
  chatsHandlersFunctions,
  settingsHandlersFunctions,
} from "../handlersFunctionsStore";

export const addCaseRejected = (state, action) => {
  const name = action.meta.arg.name;
  if (
    settingsHandlersFunctions[name] &&
    settingsHandlersFunctions[name].rejected
  ) {
    settingsHandlersFunctions[name].rejected(state, action);
  } else if (
    chatsHandlersFunctions[name] &&
    chatsHandlersFunctions[name].rejected
  ) {
    chatsHandlersFunctions[name].rejected(state, action);
  }
};
