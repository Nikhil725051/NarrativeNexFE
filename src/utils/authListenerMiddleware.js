import { createListenerMiddleware } from "@reduxjs/toolkit";
import { logIn, logOut, refreshToken, signUp } from "../redux/auth/authSlice";
import store from "../redux/store";
const authListenerMiddleware = createListenerMiddleware();
authListenerMiddleware.startListening({
  actionCreator: logIn,
  effect: (action, listenerApi) => {
    //Persist auth state in local storage
    const authState = store.getState().auth;
    localStorage.setItem("auth", JSON.stringify(authState));
  },
});

authListenerMiddleware.startListening({
  actionCreator: signUp,
  effect: (action, listenerApi) => {
    //Persist auth state in local storage
    const authState = store.getState().auth;
    localStorage.setItem("auth", JSON.stringify(authState));
  },
});

authListenerMiddleware.startListening({
  actionCreator: refreshToken,
  effect: (action, listenerApi) => {
    //Persist auth state in local storage
    const authState = store.getState().auth;
    localStorage.setItem("auth", JSON.stringify(authState));
  },
});

authListenerMiddleware.startListening({
  actionCreator: logOut,
  effect: (action, listenerApi) => {
    //Clear auth state in local storage
    localStorage.removeItem("auth");
  },
});

export default authListenerMiddleware;
