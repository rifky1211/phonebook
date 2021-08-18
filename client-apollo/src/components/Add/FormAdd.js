import React, { useState } from "react";
import { useDispatch } from "react-redux";

import HeaderAdd from "./HeaderAdd";
import { addUser, loadUser } from "../../actions/users";

export default function FormAdd(props) {
  const dispatch = useDispatch();

  const initialState = {
    name: "",
    phone: "",
  };

  const [{ name, phone }, setState] = useState(initialState);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = (e) => {
    setState({ ...initialState });
    e.preventDefault();
    document.getElementById("form-add").style.display = "none";
    document.getElementById("btn-add").style.display = "block";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(name, phone));
    setState({ ...initialState });
    document.getElementById("form-add").style.display = "none";
    document.getElementById("btn-add").style.display = "block";
  };

  return (
    <div>
      <div className="container mt-4">
        <button
          id="btn-add"
          className="btn btn-primary btn-add-styling"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("form-add").style.display = "block";
            document.getElementById("btn-add").style.display = "none";
          }}
        >
          <i className="fas fa-plus"></i> Add
        </button>
      </div>
      <div id="form-add" className="container box-form border toggle">
        <HeaderAdd></HeaderAdd>
        <form onSubmit={handleSubmit} className="mt-4">
          <label>Name:</label>
          <input
            className="form-control form-styling d-inline ml-2"
            name="name"
            type="text"
            checked={name}
            value={name}
            onChange={onChange}
          />

          <label className="mx-2">Phone:</label>
          <input
            className="form-control form-styling mb-4 d-inline"
            name="phone"
            type="text"
            checked={phone}
            value={phone}
            onChange={onChange}
          />
          <button className="btn btn-success mx-2">
            <i className="fas fa-check-circle"></i> Post
          </button>
          <button
            className="btn btn-warning"
            type="button"
            onClick={clearState}
          >
            {" "}
            <i className="fas fa-ban"></i> Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
