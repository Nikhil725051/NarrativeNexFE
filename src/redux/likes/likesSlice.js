import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addOrRemoveLike: null
}


export const likesSlice = createSlice({
  name: "like",
  initialState: initialState,
  reducers: {
   addOrRemoveLike: (state, action) => {
    state.addOrRemoveLike = action.payload
   }
  },
});

export const { addOrRemoveLike } = likesSlice.actions;
