import { configureStore } from "@reduxjs/toolkit";
import { apiStatusSlice } from "./apiStatus/apiStatusSlice";
import { authSlice } from "./auth/authSlice";
import authListenerMiddleware from "../utils/authListenerMiddleware";
import { storySlice } from "./story/storySlice";
import { modalSlice } from "./modal/modalSlice";
import { chapterSlice } from "./chapter/chapterSlice";
import { likesSlice } from "./likes/likesSlice";
import { commentsSlice } from "./comments/commentsSlice";

const store = configureStore({
  reducer: {
    apiStatus: apiStatusSlice.reducer,
    auth: authSlice.reducer,
    story: storySlice.reducer,
    modal: modalSlice.reducer,
    chapter: chapterSlice.reducer,
    likes: likesSlice.reducer,
    comment: commentsSlice.reducer
  },
  middleware: (getDefaultMiddlewrae) =>
    getDefaultMiddlewrae().prepend(authListenerMiddleware.middleware), //For persistent auth state
});

export default store;
