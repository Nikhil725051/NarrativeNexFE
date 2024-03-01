import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chapters: null,
    addChapter: null
}


export const chapterSlice = createSlice({
  name: "chapter",
  initialState: initialState,
  reducers: {
    fetchAllChapters: (state, action) => {
      state.chapters = action.payload
    },
    addChapter: (state, action) => {
      state.addChapter = action.payload
    },
  },
});

export const { fetchAllChapters, addChapter } = chapterSlice.actions;
