import { settingsHandlersFunctions } from "../handlersFunctionsStore";

export const addCaseRejected = (state, action) => {
  const name = action.meta.arg.name;
        if (
        settingsHandlersFunctions[name] &&
        settingsHandlersFunctions[name].rejected
      ) {
        settingsHandlersFunctions[name].rejected(state, action);
      }

}