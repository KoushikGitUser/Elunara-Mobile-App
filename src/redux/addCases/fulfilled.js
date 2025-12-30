import { settingsHandlersFunctions } from "../handlersFunctionsStore";

export const addCaseFulfilled = (state, action) => {
  const name = action.meta.arg.name;
    console.log(name,"name ful");
      if (
      settingsHandlersFunctions[name] &&
      settingsHandlersFunctions[name].fulfilled
    ) {
      settingsHandlersFunctions[name].fulfilled(state, action);
    }

}