import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";

export const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    user: null,
    isLoggedIn: false,
    isLoading: true,
  };

  componentDidMount() {
    apiHandler
      .isLoggedIn()
      .then((data) => {
        this.setState({ user: data, isLoggedIn: true, isLoading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ user: null, isLoggedIn: false, isLoading: false });
      });
  }

  setUser = (user) => {
    this.setState({ user, isLoggedIn: true });
  };

  removeUser = () => {
    this.setState({ user: null, isLoggedIn: false });
  };

  render() {
    //  Setup all the values/functions you want to expose to anybody reading
    // from the AuthContext.
    const authValues = {
      user: this.state.user,
      setUser: this.setUser,
      removeUser: this.removeUser,
      isLoggedIn: this.state.isLoggedIn,
      isLoading: this.state.isLoading,
    };
    return (
      <AuthContext.Provider value={authValues}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
