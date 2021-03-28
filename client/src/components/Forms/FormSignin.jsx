import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "../../styles/form.css";

class FormSignin extends Component {
  state = {};

  handleChange = (event) => {
    const key = event.target.name;

    // You can test more if you have to handle different sorts of inputs.
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { authContext } = this.props;

    apiHandler
      .signin(this.state)
      .then((data) => {
        authContext.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {

    // console.log("props",this.props)

    return (
      <section className="form-section">
        <header className="header">
          <h1>
            Welcome back{" "}
            <span role="img" aria-label="heart">
              💙
            </span>
          </h1>
        </header>

        <form
          autoComplete="off"
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <h2 className="title">Login</h2>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input className="input" id="email" type="email" name="email" />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              id="password"
              type="password"
              name="password"
            />
          </div>

          <button className="btn-submit">Let's go!</button>
        </form>

        <div className="form-section-bottom">
          <p>Already have an account? </p>
          <Link className="link" to="/signup">
            Register
          </Link>
        </div>
      </section>
    );
  }
}

export default withRouter(withUser(FormSignin)); // Browser history and user will be given as props to the FormSignin thanks to HOCs !
