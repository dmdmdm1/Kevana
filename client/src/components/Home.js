import React, { Component } from "react";
import axios from "axios";
import AllVideos from "./AllVideos";
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
    filter: {}
  };
  componentDidMount() {
    this.getAllVideos();
    this.getHistoryLatest20();
  }

  getAllVideos = () => {
    axios.get("/api/videos").then(response => {
      console.log("response", response);
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
    console.log(this.state.videos);
    const videos = this.state.videos.filter(video => {
      if (this.state.filter.length) {
        if (
          this.state.filter.length + 180 <= video.length ||
          this.state.filter.length - 180 >= video.length
        ) {
          return false;
        }
      }
      return true;
    });
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

        <div className="buttonsWrapper">
          <ButtonToolbar>
            <p className="length">length:</p>
            <Button
              variant={
                this.state.filter.length === 300
                  ? "info buttonSpaceIsBetter"
                  : "outline-info buttonSpaceIsBetter"
              }
              size="sm"
              onClick={() => {
                if (this.state.filter.length !== 300) {
                  this.setFilter("length buttonSpaceIsBetter", 300);
                } else {
                  this.setFilter("length buttonSpaceIsBetter", null);
                }
              }}
            >
              5 min
            </Button>
            <Button
              variant={
                this.state.filter.length === 600
                  ? "info buttonSpaceIsBetter"
                  : "outline-info buttonSpaceIsBetter"
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
              10 min
            </Button>
            <Button
              variant={
                this.state.filter.length === 900
                  ? "info buttonSpaceIsBetter"
                  : "outline-info buttonSpaceIsBetter"
              }
              size="sm"
              onClick={() => {
                if (this.state.filter.length !== 900) {
                  this.setFilter("length", 900);
                } else {
                  this.setFilter("length", null);
                }
              }}
            >
              15 min
            </Button>
          </ButtonToolbar>
        </div>
        <AllVideos
          exact
          path="/"
          videos={videos}
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
