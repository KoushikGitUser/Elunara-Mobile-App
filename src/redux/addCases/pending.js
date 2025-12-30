import { settingsHandlersFunctions } from "../handlersFunctionsStore";

export const addCasePending = (state, action) => {
  const name = action.meta.arg.name;
  console.log(name,"name");
  
    if (
    settingsHandlersFunctions[name] &&
    settingsHandlersFunctions[name].pending
  ) {
    settingsHandlersFunctions[name].pending(state, action);
  }
}