import React, { Component } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
//import UserContext from "../Auth/UserContext";
import withUser from "../Auth/withUser";

import "../../styles/form.css";

class FormUser extends Component {
  //static contextType = UserContext;
  //if using the withUser HOF, then static... is no more needed to access the UserContext

  state = {
    user: null,
    tmpUrl: "",
    httpResponse: null,
    isLoading: true,
  };

  imageRef = React.createRef();
  //Refs are created using React.createRef() and attached to React elements via the ref attribute.

  handleChange = (event) => {
    const key = event.target.name;
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState({
      user: { ...this.state.user, [key]: value },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();

    for (const key in this.state.user) {
      if (key === "profileImg") continue;
      fd.append(key, this.state.user[key]);
    }
    // if (this.imageRef.current.files[0]) {
    //     fd.append("profileImg", this.imageRef.current.files[0]);
    // }
    //console.log(this.state.user)
    apiHandler
      .updateUserInfos(this.state.user)
      .then((data) => {
        //update the context
        //console.log(data,this.props.context)
        this.props.context.setUser(data);
        this.setState({
          httpResponse: {
            status: "success",
            message: "Profile successfully updated.",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 2000);
      })
      .catch((error) => {
        this.setState({
          httpResponse: {
            status: "failure",
            message:
              "Something bad happened while updating your profile, try again later",
          },
        });

        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 2000);
      });
  };

  componentDidMount() {
    apiHandler
      .getUserInfo()
      .then((data) => {
        console.log("data", data);
        this.setState({ user: data, isLoading: false });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          httpResponse: {
            status: "failure",
            message: "Something bad happened, please try again later",
          },
        });
      });
  }

  render() {
    //if there is no loading the return div will happen faster than the didMounted
    //the state.user will return undefined
    // eslint-disable-next-line
    const { httpResponse } = this.state;
    // console.log(this.state.httpResponse)
    //it always return null ?? => why ?
    // console.log(this.props)
    if (this.state.isLoading) return <div>Loading...</div>;

    return (
      <div>
        <form
          className="form"
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        >
          <div className="FormUser__headings">
            <h2 className="title">Edit profile</h2>
            <h2>
              <Link to="/profile">X</Link>
            </h2>
          </div>

          <div className="round-image user-image">
            <img
              src={this.state.tmpUrl || this.state.user.profileImg}
              alt={this.state.user.firstName}
            />
          </div>

          {/* ref={this.imageRef} */}

          <div className="form-group">
            <label className="label" htmlFor="firstName">
              First name
            </label>
            <input
              className="input"
              id="firstName"
              type="text"
              name="firstName"
              value={this.state.user.firstName}
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
              value={this.state.user.lastName}
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
              value={this.state.user.email}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="phoneNumber">
              Phone number:
            </label>
            <input
              className="input"
              id="phoneNumber"
              type="phoneNumber"
              name="phoneNumber"
              value={this.state.user.phoneNumber}
            />
          </div>

          <button className="btn-submit">SAVE</button>
        </form>
      </div>
    );
  }
}

export default withUser(FormUser);
