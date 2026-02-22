import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  token: null,
  refreshToken: null,
};

const userAuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.userData = null;
      state.token = null;
      state.refreshToken = null;
    },
    setUserData: (state, action) => {
      state.userData = action.payload.userData;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    mergeAuthState: (state, action) => {
      const payload = action.payload;
      if (payload.userData !== undefined) state.userData = payload.userData;
    },
  },
});

export const { clearUser, setUserData, mergeAuthState } = userAuthSlice.actions;
export default userAuthSlice.reducer;
