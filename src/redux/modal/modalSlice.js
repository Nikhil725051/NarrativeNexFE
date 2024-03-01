import { createSlice } from "@reduxjs/toolkit";

const initialState ={
addStoryModal: false,
storyAddedModal: false,
commentsModal: false
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        setAddStoryModal: (state, action) => {
            state.addStoryModal = action.payload;
        },
        setStoryAddedModal: (state, action) => {
            state.storyAddedModal = action.payload;
        },

        setCommentsModal: (state, action) => {
            state.commentsModal = action.payload;
        }

    }
});

export const {setAddStoryModal, setStoryAddedModal, setCommentsModal} = modalSlice.actions;