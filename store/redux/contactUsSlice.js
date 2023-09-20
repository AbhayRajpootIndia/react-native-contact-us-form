import { createSlice } from '@reduxjs/toolkit';

const regName = /^[a-zA-Z0-9]+ [a-zA-Z0-9\s]+[\s]*$/;
// NOTE: ^ wont work for Elon Musk's kid
const regNumber = /[6789]\d{9}$/;
const regEmail = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

const contactUsSlice = createSlice({
  name: 'contactUs',
  initialState: {
    name: '',
    isNameValid: true,
    number: '',
    isNumberValid: true,
    email: '',
    isEmailValid: true,
    message: '',
    isMessageValid: true,
    isFormValid: false,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload.name;

      state.isNameValid =
        regName.test(action.payload.name) && action.payload.name.length > 3;

      state.isFormValid =
        state.isNameValid &&
        state.isNumberValid &&
        state.isEmailValid &&
        state.isMessageValid;
    },
    setNumber: (state, action) => {
      state.number = action.payload.number;

      state.isNumberValid = regNumber.test(action.payload.number);

      state.isFormValid =
        state.isNameValid &&
        state.isNumberValid &&
        state.isEmailValid &&
        state.isMessageValid;
    },
    setEmail: (state, action) => {
      state.email = action.payload.email;

      state.isEmailValid = regEmail.test(action.payload.email);

      state.isFormValid =
        state.isNameValid &&
        state.isNumberValid &&
        state.isEmailValid &&
        state.isMessageValid;
    },
    setMessage: (state, action) => {
      state.message = action.payload.message;

      state.isMessageValid =
        action.payload.message.length >= 50 &&
        action.payload.message.length <= 1000;

      state.isFormValid =
        state.isNameValid &&
        state.isNumberValid &&
        state.isEmailValid &&
        state.isMessageValid;
    },
    validateAll: (state, action) => {
      state.isNameValid = regName.test(state.name) && state.name.length > 3;

      state.isNumberValid = regNumber.test(state.number);

      state.isEmailValid = regEmail.test(state.email);

      state.isMessageValid =
        state.message.length >= 50 && state.message.length <= 1000;

      state.isFormValid =
        state.isNameValid &&
        state.isNumberValid &&
        state.isEmailValid &&
        state.isMessageValid;
    },
  },
});

export const setName = contactUsSlice.actions.setName;
export const setNumber = contactUsSlice.actions.setNumber;
export const setEmail = contactUsSlice.actions.setEmail;
export const setMessage = contactUsSlice.actions.setMessage;
export const validateAll = contactUsSlice.actions.validateAll;

export default contactUsSlice.reducer;
