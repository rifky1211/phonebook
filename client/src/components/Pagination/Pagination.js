import React, { Component } from "react";
export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
  }

  render() {
    let pages = Math.ceil(this.props.users.size / 3);
    const totalPage = [];
    for (let i = 0; i < pages; i++) {
      totalPage.push(1);
    }
    const nodeList = totalPage.map((item, index) => {
      return (
        <li key={index} className={this.state.page === index ? 'page-item active': 'page-item'}>
          <a
            className="page-link"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              this.props.page(index + 1);
              this.setState({page: index})
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
            <li className="page-item">
              <a className="page-link" href="/">
                Previous
              </a>
            </li>
            {nodeList}
            <li className="page-item">
              <a className="page-link" href="/">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
