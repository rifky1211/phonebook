import React, { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import TableItem from './TableItem'

import {
  loadUser,
} from "../../actions/users";

export default function TableHead() {


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
      <TableItem key={item.id} sent={item.sent} name={item.name} phone={item.phone} id={item.id} index={index}></TableItem>
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
