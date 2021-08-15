import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import {
  loadUser,
  resendUser,
  deleteUser,
  updateUser,
} from "../../actions/users";

export default function TableHead() {
  const initialState = {
    id: 0,
    name: "",
    phone: "",
    onEdit: false,
  };

  const [{ id, name, phone, onEdit }, setState] = useState(initialState);

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const { users } = useSelector(
    (state) => ({
      users: state.users,
    }),
    shallowEqual
  );

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const nodeList = users.map((item, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.name}</td>

        <td>{item.phone}</td>

        <td>
          {!onEdit && (
            <div>
              <button
                className="btn btn-success"
                type="button"
                data-toggle="modal" data-target="#exampleModalLong"
                onClick={(e) => {
                  setState({
                    id: item.id,
                    name: item.name,
                    phone: item.phone,
                    onEdit: true,
                  });
                  document.getElementById("form-edit").style.display = "block";
                }}
              >
                <i className="fas fa-pen"></i> edit
              </button>
              <a
                className="btn btn-danger"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  let deleteConfirm = window.confirm(
                    "Are you sure want to delete this item ?"
                  );
                  if (deleteConfirm) {
                    dispatch(deleteUser(item.id));
                  } else {
                    return;
                  }
                }}
              >
                <i className="fas fa-trash"></i> delete
              </a>
            </div>
          )}

          {!item.sent && (
            <div>
              <button
                className="btn btn-warning"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(resendUser(item.dispatch, item.name, item.phone));
                  dispatch(loadUser());
                }}
              >
                <i className="fas fa-redo"></i> resend
              </button>
            </div>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="container mt-4">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{nodeList}</tbody>
      </table>
      <form className="form-edit mt-4" id="form-edit">
        <div className="header-styling">
          <h5>Edit Form</h5>
        </div>
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
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            dispatch(updateUser(id, name, phone));
          }}
        >
          <i className="fas fa-check"></i> Save
        </button>
        <button
          className="btn btn-warning"
          type="button"
          onClick={() => {
            setState({
              id: 0,
              name: "",
              phone: "",
              onEdit: false,
            });
            document.getElementById("form-edit").style.display = "none";
          }}
        >
          {" "}
          <i className="fas fa-ban"></i> Cancel
        </button>
      </form>
    </div>
  );
}
