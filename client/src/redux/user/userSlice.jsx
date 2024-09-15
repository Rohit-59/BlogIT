import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    currentUser:null,
    error:null,
    loading:false
}

 const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
     state.loading = true;
     state.error = null;
    },
    removeError: (state) => {
      state.loading = false;
      state.error = null;
      state.currentUser = null
     },
    signInSuccess: (state,action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteSuccess: (state, action) => {
      state.currentUser = null;
        state.loading = false;
        state.error = null;
    },
    deleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    signoutSuccess: (state, action) => {
      state.currentUser = null;
        state.loading = false;
        state.error = null;
    }
  }
})

export const { signInStart,removeError, signInSuccess, signInFailure, updateFailure,updateSuccess,updateStart,deleteStart,deleteFailure,deleteSuccess,signoutSuccess} = userSlice.actions

export default userSlice.reducer