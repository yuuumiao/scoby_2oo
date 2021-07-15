import React, { Component } from "react";
import { Link } from "react-router-dom";
import withUser from "../components/Auth/withUser";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "./../api/apiHandler";
import CardItem from "../components/Items/CardItem";
import FormItem from "../components/Items/FormItem";
import FormItemEdit from "../components/Items/FormItemEdit";
import "../styles/Profile.css";
import "../styles/CardItem.css";

class Profile extends Component {
  static contextType = UserContext;

  state = {
    phoneNumber: "",
    httpResponse: null,
    selectedItem: null,
    userItems: [],
    displayForm: false,
  };

  componentDidMount() {
    apiHandler
      .getItems()
      .then((data) => {
        this.setState({
          userItems: data,
          phoneNumber: this.context.user.phoneNumber,
        });
      })
      .catch((error) => console.log(error));
  }

  handleChange = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };

  addPhoneNumber = (event) => {
    event.preventDefault();

    apiHandler
      .updateUserInfos({
        phoneNumber: this.state.phoneNumber,
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

  addItem = (item) => {
    this.setState({ userItems: [...this.state.userItems, item] });
  };

  handleDelete = (id) => {
    apiHandler.deleteItem(id);
    const newItems = this.state.userItems.filter((item) => item._id !== id);
    this.setState({ userItems: newItems });
  };

  closeForm = () => {
    this.setState({ displayForm: false });
  };

  handleEdit = (id) => {
    const selectedItem = [...this.state.userItems].filter(
      (e) => e._id === id
    )[0];
    this.setState({ displayForm: true, selectedItem: selectedItem });
  };

  render() {
    const { user } = this.context;

    return (
      <div style={{ padding: "100px", fontSize: "1.25rem" }}>
        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}

        {/* <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
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
        </a> */}

        {user && this.props.displayForm && (
          <FormItem
            handleClose={this.props.handleClose}
            addItem={this.addItem}
          />
        )}

        {this.state.selectedItem && (
          <FormItemEdit
            handleClose={this.closeForm}
            editItem={this.editItem}
            item={this.state.selectedItem}
          />
        )}

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
            <h4>
              {this.state.phoneNumber
                ? "Change phone number"
                : "Add phone number"}
            </h4>

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
              <button className="form__button">
                {this.state.phoneNumber
                  ? "Change phone number"
                  : "Add phone number"}
              </button>
            </form>
          </div>

          {this.state.userItems.length === 0 && (
            <div className="CardItem">
              <div className="item-empty">
                <div className="round-image">
                  <img src="/media/personal-page-empty-state.svg" alt="" />
                </div>
                <p>You don't have any items</p>
              </div>
            </div>
          )}

          {this.state.userItems.length > 0 &&
            this.state.userItems.map((item) => (
              <CardItem
                key={item._id}
                name={item.name}
                quantity={item.quantity}
                description={item.description}
                image={item.image}
                id={item._id}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
              />
            ))}
        </section>
      </div>
    );
  }
}

export default withUser(Profile);
