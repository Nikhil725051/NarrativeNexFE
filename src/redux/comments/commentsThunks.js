import { callAPI } from "../../utils/api"
import { addComment, allComments } from "./commentsSlice"


export const allCommentsThunk = (payload) => (dispatch) => {
    callAPI({
        payload,
        dispatch,
        method: 'POST',
        apiEndpoint: '/comments',
        apiStatusKey: 'comments',
        dataAction: allComments
    })
}

export const addCommentThunk = (payload) => (dispatch) => {
    callAPI({
        payload,
        dispatch,
        method: 'POST',
        apiEndpoint: '/comments/addComment',
        apiStatusKey: 'addComment',
        dataAction: addComment
    })
}