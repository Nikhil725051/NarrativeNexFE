import { callAPI } from "../../utils/api"
import { createStory, stories } from "./storySlice"


export const storiesThunk = (payload) => (dispatch) => {
    callAPI({
        payload,
        dispatch,
        method: 'GET',
        apiEndpoint: '/stories',
        apiStatusKey: 'stories',
        dataAction: stories
    })
}

export const createStoryThunk = (payload) => (dispatch) => {
    callAPI({
        payload,
        dispatch,
        method: 'POST',
        apiEndpoint: '/stories/create',
        apiStatusKey: 'createStory',
        dataAction: createStory
    })
}