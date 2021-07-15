import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import FormItem from "./components/Items/FormItem";
import FormUser from "./components/Forms/FormUser";

class App extends Component {
  state = {
    displayForm: false,
  };

  toggleFormDisplay = () => {
    this.setState({ displayForm: !this.state.displayForm });
  };

  handleClose = () => {
    this.setState({ displayForm: false });
  };

  render() {
    return (
      <div className="App">
        <NavMain toggleFormDisplay={this.toggleFormDisplay} />
        <Switch>
          <Route
            exact
            path="/"
            render={(historyProps) => (
              <Home
                {...historyProps}
                displayForm={this.state.displayForm}
                handleClose={this.handleClose}
              />
            )}
          />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/item/create" component={FormItem} />
          <ProtectedRoute
            exact
            path="/profile"
            render={(historyProps) => (
              <Profile
                {...historyProps}
                displayForm={this.state.displayForm}
                handleClose={this.handleClose}
              />
            )}
          />

          <Route exact path="/profile/settings" component={FormUser} />
        </Switch>
      </div>
    );
  }
}

export default App;
