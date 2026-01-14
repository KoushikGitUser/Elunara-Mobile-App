import {
  chatsHandlersFunctions,
  settingsHandlersFunctions,
} from "../handlersFunctionsStore";

export const addCasePending = (state, action) => {
  const name = action.meta.arg.name;
  if (
    settingsHandlersFunctions[name] &&
    settingsHandlersFunctions[name].pending
  ) {
    settingsHandlersFunctions[name].pending(state, action);
  } else if (
    chatsHandlersFunctions[name] &&
    chatsHandlersFunctions[name].pending
  ) {
    chatsHandlersFunctions[name].pending(state, action);
  }
};
