import React, { Component } from "react";

export default class TableData extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", phone: "", onEdit: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.edit(this.props.id, this.state.name, this.state.phone)
    this.setState({
      name: "",
      phone: "",
      onEdit: false,
    });
  }

  render() {
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        {this.state.onEdit && (
          <td>
            <input
              className="form-control form-edit-styling"
              value={this.state.name}
              name="name"
              onChange={this.handleChange}
            />
          </td>
        )}
        {!this.state.onEdit && <td>{this.props.name}</td>}
        {this.state.onEdit && (
          <td>
            <input
              className="form-control form-edit-styling"
              value={this.state.phone}
              name="phone"
              onChange={this.handleChange}
            />
          </td>
        )}
        {!this.state.onEdit && <td>{this.props.phone}</td>}

        {!this.state.onEdit && (
          <td>
            <div>
              <button
                className="btn btn-success"
                type="button"
                onClick={() => {
                  this.setState({
                    name: this.props.name,
                    phone: this.props.phone,
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
                    this.props.delete(this.props.id);
                  } else {
                    return;
                  }
                }}
              >
                <i className="fas fa-trash"></i> delete
              </a>
            </div>

            {!this.props.sent && (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  this.props.resend(
                    this.props.id,
                    this.props.name,
                    this.props.phone
                  );
                }}
                className="btn btn-warning"
                href="/"
              >
                <i className="fas fa-redo"></i> resend
              </a>
            )}
          </td>
        )}
         {this.state.onEdit && (
          <td>
            <div>
              <button
                className="btn btn-primary"
                type="button"
                onClick={this.handleSubmit}

              >
                <i className="fas fa-check"></i> save
              </button>
              <a
                className="btn btn-danger"
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({
                    name: "",
                    phone: "",
                    onEdit: false,
                  });
                }}
              >
                <i className="fas fa-ban"></i> cancel
              </a>
            </div>

            {!this.props.sent && (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  this.props.resend(
                    this.props.id,
                    this.props.name,
                    this.props.phone
                  );
                }}
                className="btn btn-warning"
                href="/"
              >
                <i className="fas fa-redo"></i> resend
              </a>
            )}
          </td>
        )}
      </tr>
    );
  }
}
