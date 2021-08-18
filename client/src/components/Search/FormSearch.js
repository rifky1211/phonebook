import React, { Component } from "react";

import HeaderSearch from "./HeaderSearch";

export default class FormSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", phone: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.filter(1, this.state.name, this.state.phone)
  }

  render() {
    return (
      <div>
        <div className="container mt-4 box-form border">
          <HeaderSearch></HeaderSearch>
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
            <button className="btn btn-success mx-2">
              <i className="fas fa-search"></i> Search
            </button>
          </form>
        </div>
      </div>
    );
  }
}
