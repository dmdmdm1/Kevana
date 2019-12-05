import React, { Component } from "react";
import axios from "axios";
import AllVideos from "./AllVideos";
import { Link, Switch, Route } from "react-router-dom";
import FeedHistory from "./FeedHistory";
//import Tags from "./Tags";
import { Button } from "react-bootstrap";
import { ButtonToolbar } from "react-bootstrap";

export default class Home extends Component {
  state = {
    search: "",
    videos: [],
    history: [],
    isLoading: true,
    historyIsLoading: true,
    filter: {},
    clicked: "outline-primary",
    notClicked: "secondary"
  };
  componentDidMount() {
    this.getAllVideos();
    this.getHistoryLatest20();
  }

  getAllVideos = () => {
    axios.get("/api/videos").then(response => {
      this.setState({ videos: response.data, isLoading: false }); // this triggers a re-render
    });
  };

  getHistoryLatest20 = () => {
    axios.get("/api/history").then(response => {
      this.setState({ history: response.data, historyIsLoading: false }); // this triggers a re-render
    });
  };

  searchHandler = event => {
    this.setState({
      search: event.target.value
    });
  };

  setFilter = (filterType, filterValue) => {
    this.setState({
      filter: { ...this.state.filter, [filterType]: filterValue }
    });
  };

  searchButtonHandler = event => {
    event.preventDefault();
    this.setState({
      videos: this.state.videos.filter(video => {
        return video.title
          .toLowerCase()
          .includes(this.state.search.toLowerCase());
      })
    });
  };

  render() {
    return (
      <div>
        <div className="header">
          <form onSubmit={this.searchButtonHandler}>
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

        <div>
          length:
          <ButtonToolbar>
            <Button
              variant={
                this.state.filter.length === 600
                  ? "outline-primary"
                  : "secondary"
              }
              size="sm"
              onClick={() => {
                if (this.state.filter.length !== 600) {
                  this.setFilter("length", 600);
                } else {
                  this.setFilter("length", null);
                }
              }}
            >
              5 min
            </Button>
            <Button
              variant={this.state.clicked ? "outline-primary" : "secondary"}
              size="sm"
              onClick={() => this.setFilter("length", 900)}
            >
              10 min
            </Button>
            <Button
              variant={this.state.clicked ? "outline-primary" : "secondary"}
              size="sm"
              onClick={() => this.setFilter("length", 1200)}
            >
              15 min
            </Button>
          </ButtonToolbar>
        </div>
        <AllVideos
          exact
          path="/"
          videos={this.state.videos}
          search={this.state.search}
          isLoading={this.state.isLoading}
        />
        <FeedHistory
          history={this.state.history}
          isLoading={this.state.historyIsLoading}
        />
      </div>
    );
  }
}
