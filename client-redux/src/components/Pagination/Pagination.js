import React from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../actions/users";


export default function Pagination() {
 

  const { pageFilter } = useSelector(
    (state) => ({
      pageFilter: state.pageFilter
    }),
    shallowEqual
  );
  console.log(pageFilter)
  let pages = Math.ceil(pageFilter.totalData / 3);
  const totalPage = [];
    for (let i = 0; i < pages; i++) {
      totalPage.push(1);
    }

  let dispatch = useDispatch();


    const nodeList = totalPage.map((item, index) => {
        return (
          <li key={index} className={pageFilter.page === index + 1 ? 'page-item active': 'page-item'}>
            <a
              className="page-link"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                dispatch(loadUser(index + 1))
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
            className={pageFilter.page < 2 ? "page-item disabled" : "page-item"}
          >
            <a
              className="page-link"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                dispatch(loadUser(pageFilter.page - 1))
              }}
            >
              Previous
            </a>
          </li>
          {nodeList}
          <li
            className={
              pageFilter.page < totalPage.length
                ? "page-item"
                : "page-item disabled"
            }
          >
            <a
              className="page-link"
              href="/"
              onClick={(e) => {
                e.preventDefault();
                dispatch(loadUser(pageFilter.page + 1))
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
