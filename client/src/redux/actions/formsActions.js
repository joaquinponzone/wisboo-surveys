import axios from "axios";
import { GET_FORMS, GET_FORM, LOADING } from "./../constants";
import dotenv from "dotenv";
dotenv.config();

const { REACT_APP_API } = process.env;

export const getForms = () => {
  return function (dispatch) {
    dispatch({ type: LOADING });
    return axios
      .get(`${REACT_APP_API}/forms`)
      .then((forms) => {
        dispatch({
          type: GET_FORMS,
          payload: forms.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getForm = (payload) => {
  return function (dispatch) {
    dispatch({ type: LOADING });
    return axios
      .get(`${REACT_APP_API}/forms/${payload}`)
      .then((form) => {
        dispatch({
          type: GET_FORM,
          payload: form.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addForm = (payload) => {
  return function (dispatch) {
    return axios
      .post(`${REACT_APP_API}/forms`, payload)
      .then((res) => {
        dispatch(getForms());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteForm = (payload) => {
  //payload = form.id
  return function (dispatch) {
    dispatch({ type: LOADING });
    return axios
      .delete(`${REACT_APP_API}/forms/${payload}`)
      .then(() => {
        dispatch(getForms());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editForm = (payload) => {
  return function (dispatch) {
    return axios
      .put(`${REACT_APP_API}/forms/${payload.id}`, payload)
      .then(() => {
        dispatch(getForms());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const togglePublishForm = (payload) => {
  return function (dispatch) {
    dispatch({ type: LOADING });
    return axios
      .put(`${REACT_APP_API}/forms/publish/${payload}`)
      .then(() => {
        dispatch(getForms());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
