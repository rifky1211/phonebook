import {
  DRAW_LOAD_USER,
  FAILED_LOAD_USER,
  DRAW_ADD_USER,
  SUCCESS_ADD_USER,
  FAILED_ADD_USER,
  SUCCESS_RESEND_USER,
  FAILED_RESEND_USER,
} from "../constants";

import axios from "axios";

const drawLoadUser = (users) => ({
  type: DRAW_LOAD_USER,
  users,
});

export const loadUser = () => {
  return (dispatch) => {
    return axios.get("http://localhost:3000/api/phonebook").then((phonebooks) => {
      dispatch(drawLoadUser(phonebooks.data.realData));
    });
  };
};

const drawAddUser = (id, name, phone) => ({
  type: DRAW_ADD_USER,
  id,
  name,
  phone,
});

export const addUser = (name, phone) => {
  const id = Date.now();
  return drawAddUser(id, name, phone);
};
