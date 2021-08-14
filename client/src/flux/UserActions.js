import dispatcher from "./Dispatcher";
import axios from "axios";

const Actions = {
  drawUser(phonebooks) {
    dispatcher.dispatch({
      type: "DRAW_USER",
      phonebooks,
    });
  },

  loadUser(page) {
    axios.get("http://localhost:3000/api/phonebook").then((phonebooks) => {
      let page1 = page || 1
      Actions.drawUser(phonebooks.data.realData.slice((page1-1) * 3, page1 * 3))
    });
  },

  drawAddUser(id, name, phone){
    dispatcher.dispatch({
      type: "DRAW_ADD_USER",
      id,
      name,
      phone
    })
  },

  successAddUser(user){
    dispatcher.dispatch({
      type: "SUCCESS_ADD_USER",
      user
    })
  },

  successResendUser(id){
    dispatcher.dispatch({
      type: "SUCCESS_RESEND_USER",
      id
    })
  },

  failedAddUser(id, name, phone){
    dispatcher.dispatch({
      type: "FAILED_ADD_USER",
      id,
      name,
      phone
    })
  },

  addUser(name, phone){
    const id = Date.now()
    Actions.drawAddUser(id, name, phone)
    axios.post("http://localhost:3000/api/phonebook",{id, name, phone}).then(user => {
      Actions.successAddUser(user)
    }).catch(err => {
      Actions.failedAddUser(id, name, phone)
    })
  },

  drawEditUser(id, name, phone){
    dispatcher.dispatch({
      type: "DRAW_EDIT_USER",
      id,
      name,
      phone
    })
  },

  successEditUser(){
    dispatcher.dispatch({
      type: "SUCCESS_EDIT_USER",
    })
  },

  editUser(id, name, phone){
    Actions.drawEditUser(id, name, phone)
    axios.put(`http://localhost:3000/api/phonebook/${id}`,{name, phone}).then(user => {
     Actions.successEditUser()
    })
  },

  resendUser(id, name, phone){
    axios.post("http://localhost:3000/api/phonebook",{id, name, phone}).then(user => {
      Actions.successResendUser(id)
    })
  },

  successDeleteUser(id){
    dispatcher.dispatch({
      type: "SUCCESS_DELETE_USER",
      id,
    })
  },

  deleteUser(id){
    axios.delete(`http://localhost:3000/api/phonebook/${id}`).then(user => {
      Actions.successDeleteUser(id)
    })
  },

  filterUser(name, phone){
    dispatcher.dispatch({
      type: "SUCCESS_FILTER_USER",
      name,
      phone
    })
  }
};

export default Actions;
