import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SETUSER: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("auth-user", JSON.stringify(state.user));
    },
    REMOVEUSER: (state) => {
      state.user = null;
      localStorage.removeItem("auth-user");
    },
  },
});

export const { SETUSER, REMOVEUSER } = authSlice.actions;
export const authReducer = authSlice.reducer;
