import axios from "axios";
import React from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import FeedHistory from "./FeedHistory";

class SingleVideo extends React.Component {
  state = {
    video: [],
    isLoading: true,
    history: [],
    historyIsLoading: true
  };

  getSingleVideo = () => {
    axios.get(`/api/videos/${this.props.match.params.id}`).then(response => {
      this.setState({ video: response.data, isLoading: false }); // this triggers a re-render
    });
  };

  getHistoryLatest20 = () => {
    axios.get("/api/history").then(response => {
      this.setState({ history: response.data, historyIsLoading: false }); // this triggers a re-render
    });
  };

  componentDidMount() {
    this.getSingleVideo();
    this.getHistoryLatest20();
  }

  practicedButtonHandler = () => {
    axios
      .post(`/api/history/practiced/${this.props.match.params.id}`)
      .then(response => {
        // this.props.history.push(`videos/${response.data._id}`) // go to created video
      });
  };
  render() {
    return (
      <div className="single-video-page">
        <div className="single-video-container">
          <h4>{this.state.video.title}</h4>
          <ReactPlayer url={this.state.video.link} />
          <div className="button-wrapper">
            <button
              type="button"
              className="watch"
              id="practiced"
              onClick={this.practicedButtonHandler}
            >
              I practiced this video
            </button>
            <Link to={`/`}>
              <button className="back" type="button">
                Back to all videos
              </button>
            </Link>
          </div>
        </div>
        <div className="feed-container">
          <h4 id="feed-title">Here's what users have been practicing</h4>
          <FeedHistory
            history={this.state.history}
            isLoading={this.state.historyIsLoading}
          />
        </div>
      </div>
    );
  }
}

export default SingleVideo;
