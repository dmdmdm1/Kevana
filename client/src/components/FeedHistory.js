import React from "react";
import { Link } from "react-router-dom";

// state = {
//   videos: this.props.videos
// };

class FeedHistory extends React.Component {
  render() {
    return (
      <div>
        <div id="video-list-container">
          {console.log("this.props:  " + this.props)}
          {console.log("this.props.history:  " + this.props.history)}
          {console.log("this.props.history[0]:  " + this.props.history[0])}
          <h1>Here's what users have been practicing</h1>
          {this.props.isLoading ? <h2>Loading...</h2> : null}
          {!this.props.isLoading && this.props.history.length === 0 ? (
            <h2>no one practiced any videos so far...</h2>
          ) : null}
          {this.props.history.map(video => (
            <div key={video._id}>
              <Link to={`/videos/${video.practiced_video}`}>
                Title: {video.title}{" "}
              </Link>
              -- video_id: {video.video_id}{" "}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FeedHistory;
