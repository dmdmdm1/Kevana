import React, { Component } from "react";
import axios from "axios";
import AllVideos from "./AllVideos";
import FeedHistory from "./FeedHistory";

export default class Home extends Component {
  state = {
    search: "",
    videos: [],
    history: [],
    isLoading: true,
    historyIsLoading: true
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

  searchButtonHandler = event => {
    event.preventDefault();
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
