import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allComments: null,
    addComment: null,
}


export const commentsSlice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {
    allComments: (state, action) => {
     state.allComments = action.payload
    },
    addComment: (state, action) => {
      state.addComment = action.payload
     },
    
  },
});

export const { allComments, addComment } = commentsSlice.actions;
