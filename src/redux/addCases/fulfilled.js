import {
  chatsHandlersFunctions,
  settingsHandlersFunctions,
} from "../handlersFunctionsStore";

export const addCaseFulfilled = (state, action) => {
  const name = action.meta.arg.name;
  if (
    settingsHandlersFunctions[name] &&
    settingsHandlersFunctions[name].fulfilled
  ) {
    settingsHandlersFunctions[name].fulfilled(state, action);
  } else if (
    chatsHandlersFunctions[name] &&
    chatsHandlersFunctions[name].fulfilled
  ) {
    chatsHandlersFunctions[name].fulfilled(state, action);
  }
};
