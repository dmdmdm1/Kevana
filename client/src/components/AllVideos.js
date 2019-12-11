import React from "react";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

class AllVideos extends React.Component {
  render() {
    console.log("props", this.props);
    return (
      <div id="video-list-container">
        <div id="video-container">
          {this.props.isLoading ? <h2>Loading...</h2> : null}
          {!this.props.isLoading && this.props.videos.length === 0 ? (
            <h2>no videos so far...</h2>
          ) : null}
          {this.props.videos.map(video => {
            return (
              <div key={video._id}>
                <LazyLoad height={700}>
                  <div className="video">
                    <img
                      alt="Card cap"
                      className="card-img-top"
                      src={video.image}
                    ></img>
                    <div className="card-body">
                      <h4 className="card-title">{video.title}</h4>
                    </div>
                    <p className="card-text">{video.description}. </p>
                    <Link to={`/videos/${video._id}`}>
                      <button className="watch" type="button">
                        Watch Video
                      </button>
                    </Link>
                  </div>
                </LazyLoad>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default AllVideos;
