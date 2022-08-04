import axios from "axios";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  PROFILE_ERROR,
  GET_All_USERS,
  GET_USER_BY_ID,
  POST_ATTENDENCE
} from "../reducers/types";
import { setAlert } from "./alert";
import { setAuthtoken } from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthtoken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//register
export const register = ({ name, email, phone, password, isTeacher }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, phone, password, isTeacher });
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    console.log(err);

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Login

export const login = ({ email, password, isTeacher }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password, isTeacher });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(setAlert("Login Success", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    console.log(errors);
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch(setAlert("Invalid Credentials", "danger"));
  }
};

//logout

export const logout = () => (dispatch) => {
  dispatch({
    type: LOG_OUT,
  });
  dispatch({
    type: PROFILE_ERROR,
  });
};


export const getAllUsers = () => async (dispatch) => {
  const users = await axios.get("/api/users");
  if (users) {
    dispatch({
      type: GET_All_USERS,
      payload: users.data
    })
  }

}
export const getUserId = (id) => async (dispatch) => {
  const user = await axios.get(`/api/users/${id}`);
  if (user) {
    dispatch({
      type: GET_USER_BY_ID,
      payload: user.data
    })
  }

}
export const postAttendence = ({ body, config }) => async (dispatch) => {
  const user = await axios.post(`/api/attendence/`, body, config);
  if (user) {
    dispatch({
      type: POST_ATTENDENCE
    })
  }

}