import React, { Component } from "react";

import HeaderAdd from "./HeaderAdd";

export default class FormAdd extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", phone: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
    this.toggleCancelAdd = this.toggleCancelAdd.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  toggleAdd(e) {
    e.preventDefault();
    document.getElementById("form-add").style.display = "block";
    document.getElementById("btn-add").style.display = "none";
  }

  toggleCancelAdd(e) {
    e.preventDefault();
    document.getElementById("form-add").style.display = "none";
    document.getElementById("btn-add").style.display = "block";
  }

  handleSubmit(event) {
    alert(this.state.name);
    this.setState({ name: "", phone: "" });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="container mt-4">
          <button
            id="btn-add"
            className="btn btn-lg btn-primary"
            onClick={this.toggleAdd}
          >
            <i className="fas fa-plus"></i> Add
          </button>
        </div>
        <div id="form-add" className="container box-form border toggle">
          <HeaderAdd></HeaderAdd>
          <form onSubmit={this.handleSubmit} className="mt-4">
            <label>Name:</label>
            <input
              className="form-control form-styling d-inline ml-2"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />

            <label className="mx-2">Phone:</label>
            <input
              className="form-control form-styling mb-4 d-inline"
              name="phone"
              type="text"
              value={this.state.phone}
              onChange={this.handleChange}
            />
            <button className="btn btn-success btn-lg mx-2"><i className="fas fa-check-circle"></i> Post</button>
            <button
              onClick={this.toggleCancelAdd}
              className="btn btn-warning btn-lg"
            > <i className="fas fa-ban"></i> Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}
