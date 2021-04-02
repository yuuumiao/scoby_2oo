import React, { Component } from "react";
import { Link } from "react-router-dom";
import withUser from "../components/Auth/withUser";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "./../api/apiHandler"
import CardItem from "../components/Items/CardItem"
import "../styles/Profile.css";
import "../styles/CardItem.css";


class Profile extends Component {
  static contextType = UserContext;

  state = {
    phoneNumber: "",
    httpResponse: null,
    selectedItem: null,
    userItems: [],
  }


  componentDidMount(){
    this.setState({phoneNumber: this.context.user.phoneNumber})
  }

  handleChange = (event) => {
    this.setState({ phoneNumber: event.target.value})
  }

  addPhoneNumber = (event) => {
    event.preventDefault(); 
    const { httpResponse, userItems, selectedItem, ...userData } = this.state;
    console.log(userData)

    apiHandler
      //.updateUserInfos(userData)
      .updateUserInfos({
        phoneNumber: this.state.phoneNumber
      })
      .then((data) => {
        this.context.setUser(data);
        this.setState({
          httpResponse: { status: "success", message: "Phone number added." },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
      })
      .catch((error) => {
        this.setState({
          httpResponse: {
            status: "failure",
            message: "An error occured, try again later",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
      });
  };
  


  render() {

    const { user } = this.context;

    return (
      <div style={{ padding: "100px", fontSize: "1.25rem" }}>
        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}


        <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
          This is profile, it's protected !
        </h2>
        <p>
          Checkout the<b>ProtectedRoute</b> component in
          <code>./components/ProtectRoute.jsx</code>
        </p>
        <a
          style={{ color: "dodgerblue", fontWeight: "bold" }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://reacttraining.com/react-router/web/example/auth-workflow"
        >
          React router dom Demo of a protected route
        </a>

        <section className="Profile">
          <div className="user-image round-image">
            <img src={user.profileImg} alt={user.firstName} />
          </div>
          <div className="user-presentation">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <Link className="link" to="/profile/settings">
              Edit profile
            </Link>
          </div>

          <div className="user-contact">
            <h4>Add a phone number</h4>

            <form className="form" onSubmit={this.addPhoneNumber}>
              <div className="form-group">
                <label className="label" htmlFor="phoneNumber">
                  Phone number
                </label>
                <input
                  className="input"
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  placeholder="Add phone number"
                  value={this.state.phoneNumber}
                  onChange={this.handleChange}
                />
              </div>
              <button className="form__button">{this.state.phoneNumber? "Change phone number":"Add phone number"}</button> 
            </form>
          </div>

          {/* Break whatever is belo  */}
          <div className="CardItem">
            <div className="item-empty">
              <div className="round-image">
                <img src="/media/personal-page-empty-state.svg" alt="" />
              </div>
              <p>You don't have any items :(</p>
            </div>
          </div>

      <CardItem />


        </section>
      </div>
    );
  }
}

export default withUser(Profile);
