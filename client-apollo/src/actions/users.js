import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

import {
  DRAW_LOAD_USER,
  DRAW_ADD_USER,
  SUCCESS_ADD_USER,
  FAILED_ADD_USER,
  SUCCESS_RESEND_USER,
  REMOVE_USER,
  SUCCESS_FIND_USER,
  DRAW_EDIT_USER,
} from "../constants";

const API_URL = "http://localhost:3000/graphql";

const request = new ApolloClient({
  uri: API_URL,
});

const drawLoadUser = (users) => ({
  type: DRAW_LOAD_USER,
  users,
});

export const loadUser = (page) => {
  const usersQuery = gql`
    query {
      contacts {
        id
        name
        phone
      }
    }
  `;
  let page1 = page || 1;
  return (dispatch) => {
    return request
      .query({
        query: usersQuery,
      })
      .then((response) => {
        dispatch(drawLoadUser(response.data.contacts));
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
  const addQuery = gql`
    mutation addContact($id: Int!, $name: String!, $phone: String!) {
      addContact(id: $id, name: $name, phone: $phone) {
        id: ${id},
        name,
        phone
      }
    }
  `;
  return (dispatch) => {
    dispatch(drawAddUser(id, name, phone));
    return request
      .mutate({
        mutation: addQuery,
        variables: {
          id: id,
          name: name,
          phone: phone,
        },
      })
      .then(function (response) {
        dispatch(successAddUser());
      }).catch(err => {
        dispatch(failedAddUser(id))
      })
  };
};

const successResendUser = (id) => ({
  type: SUCCESS_RESEND_USER,
  id,
});

export const resendUser = (id, name, phone) => {
  return (dispatch) => {};
};

const removeUser = (id) => ({
  type: REMOVE_USER,
  id,
});

export const deleteUser = (id) => {
  return (dispatch) => {};
};

const successFindUser = (name, phone) => ({
  type: SUCCESS_FIND_USER,
  name,
  phone,
});

export const findUser = (name, phone) => {
  return (dispatch) => {
    dispatch(successFindUser(name, phone));
  };
};

const drawEditUser = (id, name, phone) => ({
  type: DRAW_EDIT_USER,
  id,
  name,
  phone,
});

export const updateUser = (id, name, phone) => {
  return (dispatch) => {
    dispatch(drawEditUser(id, name, phone));
  };
};
