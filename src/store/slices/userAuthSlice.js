import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: null,
  isRegistered: false,
};

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.address = null;
      state.isRegistered = false;
    },
    setUserData: (state, action) => {
      state.address = action.payload.address;
    },
    setIsRegistered: (state, action) => {
      state.isRegistered = action.payload.isRegistered;
    },
  },
});

export const { clearUser, setUserData, setIsRegistered } = userAuthSlice.actions;
export default userAuthSlice.reducer;
