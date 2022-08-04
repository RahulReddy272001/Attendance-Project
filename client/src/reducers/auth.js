import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  GET_All_USERS,
  GET_USER_BY_ID,
  POST_ATTENDENCE
} from "./types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  users: [],
  currentuser: null
};

export function register(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: null,
        loading: false,
      };
    case GET_All_USERS:
      return {
        ...state,
        users: payload
      }
    case GET_USER_BY_ID:
      return {
        ...state,
        currentuser: payload
      }
    case POST_ATTENDENCE:
      return {
        ...state
      }

    default:
      return state;
  }
}
