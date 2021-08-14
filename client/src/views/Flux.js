import React, { Component } from "react";

import Header from "../partials/Header";
import FormAdd from "../components/Add/FormAdd";
import FormSearch from "../components/Search/FormSearch";
import TableHead from "../components/Table/TableHead";
import Pagination from "../components/Pagination/Pagination";

export default class Flux extends Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <div>
        <Header></Header>
        <FormAdd add={this.props.onAdd}></FormAdd>
        <FormSearch filter={this.props.onFilter}></FormSearch>
        <TableHead
          edit={this.props.onEdit}
          users={this.props.users}
          resend={this.props.onResend}
          delete={this.props.onDelete}
        ></TableHead>
        <Pagination page={this.props.onLoad} users={this.props.users}></Pagination>
      </div>
    );
  }
}
