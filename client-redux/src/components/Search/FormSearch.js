import React, { useState } from "react";
import { useDispatch } from "react-redux";

import HeaderSearch from "./HeaderSearch";
import { findUser,  } from "../../actions/users";

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


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(findUser(name, phone));
  };

  return (
    <div>
      <div id="form-add" className="container box-form border mt-4">
        <HeaderSearch></HeaderSearch>
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
            <i className="fas fa-search"></i> Search
          </button>
        </form>
      </div>
    </div>
  );
}
