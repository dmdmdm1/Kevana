import React, { Component } from "react";
import axios from "axios";
import AllVideos from "./AllVideos"
import { Link } from "react-router-dom";

export default class Home extends Component {


  componentDidMount(){
axios.get("/api/videos").then(res => console.log(res))

  }

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
        <div className="header">
          <form>
            <h1>Search for amazing yoga videos</h1>
            <div className="form-box">
              <input
                type="text"
                className="search-field business"
                placeholder="Search"
              ></input>
              <button className="search-btn" type="button">
                Go
              </button>
            </div>
          </form>
        </div>
    
    <AllVideos />
      </div>
    );
  }
}
