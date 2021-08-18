import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import TableItem from './TableItem'

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

  const [{ id, name, phone, onEdit }, setUser] = useState(initialState);


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
      <TableItem key={item.id} name={item.name} phone={item.phone} id={item.id} index={index} sent={item.sent}></TableItem>
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
    </div>
  );
}
