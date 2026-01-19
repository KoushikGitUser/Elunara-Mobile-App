import { createAction } from '@reduxjs/toolkit';

// Action to reset all Redux states on logout
export const resetAllStates = createAction('RESET_ALL_STATES');
