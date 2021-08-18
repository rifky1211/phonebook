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
  UPDATE_FILTER,
} from "../constants";

const API_URL = "http://localhost:3000/graphql";

const request = new ApolloClient({
  uri: API_URL,
});

const drawLoadUser = (users) => ({
  type: DRAW_LOAD_USER,
  users,
});

export const setPageFilter = (page, name, phone, totalData) => ({
  type: UPDATE_FILTER,
  page, name, phone, totalData
})

export const loadUser = (page = 1, name = "", phone = "") => {
  const limit = 3
  let pageReal = (page - 1) * limit
  let searchName = name || ""
  let searchPhone = phone || ""
  console.log(pageReal, limit, name, phone )
  const usersQuery = gql`
    query {
      contact(pagination: {offset: ${pageReal}, limit: ${limit}, name: "${searchName}", phone: "${searchPhone}"}) {
        items {
          id
          name
          phone
        }
        count
      }
    }
  `;
  return (dispatch) => {
    return request
      .query({
        query: usersQuery,
      })
      .then((response) => {
        dispatch(drawLoadUser(response.data.contact.items));
        dispatch(setPageFilter(page, name, phone, response.data.contact.count))
      }).catch(err => {
        console.log(err)
      })
  };
};
const drawAddUser = (id, name, phone) => ({
  type: DRAW_ADD_USER,
  id,
  name,
  phone,
});

const successAddUser = (id) => ({
  type: SUCCESS_ADD_USER,
  id
});

const failedAddUser = (id) => ({
  type: FAILED_ADD_USER,
  id,
});

export const addUser = (name, phone) => {
  let id = Date.now().toString();
  const addQuery = gql`
    mutation addContact($id: String!, $name: String!, $phone: String!) {
      addContact(id: $id, name: $name, phone: $phone) {
        id
        name
        phone
      }
    }
  `;
  return (dispatch) => {
    return request
    .mutate({
      mutation: addQuery,
      variables: {
        id,
        name,
        phone,
      },
    })
    .then(function (response) {
        dispatch(successAddUser(id));
        dispatch(loadUser())
      })
      .catch((err) => {
        console.log(err)
        dispatch(failedAddUser(id));
      });
  };
};

const successResendUser = (id) => ({
  type: SUCCESS_RESEND_USER,
  id,
});

export const resendUser = (id,name, phone) => {
  console.log(id)
  const addQuery = gql`
    mutation updateContact($id: String!, $name: String!, $phone: String!) {
      addContact(id: $id, name: $name, phone: $phone) {
        id
        name
        phone
      }
    }
  `;
  return (dispatch) => {
    return request.mutate({
      mutation: addQuery,
      variables: {
          id,
          name,
          phone
      }
  })
    .then(function (response) {
      console.log(response);
      dispatch(successResendUser(id));
    }).catch(err => {
      console.log(err)
    })  
  };
};

const removeUser = (id) => ({
  type: REMOVE_USER,
  id,
});

export const deleteUser = (id) => {
  const deleteQuery = gql`
    mutation removeContact($id: String!) {
        removeContact(id: $id) {
        id
        }
    }`;
  return (dispatch) => {

    dispatch(removeUser(id));
    return request.mutate({
      mutation: deleteQuery,
      variables: {
          id
      }
  })
    .then(function (response) {
    })
  };
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
