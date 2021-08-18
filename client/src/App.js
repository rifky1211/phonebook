import { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';

import "./assets/fontawesome/css/all.min.css";
import "./assets/styles/style.css";

import Flux from "./views/Flux";
import { Container } from "flux/utils";
import UserStore from "./flux/UserStore";
import UserActions from "./flux/UserActions";
import PageFilterStore from './flux/PageFilterStore'

const convert = function (containerClass) {
  const tmp = containerClass;
  containerClass = function (...args) {
    return new tmp(...args);
  };
  containerClass.prototype = tmp.prototype;
  containerClass.getStores = tmp.getStores;
  containerClass.calculateState = tmp.calculateState;

  return containerClass;
};

class App extends Component {
  static getStores() {
    return [UserStore, PageFilterStore];
  }

  static calculateState(prevState) {
    return {
      users: UserStore.getState(),
      pageFilter: PageFilterStore.getState(),
      
      onLoad: UserActions.loadUser,
      onAdd: UserActions.addUser,
      onResend: UserActions.resendUser,
      onDelete: UserActions.deleteUser,
      onFilter: UserActions.filterUser,
      onEdit: UserActions.editUser,

    };
  }

  render() {
    return (

        <Flux {...this.state}></Flux>
    );
  }
}

export default Container.create(convert(App));
