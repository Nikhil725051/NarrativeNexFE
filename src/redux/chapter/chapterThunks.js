import { callAPI } from "../../utils/api"
import { addChapter, fetchAllChapters } from "./chapterSlice"


export const fetchAllChaptersThunk = (payload) => (dispatch) => {
    callAPI({
        payload,
        dispatch,
        method: 'POST',
        apiEndpoint: '/chapters',
        apiStatusKey: 'chapters',
        dataAction: fetchAllChapters
    })
}

export const addChapterThunk = (payload) => (dispatch) => {
    callAPI({
        payload,
        dispatch,
        method: 'POST',
        apiEndpoint: '/chapters/addChapter',
        apiStatusKey: 'addChapter',
        dataAction: addChapter
    })
}

