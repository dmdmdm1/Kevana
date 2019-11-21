import React from "react";
import axios from "axios";

class AllVideos extends React.Component {
  render() {
    return (
      <div>
        <div id="video-list-container">
          <h1>Yoga Videos from our database</h1>
          {this.props.isLoading ? <h2>Loading...</h2> : null}
          {!this.props.isLoading && this.props.videos.length === 0 ? (
            <h2>no videos so far...</h2>
          ) : null}
          {this.props.videos.map(video => (
            <div key={video._id}>
              Title: {video.title} -- video_id: {video.video_id}{" "}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AllVideos;
