import React, { useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../actions/users";


export default function Pagination() {
  const initialState = {
    page: 1,
  };

  const [{ page }, setState] = useState(initialState);

  const { users } = useSelector(
    (state) => ({
      users: state.users,
    }),
    shallowEqual
  );
  console.log(users)
  let totalData = [];
  users.forEach((item) => {
    totalData.push(item.total);
  });
  let pages = Math.ceil(totalData[0] / 3);
  const totalPage = [];
    for (let i = 0; i < pages; i++) {
      totalPage.push(1);
    }

  let dispatch = useDispatch();


    const nodeList = totalPage.map((item, index) => {
        return (
          <li key={index} className={page === index + 1 ? 'page-item active': 'page-item'}>
            <a
              className="page-link"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                dispatch(loadUser(index + 1))
                setState({page: index + 1})
                
              }}
            >
              {index + 1}
            </a>
          </li>
        );
      });
  

  return (
    <div className="justify-content-center">
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li
            className={page < 2 ? "page-item disabled" : "page-item"}
          >
            <a
              className="page-link"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                dispatch(loadUser(page - 1))
                setState({ page: page - 1 });
              }}
            >
              Previous
            </a>
          </li>
          {nodeList}
          <li
            className={
              page < totalPage.length
                ? "page-item"
                : "page-item disabled"
            }
          >
            <a
              className="page-link"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                dispatch(loadUser(page + 1))
                setState({ page: page + 1 });
              }}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}