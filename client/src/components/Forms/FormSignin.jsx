import React, { Component, Redirect } from "react";
import { Link, useHistory} from "react-router-dom";
//import { withUser } from "../Auth/withUser";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import "../../styles/form.css";

class FormSignin extends Component {
  static contextType = UserContext;

  state = {};

  handleChange = (event) => {
    const key = event.target.name;
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

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        console.log(this.props)
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
    //console.log(this.props)

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

export default withRouter(FormSignin); 
// Browser history and user will be given as props to the FormSignin thanks to HOCs !
