import React from "react";
import { Link } from "react-router-dom";

class FeedHistory extends React.Component {
  render() {
    return (
      <div id="feed-list-container">
        {this.props.isLoading ? <h2>Loading...</h2> : null}
        {!this.props.isLoading && this.props.history.length === 0 ? (
          <h2>no one practiced any videos so far...</h2>
        ) : null}
        {this.props.history.map(itemInHistory => (
          <div key={itemInHistory._id}>
            <div className="feed-item">
              <img
                alt="Card cap"
                className="card-img-top"
                src={itemInHistory.practiced_video.image}
              ></img>
              <div className="card-body">
                <p className="card-title">
                  {itemInHistory.user_name.email + " "} practiced the video:
                  <em>{" " + itemInHistory.practiced_video.title}</em>
                </p>
              </div>
              <p className="card-text">{itemInHistory.user_name.email + " "}</p>
              <Link to={`/videos/${itemInHistory.practiced_video._id}`}>
                <button className="watch" type="button">
                  watch
                </button>
              </Link>
              <Link to={`/profile/${itemInHistory.user_name._id}`}>
                <button className="profile-button" type="button">
                  {itemInHistory.user_name.email}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default FeedHistory;
