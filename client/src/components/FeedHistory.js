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
        {this.props.history.map(itemInHistory => (
          <div key={itemInHistory._id}>
            {/* here we can link to the user page of the person that practiced video */}
            <Link to={`/profile/${itemInHistory.user_name._id}`}>
             A user {" "}
            </Link>
            practiced this video:
            <Link to={`/videos/${itemInHistory.practiced_video._id}`}>
              {itemInHistory.practiced_video.title}{" "}
            </Link>
            {/* -- video_id: {itemInHistory.practiced_video.video_id}{" "} */}
          </div>
        ))}
      </div>
    );
  }
}

export default FeedHistory;
