import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  content: "",
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog: (state, action) => {
      state.title = action.payload.title;
      state.content = action.payload.content;
    },
    clearBlog: (state) => {
      state.title = "";
      state.content = "";
    },
  },
});

export const { setBlog, clearBlog } = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
