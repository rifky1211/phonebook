import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  loadUser,
  resendUser,
  deleteUser,
  updateUser,
} from "../../actions/users";

export default function TableItem(props) {
  const initialState = {
    id: 0,
    name: "",
    phone: "",
    onEdit: false,
  };

  const [{ id, name, phone, onEdit }, setUser] = useState(initialState);

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  let dispatch = useDispatch();

  if (!onEdit && props.sent) {
    return (
      <tr>
        <td className="data-styling">{props.index + 1}</td>

        <td className="data-styling">{props.name}</td>

        <td className="data-styling">{props.phone}</td>

        <td className="data-styling">
          <div>
            <button
              className="btn btn-success mx-2"
              type="button"
              data-toggle="modal"
              data-target="#exampleModalLong"
              onClick={(e) => {
                setUser({
                  id: parseInt(props.id),
                  name: props.name,
                  phone: props.phone,
                  onEdit: true,
                });

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
                  dispatch(deleteUser(props.id));
                } else {
                  return;
                }
              }}
            >
              <i className="fas fa-trash"></i> delete
            </a>
          </div>
        </td>
      </tr>
    );
  }else if (!onEdit && !props.sent) {
    return (
      <tr>
        <td className="data-styling">{props.index + 1}</td>

        <td className="data-styling">{props.name}</td>

        <td className="data-styling">{props.phone}</td>

        <td className="data-styling">
          <div>
            <button
              className="btn btn-warning mx-2"
              type="button"
              data-toggle="modal"
              data-target="#exampleModalLong"
              onClick={(e) => {
                e.preventDefault()
                dispatch(resendUser(parseInt(props.id), name, phone))
              }}
            >
              <i className="fas fa-redo"></i> resend
            </button>
          </div>
        </td>
      </tr>
    );
  }
   else {
    return (
      <tr>
        <td>{props.index + 1}</td>

        <td>
          <input
            className="form-control form-edit-styling ml-2"
            name="name"
            type="text"
            checked={name}
            value={name}
            onChange={onChange}
          />
        </td>

        <td>
          <input
            className="form-control form-edit-styling"
            name="phone"
            type="text"
            checked={phone}
            value={phone}
            onChange={onChange}
          />
        </td>

        <td>
          <div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={(e) => {
                setUser({
                  id: parseInt(props.id),
                  name: props.name,
                  phone: props.phone,
                  onEdit: false,
                });
                dispatch(updateUser(id, name, phone))
                dispatch(loadUser())
              }}
            >
              <i className="fas fa-check"></i> save
            </button>
            <a
              className="btn btn-warning mx-2"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setUser({
                    id: "",
                    name: "",
                    phone: "",
                    onEdit: false,
                  });
              }}
            >
              <i className="fas fa-ban"></i> cancel
            </a>
          </div>
        </td>
      </tr>
    );
  }
}
