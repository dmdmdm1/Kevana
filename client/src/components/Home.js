import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default class Home extends Component {

  signOutHandler = (event) => {
    axios
      .get("/api/auth/logout", this.state)
      .then(response => {
        this.props.history.push("/login");
      })
      .catch((error) => console.log("logout page, something went wrong", error));
  }
  render() {
    return (
      <div>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" href="#">
              Kevana
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/home">
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="#">
                    Add new video
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={this.signOutHandler} >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="text-center">
          <nav className="navbar navbar-light bg-light">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              ></input>
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </nav>
        </div>
      </div>
    );
  }
}
