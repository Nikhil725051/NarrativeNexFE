import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  loadingFailed,
  loadingSucceeded,
  startLoading,
} from "../redux/apiStatus/apiStatusSlice";
import store from "../redux/store";
import {
  logOut,
  refreshToken as refreshAccessToken,
} from "../redux/auth/authSlice";
import { toast } from "react-toastify";

const debugMode = true;
const apiInstance = axios.create();

const createApiConfig = ({ method, apiEndpoint, payload, headers = {} }) => ({
  method,
  url: "https://narrativenexbe.onrender.com" + apiEndpoint,
  data: payload,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    ...headers,
  },
});

apiInstance.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;

      const accessToken = store.getState().auth.accessToken;
      if (
        !accessToken ||
        jwtDecode(accessToken).exp > Math.floor(Date.now() / 1000)
      )
        return Promise.reject(error);

      const refreshToken = store.getState().auth.refreshToken;
      if (
        !refreshToken ||
        jwtDecode(refreshToken).exp < Math.floor(Date.now() / 1000)
      )
        return store.dispatch(logOut(null));

      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            "https://narrativenexbe.onrender.com" + "/auth/refresh",
            {
              refreshToken,
              userId: store.getState().auth.userId,
            }
          );
          store.dispatch(
            refreshAccessToken({
              accessToken: refreshResponse.data.accessToken,
            })
          );
          originalConfig.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
          return apiInstance(originalConfig);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      } else {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export async function callAPI({
  method,
  apiEndpoint,
  payload,
  dispatch,
  apiStatusKey,
  dataAction,
}) {
  try {
    const config = createApiConfig({ method, apiEndpoint, payload });
    dispatch(startLoading({ apiStatusKey }));
    const response = await apiInstance(config);
    if (debugMode) {
      console.log("%c API Success", "color: green; font-weight: bold", {
        request: payload,
        response: response.data,
        method,
        url: "https://narrativenexbe.onrender.com" + apiEndpoint,
      });
    }
    //If the backend is sending some success messages in the response, then set that message instead of the message 'Success'.
    //Since our backend is not sending any success message with the 200 response, we are setting the message in apiStatatus to a default message.
    //Setting the message that comes from the backend can be extremely useful, especially when an API has multiple 200 (success) responses with different messages,
    //and we want to display those specific messages.
    dispatch(loadingSucceeded({ apiStatusKey, message: "Success" }));
    return dispatch(dataAction(response.data));
  } catch (error) {
    const err = {};
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      err.message = error.response.data.message;
      err.statusCode = error.response.status;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      err.message = "The request was made but no response was received";
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      err.message = error.message;
    }

    if (debugMode) {
      console.error("%c API Failed", "color: red; font-weight: bold", {
        ...err,
        method,
        request: payload,
        url: "https://narrativenexbe.onrender.com" + apiEndpoint,
      });
    }
    toast.error(err.message, {
      position: "bottom-right",
    });

    return dispatch(
      loadingFailed({
        apiStatusKey,
        message: err.message,
      })
    );
  }
}

// import axios from "axios";
// import { loadingFailed, loadingSucceeded, startLoading } from "../../redux/apiStatus/apiStatusSlice";
// import store from "../../redux/store";

// const debugMode = true

// export async function callAPI({config, payload, dispatch, method, apiEndpoint, apiStatusKey, dataAction }) {
//     var response;
//     try {
//         console.log(config);
//         dispatch(startLoading({ apiStatusKey: apiStatusKey }));
//         response = await axios(config);
//         if (response.status !== 200) {
//             const err = new Error();
//             err.status = response.status;
//             err.message = response.data.message
//             throw err;
//         }
//         if (debugMode) {
//             console.log("%c API Success", "color: green; font-weight: bold", {
//                 requestData: payload,
//                 responseData: response.data,
//                 method,
//                 url: HOST_ADDRESS + apiEndpoint,
//             })
//         }
//         dispatch(loadingSucceeded({ apiStatusKey: apiStatusKey, message: response.data.Message }));
//         return dispatch(dataAction({ data: response.data.Payload }));
//     } catch (error) {
//         if (debugMode) {
//             console.error("%c API Failed", "color: red; font-weight: bold", {
//                 requestData: payload,
//                 method,
//                 response: response,
//                 url: HOST_ADDRESS + apiEndpoint,
//                 error: error
//             })
//         }
//         if (error.message === 'Network Error') {
//             //            customHistory.navigate('/error', {state: {message: 'Network Error'}})
//             return dispatch(loadingFailed({ apiStatusKey: apiStatusKey, error: error.message, message: 'Network Error' }));
//         }

//         if (response) {
//             return dispatch(loadingFailed({ apiStatusKey: apiStatusKey, error: error.message, message: response.data.Message }));
//         }
//         return dispatch(loadingFailed({ apiStatusKey: apiStatusKey, error: error.message, message: error.response.statusText }));

//     }
// }

// export function preLoginApiHandler({ payload, dispatch, method, apiEndpoint, apiStatusKey, dataAction }){

//     const config = {
//         method: method,
//         url: HOST_ADDRESS + apiEndpoint,
//         data: payload,
//         headers: {
//             accept: 'application/json',
//             'Content-Type': 'application/json',
//         },
//     };
//     callAPI({config, payload, dispatch, method, apiEndpoint, apiStatusKey, dataAction })

// }

// export function postLoginApiHandler({ payload, dispatch, method, apiEndpoint, apiStatusKey, dataAction }){

//     const accessToken = store.getState().auth.accessToken;
//     const config = {
//         method: method,
//         url: HOST_ADDRESS + apiEndpoint,
//         data: {
//             authentication_params: {
//                 user_profile_id: persistentState.user_profile_id,
//                 refresh_token: persistentState.refresh_token,
//             },
//             payload: { ...payload },
//         },
//         headers: {
//             accept: 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: `bearer ${accessToken}`,
//         },
//     };
//     callAPI({config, payload, dispatch, method, apiEndpoint, apiStatusKey, dataAction })
// }
