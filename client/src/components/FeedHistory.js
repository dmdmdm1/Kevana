import React from "react";
import { Link } from "react-router-dom";


class FeedHistory extends React.Component {
  render() {

    return (
      <div id="video-list-container">
        <h1>Here's what users have been practicing</h1>
        {this.props.isLoading ? <h2>Loading...</h2> : null}
        {!this.props.isLoading && this.props.history.length === 0 ? (
          <h2>no one practiced any videos so far...</h2>
        ) : null}
        {this.props.history.map(video => (
          <div key={video.video_id}>
            {/* here we can link to the user page of the person that practiced video */}
            Some user practiced this one:
            {/* <Link to={`/videos/${video._id}`}>
                Title: {video.practiced_video.title}{" "} */}
            <Link to={`/videos/${video.practiced_video.video_id}`}>
              Title: {video.practiced_video.title}{" "}
            </Link>
            -- video_id: {video.practiced_video.video_id}{" "}
          </div>
        ))}
      </div>
    );
  }
}

export default FeedHistory;
