import React from "react";
import ProjectList from "./components/ProjectList";
import Signup from "./components/Signup";
import { Redirect, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import ShinyLogin from "./components/ShinyLogin";
import ShinySignUp from "./components/ShinySignUp";
import Home from "./components/Home";

class App extends React.Component {
  state = {
    loggedInUser: this.props.user
  };

  updateUserHandler = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };

  render() {
    return (
      <div>
        <Switch>
          <Route path="/profile" component={ProjectList}></Route>
          <Route
            path="/profile"
            render={() => <ProjectList></ProjectList>}
          ></Route>
          <Route
            path="/signup"
            render={() => {
              if (this.state.loggedInUser) {
                return <Redirect to="/home"></Redirect>;
              } else {
                return (
                  <ShinySignUp
                    history={this.props.history}
                    updateUser={this.updateUserHandler}
                  ></ShinySignUp>
                );
              }
            }}
          ></Route>
          <Route
            path="/login"
            render={() => {
              if (this.state.loggedInUser) {
                return <Redirect to="/home"></Redirect>;
              } else {
                return (
                  <ShinyLogin
                    history={this.props.history}
                    updateUser={this.updateUserHandler}
                  ></ShinyLogin>
                );
              }
            }}
          ></Route>
          <Route exact path={"/home"} component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
