import React from "react";
import axios from "axios";
import ProjectList from "./components/ProjectList";
import ShinySignUp from "./components/ShinySignUp";
import { withRouter, Switch, Route } from "react-router-dom";
import ShinyLogin from "./components/ShinyLogin";
import Home from "./components/Home";
import AddVideo from "./components/AddVideo";
import NavBar from "./components/NavBar";

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
          <Route path="/profile" component={ProjectList} />
          <Route path="/profile" render={ProjectList} />
          <Route exact path="/add-video" component={AddVideo} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
