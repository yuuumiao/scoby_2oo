import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
//import  withUser  from "../Auth/withUser";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import "../../styles/form.css";

class FormSignup extends Component {
  static contextType = UserContext;
  state = {};

  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    const key = event.target.name;
    // console.log("key->", key, "value->", value)
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      })
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    // if (this.context.isLoggedIn) {
    //   // This logic is the same as in the <ProtectedRoute /> component
    //   // Here this is handled within the component, if there are some views
    //   // that are not meant to be rendered to a logged in user,
    //   // you could make a generic component out of it, just like <ProtectedRoute />
    //   // and instead of checking if the user is not logged in, check if the user is logged in
    //   // and redirect him to whatever page you want, in the case below: the home page.
    //   return <Redirect to="/" />;
    // }

    return (
      <section className="form-section">
        <header className="header">
          <h1>
            Hello
            <span role="img" aria-label="hand">
              👋
            </span>
          </h1>
        </header>

        <form autoComplete="off" className="form" onSubmit={this.handleSubmit}>
          <h2 className="title">Create account</h2>

          <div className="form-group">
            <label className="label" htmlFor="firstName">
              First name
            </label>
            <input
              className="input"
              id="firstName"
              type="text"
              name="firstName"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="input"
              id="lastName"
              type="text"
              name="lastName"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              id="email"
              type="email"
              name="email"
              onChange={this.handleChange}
            />
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
              onChange={this.handleChange}
            />
          </div>

          <button className="btn-submit">Let's go!</button>
        </form>

        <div className="form-section-bottom">
          <p>Already have an account? </p>
          <Link className="link" to="/signin">
            Log in
          </Link>
        </div>
      </section>
    );
  }
}

export default withRouter(FormSignup);
