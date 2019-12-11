import axios from "axios";
import React from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

class SingleVideo extends React.Component {
  state = {
    video: [],
    isLoading: true
  };

  getSingleVideo = () => {
    axios.get(`/api/videos/${this.props.match.params.id}`).then(response => {
      this.setState({ video: response.data, isLoading: false }); // this triggers a re-render
    });
  };

  componentDidMount() {
    this.getSingleVideo();
  }

  practicedButtonHandler = () => {
    axios
      .post(`/api/history/practiced/${this.props.match.params.id}`)
      .then(response => {
        console.log(response);
        // this.props.history.push(`videos/${response.data._id}`) // go to created video
      });
  };
  render() {
    return (
      <div className="single-video-page">
        <div className="single-video-container">
          <h2>{this.state.video.title}</h2>
          {console.log(this.state)}
          <ReactPlayer url={this.state.video.link} />
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
    );
  }
}

export default SingleVideo;
