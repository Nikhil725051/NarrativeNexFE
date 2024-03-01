import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stories: null,
  createStory: null,
};

export const storySlice = createSlice({
  name: "story",
  initialState: initialState,
  reducers: {
    stories: (state, action) => {
      state.stories = action.payload;
    },
    createStory: (state, action) => {
      state.createStory = action.payload;
      const newStory = {
        ...action.payload,
        id: action.payload.storyId,
        likeCount: 0,
        commentCount: 0,
      };
      state.stories.push(newStory);
    },
  },
});

export const { stories, createStory } = storySlice.actions;
