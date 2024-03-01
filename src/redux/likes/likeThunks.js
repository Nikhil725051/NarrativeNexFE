import { callAPI } from "../../utils/api"
import { addOrRemoveLike } from "./likesSlice"


export const addOrRemoveLikeThunk = (payload) => (dispatch) => {
    callAPI({
        payload,
        dispatch,
        method: 'POST',
        apiEndpoint: '/likes/addOrRemoveLike',
        apiStatusKey: 'addOrRemoveLike',
        dataAction: addOrRemoveLike
    })
}