import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from './slices/userAuthSlice';
import commanReducer from './slices/commanSlice';

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    comman: commanReducer,
  },
});

export default store;
