import { createSlice } from '@reduxjs/toolkit';

const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState: {
    isKeyboardVisible: false,
  },
  reducers: {
    setIsKeyboardVisible: (state, action) => {
      state.isKeyboardVisible = action.payload.isKeyboardVisible;
    },
  },
});

export const setIsKeyboardVisible = keyboardSlice.actions.setIsKeyboardVisible;

export default keyboardSlice.reducer;
