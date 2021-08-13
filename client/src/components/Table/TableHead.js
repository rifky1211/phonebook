import React from "react";
import TableData from "./TableData";

export default function TableHead(props) {
  const nodeList = [...props.users.values()].map((item, index) => {
    return (
      <TableData
        name={item.name}
        key={item.id}
        phone={item.phone}
        index={index}
        sent={item.sent}
        id={item.id}
        resend={props.resend}
        delete={props.delete}
        edit={props.edit}
      ></TableData>
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
