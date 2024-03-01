import { createSlice } from '@reduxjs/toolkit'

export const apiStatusSlice = createSlice({
    name: 'apiStatus',
    initialState: {},
    reducers: {
        startLoading: (state, action) => {
            return {
                ...state,
                [action.payload.apiStatusKey]: {success: null, isLoading: true, message: '' }
            }
        },
        loadingSucceeded: (state, action) => {
            return {
                ...state,
                [action.payload.apiStatusKey]: {success: true, isLoading: false, message: action.payload.message }
            }
        },
        loadingFailed: (state, action) => {
            return {
                ...state,
                [action.payload.apiStatusKey]: {success: false, isLoading: false, message: action.payload.message }
            }
        },
        //Resetting loading states depends on specific application needs
        loadingStateReset: (state, action) => {
            return {
                ...state,
                [action.payload.apiStatusKey]: {success: null, isLoading: null, message: '' }
            }
        },
    }
});

export const {
    startLoading,
    loadingSucceeded,
    loadingFailed,
    loadingStateReset,
} = apiStatusSlice.actions;