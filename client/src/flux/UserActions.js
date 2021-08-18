import dispatcher from "./Dispatcher";
import axios from "axios";
import {
  UPDATE_FILTER
} from "../constants";

const Actions = {
  drawUser(phonebooks) {
    dispatcher.dispatch({
      type: "DRAW_USER",
      phonebooks,
    });
  },
  setPageFilter(page, name, phone, totalData) {
    dispatcher.dispatch({
      type: UPDATE_FILTER,
      page,
      name,
      phone,
      totalData,
    });
  },

  loadUser(page = 1, name = "", phone = "") {
    const limit = 3;
    let offset = (page - 1) * limit;
    axios
      .get("http://localhost:3000/api/phonebook", {
        params: {
          limit,
          offset,
          name,
          phone,
        },
      })
      .then((phonebooks) => {
        Actions.drawUser(phonebooks.data.data);
        console.log(phonebooks.data.count)
        Actions.setPageFilter(page, name, phone, phonebooks.data.count)
      });
  },

  drawAddUser(id, name, phone) {
    dispatcher.dispatch({
      type: "DRAW_ADD_USER",
      id,
      name,
      phone,
    });
  },

  successAddUser(user) {
    dispatcher.dispatch({
      type: "SUCCESS_ADD_USER",
      user,
    });
  },

  successResendUser(id) {
    dispatcher.dispatch({
      type: "SUCCESS_RESEND_USER",
      id,
    });
  },

  failedAddUser(id, name, phone) {
    dispatcher.dispatch({
      type: "FAILED_ADD_USER",
      id,
      name,
      phone,
    });
  },

  addUser(name, phone) {
    const id = Date.now();
    Actions.drawAddUser(id, name, phone);
    axios
      .post("http://localhost:3000/api/phonebook", { id, name, phone })
      .then((user) => {
        Actions.successAddUser(user);
      })
      .catch((err) => {
        Actions.failedAddUser(id, name, phone);
      });
  },

  drawEditUser(id, name, phone) {
    dispatcher.dispatch({
      type: "DRAW_EDIT_USER",
      id,
      name,
      phone,
    });
  },

  successEditUser() {
    dispatcher.dispatch({
      type: "SUCCESS_EDIT_USER",
    });
  },

  editUser(id, name, phone) {
    Actions.drawEditUser(id, name, phone);
    axios
      .put(`http://localhost:3000/api/phonebook/${id}`, { name, phone })
      .then((user) => {
        Actions.successEditUser();
      });
  },

  resendUser(id, name, phone) {
    axios
      .post("http://localhost:3000/api/phonebook", { id, name, phone })
      .then((user) => {
        Actions.successResendUser(id);
      });
  },

  successDeleteUser(id) {
    dispatcher.dispatch({
      type: "SUCCESS_DELETE_USER",
      id,
    });
  },

  deleteUser(id) {
    axios.delete(`http://localhost:3000/api/phonebook/${id}`).then((user) => {
      Actions.successDeleteUser(id);
    });
  },

  filterUser(name, phone) {
    dispatcher.dispatch({
      type: "SUCCESS_FILTER_USER",
      name,
      phone,
    });
  },
};

export default Actions;
