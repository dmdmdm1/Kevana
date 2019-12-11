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
  // video:
  // channel: "Yoga With Adriene"
  // length: 693
  // link: "https://www.youtube.com/watch?v=UEEsdXn8oG8"
  // owner: "5dd015c1eb56242e6d92f92f"
  // title: "!Wake Up Yoga - 11 Minute Morning Yoga Practice - Yoga With Adriene"
  // video_id: "UEEsdXn8oG8"
  // __v: 0
  // _id: "5dd433d24ba06d091480590e"

  render() {
    return (
      <div>
        {this.state.video.title}
        {console.log(this.state)}
        <ReactPlayer url={this.state.video.link} />
        <button
          type="button"
          className="watch"
          onClick={this.practicedButtonHandler}
        >
          I practiced this video
        </button>
        <Link to={`/`}>Back to all videos </Link>
      </div>
    );
  }
}

export default SingleVideo;
