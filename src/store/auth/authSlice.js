import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // 'checking' 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, { payload } ) => {
      state.status= 'authenticated';
      state.uid= payload.uid;
      state.email= payload.email;
      state.displayName= payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = payload.errorMessage;
    },
    // yo espero aca que si salgo de mi cuenta vuelva todo a su estado inicial:
    logout: (state, { payload }) => {
      state.status= 'not-authenticated';
      state.uid= null;
      state.email= null;
      state.displayName= null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage;
    },
    // cuando vaya a iniciar que haga un checking de mi información
    checkingCredentials: (state) => {
      state.status = 'checking'
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;