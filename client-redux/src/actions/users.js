import {
  DRAW_LOAD_USER,
  DRAW_ADD_USER,
  SUCCESS_ADD_USER,
  FAILED_ADD_USER,
  SUCCESS_RESEND_USER,
  REMOVE_USER,
  SUCCESS_FIND_USER,
  DRAW_EDIT_USER
} from "../constants";

import axios from "axios";

const drawLoadUser = (users) => ({
  type: DRAW_LOAD_USER,
  users,
});

export const loadUser = (page) => {
  let page1 = page || 1
  return (dispatch) => {
    return axios
      .get("http://localhost:3000/api/phonebook")
      .then((phonebooks) => {
        dispatch(drawLoadUser(phonebooks.data.realData.slice((page1-1) * 3, page1 * 3)));
      });
  };
};

const drawAddUser = (id, name, phone) => ({
  type: DRAW_ADD_USER,
  id,
  name,
  phone,
});

const successAddUser = () => ({
  type: SUCCESS_ADD_USER,
});

const failedAddUser = (id, name, phone) => ({
  type: FAILED_ADD_USER,
  id,
  name,
  phone,
});

export const addUser = (name, phone) => {
  const id = Date.now();
  return (dispatch) => {
    dispatch(drawAddUser(id, name, phone));
    return axios
      .post("http://localhost:3000/api/phonebook", { id, name, phone })
      .then(() => {
        dispatch(successAddUser());
      })
      .catch((err) => {
        dispatch(failedAddUser(id, name, phone));
      });
  };
};

const successResendUser = (id) => ({
  type: SUCCESS_RESEND_USER,
  id,
});

export const resendUser = (id, name, phone) => {
  return (dispatch) => {
    return axios
      .post("http://localhost:3000/api/phonebook", { id, name, phone })
      .then((user) => {dispatch(successResendUser(id))});
  };
};

const removeUser = (id) => ({
  type: REMOVE_USER,
  id
});


export const deleteUser = (id) => {
  return (dispatch) => {
    return axios
    .delete("http://localhost:3000/api/phonebook/" + id)
    .then((user) => {
        dispatch(removeUser( id))
      });
  };
};

const successFindUser = (name, phone) => ({
  type: SUCCESS_FIND_USER,
  name,phone
})

export const findUser = (name, phone) => {
  return dispatch => {
    dispatch(successFindUser(name, phone))
  }
}

const drawEditUser = (id, name, phone) => ({
  type:DRAW_EDIT_USER,
  id,name,phone
})

export const updateUser = (id, name, phone) => {
  return (dispatch) => {
    dispatch(drawEditUser(id,name,phone))
    return axios
    .put("http://localhost:3000/api/phonebook/" + id, {name, phone})
    .then((user) => {
      }).catch(err => {

      });
  };
};
