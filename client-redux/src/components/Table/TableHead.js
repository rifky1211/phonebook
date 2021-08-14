import React, { useEffect } from "react";

import { loadUser } from "../../actions/users";

import {shallowEqual, useSelector, useDispatch} from 'react-redux'


export default function TableHead(props) {
    
    const {users} = useSelector(state => ({
        users: state.users
    }), shallowEqual)

    let dispatch = useDispatch()

      useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

  let nodeList = users.map((item, index) => {
    return (
      <tr key={index} {...item}>
        <td>{index}</td>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>
          <div>
            <button className="btn btn-success" type="button">
              <i className="fas fa-pen"></i> edit
            </button>
            <a className="btn btn-danger" href="/">
              <i className="fas fa-trash"></i> delete
            </a>
          </div>
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
        <tbody>
            {nodeList}
        </tbody>
      </table>
    </div>
  );
}