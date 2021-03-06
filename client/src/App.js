import React from "react";
import axios from "axios";
import SomeProfile from "./components/SomeProfile";
import OwnProfile from "./components/OwnProfile";
import ShinySignUp from "./components/ShinySignUp";
import { withRouter, Switch, Route } from "react-router-dom";
import ShinyLogin from "./components/ShinyLogin";
import Home from "./components/Home";
import AddVideo from "./components/AddVideo";
import NavBar from "./components/NavBar";
import SingleVideo from "./components/SingleVideo";

import "./App.css";

class App extends React.Component {
  state = {
    loggedInUser: this.props.user
  };

  updateUserHandler = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  signOutHandler = event => {
    axios
      .get("/api/auth/logout", this.state)
      .then(response => {
        this.updateUserHandler(null);
        this.props.history.push("/");
      })
      .catch(error => console.log("logout page, something went wrong", error));
  };

  render() {
    if (!this.state.loggedInUser) {
      return (
        <Switch>
          <Route path="/signup">
            <ShinySignUp updateUser={this.updateUserHandler} />
          </Route>
          <Route>
            <ShinyLogin updateUser={this.updateUserHandler} />
          </Route>
        </Switch>
      );
    }

    return (
      <div>
        <NavBar signOutHandler={this.signOutHandler} />
        <Switch>
          <Route
            exact
            path="/profile"
            render={props => (
              <OwnProfile
                {...props}
                theLoggedInUser={this.state.loggedInUser}
              />
            )}
          />
          <Route
            exact
            path="/profile/:id"
            render={props => (
              <SomeProfile
                {...props}
                theLoggedInUser={this.state.loggedInUser}
                updateUser={this.updateUserHandler}
              />
            )}
          />
          <Route exact path="/add-video" component={AddVideo} />
          <Route exact path="/" component={Home} />
          <Route exact path="/videos/:id" component={SingleVideo} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
