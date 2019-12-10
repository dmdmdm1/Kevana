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
    displayedVideos: [],
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

  // searchHandler = event => {
  //   this.setState({
  //     search: event.target.value
  //   });
  // };

  // searchHandler = e => {
  //   let searchQuery = e.target.value;
  //   let currentList = [];
  //   let newList = [];

  //   if (searchQuery !== "") {
  //     currentList = this.state.videos;
  //     newList = currentList.filter(video =>
  //       video.title.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   } else {
  //     newList = this.state.videos;
  //   }

  //   this.setState({
  //     videos: newList
  //   });
  // };

  searchHandler = e => {
    this.setState({
      search: e.target.value
    });
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.state.videos;

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter(video => {
        // change current item to lowercase
        const lc = video.title.toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.state.videos;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      displayedVideos: newList
    });
  };

  setFilter = (filterType, filterValue) => {
    this.setState({
      filter: { ...this.state.filter, [filterType]: filterValue }
    });
  };

  // searchButtonHandler = event => {
  //   event.preventDefault();
  //   this.setState({
  //     videos: this.state.videos.filter(video => {
  //       return (
  //         video.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
  //         -1
  //       );
  //     })
  //   });
  // };

  render() {
    console.log("videos", this.state.videos);
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
          videos={
            this.state.search === ""
              ? this.state.videos
              : this.state.displayedVideos
          }
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
