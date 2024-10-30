import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {}, // This will hold the user data
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload; // Update user state with the payload
    },
    clearUser: (state) => {
      state.value = {}; // Clear user data
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
