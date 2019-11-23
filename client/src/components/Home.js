import React, { Component } from "react";
import axios from "axios";
import AllVideos from "./AllVideos"
import { Link, Switch, Route } from "react-router-dom";
import SingleVideo from "./SingleVideo";

export default class Home extends Component {
  state = {
    search: "",
    videos: [],
    isLoading: true
  };
  componentDidMount() {
    this.getAllVideos();
  }

  getAllVideos = () => {
    axios.get("/api/videos").then(response => {
      this.setState({ videos: response.data, isLoading: false }); // this triggers a re-render
    });
  };

  searchHandler = event => {
    this.setState({
      search: event.target.value
    });
  };

  searchButtonHandler = event => {
    this.setState({
      videos: this.state.videos.filter(video => {
        return video.title
          .toLowerCase()
          .includes(this.state.search.toLowerCase());
      })
    });

    // this.state.videos.map(video => {
    //   if (video.title === this.state.search) {
    //     console.log("match", video);
    //     this.setState({
    //       videos: [...video]
    //     });
    //   }
    // });
  };

  signOutHandler = event => {
    axios
      .get("/api/auth/logout", this.state)
      .then(response => {
        this.props.history.push("/login");
      })
      .catch(error => console.log("logout page, something went wrong", error));
  };
  render() {
    console.log(this.state.search);
    console.log(this.state.videos);
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
                  <button className="nav-link" onClick={this.signOutHandler}>
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
                onChange={this.searchHandler}
                type="text"
                className="search-field business"
                placeholder="Search"
              ></input>
              <button
                className="search-btn"
                type="button"
                onClick={this.searchButtonHandler}
              >
                Go
              </button>
            </div>
          </form>
        </div>
    <Switch >
      <AllVideos path='/home' videos={this.state.videos} search={this.state.search}  />
      <Route exact path='/videos/:id' component={SingleVideo} />  
    </Switch>
      </div>
    );
  }
}
