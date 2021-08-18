import React, { Component } from "react";
export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
  }

  render() {
    let pages = Math.ceil(this.props.page.totalData / 3);
    const totalPage = [];
    for (let i = 0; i < pages; i++) {
      totalPage.push(1);
    }
    const nodeList = totalPage.map((item, index) => {
      return (
        <li
          key={index}
          className={
            this.props.page.page === index + 1
              ? "page-item active"
              : "page-item"
          }
        >
          <a
            className="page-link"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              this.props.load(index + 1);
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
              className={
                this.props.page.page < 2 ? "page-item disabled" : "page-item"
              }
            >
              <a
                className="page-link"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.load(this.props.page.page - 1);
                }}
              >
                Previous
              </a>
            </li>
            {nodeList}
            <li
              className={
                this.props.page.page < totalPage.length
                  ? "page-item"
                  : "page-item disabled"
              }
            >
              <a
                className="page-link"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.load(this.props.page.page - 1);
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
}
