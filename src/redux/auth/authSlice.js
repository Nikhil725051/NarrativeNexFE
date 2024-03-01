import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : {
      isLoggedIn: false,
      name: "",
      email: "",
      username: "",
      accessToken: "",
      refreshToken: "",
    };


export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    signUp: (state, action) => {
      return { ...action.payload, isLoggedIn: true };
    },
    logIn: (state, action) => {
      return { ...action.payload, isLoggedIn: true };
    },
    logOut: (state, action) => {
      return {
        isLoggedIn: false,
        name: "",
        username: "",
        email: "",
        accessToken: "",
        refreshToken: "",
      };
    },
    refreshToken: (state, action) => {
      return { ...state, accessToken: action.payload.accessToken };
    },
  },
});

export const { signUp, logIn, logOut, refreshToken } = authSlice.actions;
