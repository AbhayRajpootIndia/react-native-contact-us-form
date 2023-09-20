import { configureStore } from '@reduxjs/toolkit';

import keyboardReducer from './keyboardSlice';
import contactUsReducer from './contactUsSlice';

export default store = configureStore({
  reducer: {
    keyboard: keyboardReducer,
    contactUs: contactUsReducer,
  },
});
