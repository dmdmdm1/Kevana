import React from "react";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

class AllVideos extends React.Component {
  render() {
    return (
      <div id="video-list-container">
        <div id="video-container">
          {this.props.isLoading ? <h2>Loading...</h2> : null}
          {!this.props.isLoading && this.props.videos.length === 0 ? (
            <h2>no videos so far...</h2>
          ) : null}
          {this.props.videos.map(video => {
            console.log(video);
            return (
              <LazyLoad height={700}>
                <div className="video">
                  <img
                    alt="Card cap"
                    className="card-img-top"
                    src={video.image}
                  ></img>
                  <div key={video._id} className="card-body">
                    <h4 className="card-title">{video.title}</h4>
                  </div>
                  <p className="card-text">
                    here is the description: {video.description}.{" "}
                    <a href="#">#GoPro</a> <a href="#">#GoProHERO6</a>{" "}
                  </p>
                  <Link to={`/videos/${video._id}`}>Watch Video</Link>
                </div>
              </LazyLoad>
            );
          })}
        </div>
      </div>
    );
  }
}

export default AllVideos;
