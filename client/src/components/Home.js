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
    filter: {
      bodyParts: []
    }
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

  render() {
    const videos =
      this.state.search === "" ? this.state.videos : this.state.displayedVideos;
    console.log(videos);
    let filteredVideos = videos.filter(video => {
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
    if (this.state.filter.bodyParts.length > 0) {
      filteredVideos = filteredVideos.filter(video => {
        let found = false;
        this.state.filter.bodyParts.forEach(b => {
          console.log(b, video.bodyParts);
          if (video.bodyParts.includes(b)) {
            console.log("TRUEEEE");
            found = true;
          }
        });
        return found;
      });
    }
    let videoResults = null;
    if (this.state.search === "" && this.state.filter === {}) {
      videoResults = this.state.videos;
    } else if (this.state.search !== "" && this.state.filter === {}) {
      videoResults = this.state.displayedVideos;
    } else {
      videoResults = filteredVideos;
    }

    const processedVideos = videoResults;

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
                  this.setFilter("length", 300);
                } else {
                  this.setFilter("length", null);
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
            <p className="length">bodyparts:</p>
            <Button
              variant={
                this.state.filter.bodyParts.includes("mind")
                  ? "info buttonSpaceIsBetter"
                  : "outline-info buttonSpaceIsBetter"
              }
              size="sm"
              onClick={() => {
                if (!this.state.filter.bodyParts.includes("mind")) {
                  this.setFilter("bodyParts", [
                    ...this.state.filter.bodyParts,
                    "mind"
                  ]);
                } else {
                  this.setFilter(
                    "bodyParts",
                    this.state.filter.bodyParts.filter(e => e !== "mind")
                  );
                }
              }}
            >
              mind
            </Button>
            <Button
              variant={
                this.state.filter.bodyParts.includes("legs")
                  ? "info buttonSpaceIsBetter"
                  : "outline-info buttonSpaceIsBetter"
              }
              size="sm"
              onClick={() => {
                if (!this.state.filter.bodyParts.includes("legs")) {
                  this.setFilter("bodyParts", [
                    ...this.state.filter.bodyParts,
                    "legs"
                  ]);
                } else {
                  this.setFilter(
                    "bodyParts",
                    this.state.filter.bodyParts.filter(e => e !== "legs")
                  );
                }
              }}
            >
              legs
            </Button>
            <Button
              variant={
                this.state.filter.bodyParts.includes("shoulders")
                  ? "info buttonSpaceIsBetter"
                  : "outline-info buttonSpaceIsBetter"
              }
              size="sm"
              onClick={() => {
                if (!this.state.filter.bodyParts.includes("shoulders")) {
                  this.setFilter("bodyParts", [
                    ...this.state.filter.bodyParts,
                    "shoulders"
                  ]);
                } else {
                  this.setFilter(
                    "bodyParts",
                    this.state.filter.bodyParts.filter(e => e !== "shoulders")
                  );
                }
              }}
            >
              shoulders
            </Button>
            <Button
              variant={
                this.state.filter.bodyParts.includes("neck")
                  ? "info buttonSpaceIsBetter"
                  : "outline-info buttonSpaceIsBetter"
              }
              size="sm"
              onClick={() => {
                if (!this.state.filter.bodyParts.includes("neck")) {
                  this.setFilter("bodyParts", [
                    ...this.state.filter.bodyParts,
                    "neck"
                  ]);
                } else {
                  this.setFilter(
                    "bodyParts",
                    this.state.filter.bodyParts.filter(e => e !== "neck")
                  );
                }
              }}
            >
              neck
            </Button>
            <Button
              variant={
                this.state.filter.bodyParts.includes("back")
                  ? "info buttonSpaceIsBetter"
                  : "outline-info buttonSpaceIsBetter"
              }
              size="sm"
              onClick={() => {
                if (!this.state.filter.bodyParts.includes("back")) {
                  this.setFilter("bodyParts", [
                    ...this.state.filter.bodyParts,
                    "back"
                  ]);
                } else {
                  this.setFilter(
                    "bodyParts",
                    this.state.filter.bodyParts.filter(e => e !== "back")
                  );
                }
              }}
            >
              back
            </Button>
            <Button
              variant={
                this.state.filter.bodyParts.includes("core")
                  ? "info buttonSpaceIsBetter"
                  : "outline-info buttonSpaceIsBetter"
              }
              size="sm"
              onClick={() => {
                if (!this.state.filter.bodyParts.includes("core")) {
                  this.setFilter("bodyParts", [
                    ...this.state.filter.bodyParts,
                    "core"
                  ]);
                } else {
                  this.setFilter(
                    "bodyParts",
                    this.state.filter.bodyParts.filter(e => e !== "core")
                  );
                }
              }}
            >
              core
            </Button>
            <Button
              variant={
                this.state.filter.bodyParts.includes("hand")
                  ? "info buttonSpaceIsBetter"
                  : "outline-info buttonSpaceIsBetter"
              }
              size="sm"
              onClick={() => {
                if (!this.state.filter.bodyParts.includes("hand")) {
                  this.setFilter("bodyParts", [
                    ...this.state.filter.bodyParts,
                    "hand"
                  ]);
                } else {
                  this.setFilter(
                    "bodyParts",
                    this.state.filter.bodyParts.filter(e => e !== "hand")
                  );
                }
              }}
            >
              hand
            </Button>
            <Button
              variant={
                this.state.filter.bodyParts.includes("feet")
                  ? "info buttonSpaceIsBetter"
                  : "outline-info buttonSpaceIsBetter"
              }
              size="sm"
              onClick={() => {
                if (!this.state.filter.bodyParts.includes("feet")) {
                  this.setFilter("bodyParts", [
                    ...this.state.filter.bodyParts,
                    "feet"
                  ]);
                } else {
                  this.setFilter(
                    "bodyParts",
                    this.state.filter.bodyParts.filter(e => e !== "feet")
                  );
                }
              }}
            >
              feet
            </Button>
            <p className="length"> difficulty-level:</p>
            <Button
              variant={
                this.state.filter.length === 300
                  ? "info buttonSpaceIsBetter"
                  : "outline-info buttonSpaceIsBetter"
              }
              size="sm"
              onClick={() => {
                if (this.state.filter.length !== 300) {
                  this.setFilter("length", 300);
                } else {
                  this.setFilter("length", null);
                }
              }}
            >
              beginner
            </Button>
            <Button
              variant={
                this.state.filter.length === 300
                  ? "info buttonSpaceIsBetter"
                  : "outline-info buttonSpaceIsBetter"
              }
              size="sm"
              onClick={() => {
                if (this.state.filter.length !== 300) {
                  this.setFilter("length", 300);
                } else {
                  this.setFilter("length", null);
                }
              }}
            >
              intermediate
            </Button>
            <Button
              variant={
                this.state.filter.length === 300
                  ? "info buttonSpaceIsBetter"
                  : "outline-info buttonSpaceIsBetter"
              }
              size="sm"
              onClick={() => {
                if (this.state.filter.length !== 300) {
                  this.setFilter("length", 300);
                } else {
                  this.setFilter("length", null);
                }
              }}
            >
              advanced
            </Button>
          </ButtonToolbar>
        </div>
        <AllVideos
          exact
          path="/"
          search={this.state.search}
          isLoading={this.state.isLoading}
          videos={processedVideos}
        />
        <FeedHistory
          history={this.state.history}
          isLoading={this.state.historyIsLoading}
        />
      </div>
    );
  }
}
