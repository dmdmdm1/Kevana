import axios from 'axios';
import React, { Component } from 'react'
import ReactPlayer from 'react-player'

class SingleVideo extends React.Component {

    state = {
      video : [],
      isLoading: true
    }
  
    getSingleVideo = () => {
      axios.get(`/api/videos/${this.props.match.params.id}`).then((response) => {
        console.log("response.data : " + JSON.stringify(response.data))
        this.setState({ video: response.data, isLoading: false }) // this triggers a re-render
      })
    }
  
    componentDidMount() {
      this.getSingleVideo()
    }
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
          <ReactPlayer
  url={this.state.video.link}
/>

          {/* <div id="video-list-container">
            <h1>Yoga Videos from our database</h1>
            {this.state.isLoading ? <h2>Loading...</h2> : null}
            {(!this.state.isLoading && this.state.videos.length === 0) ? <h2>no videos so far...</h2> : null}
            {this.state.videos.map(video =>
              <div key={video._id}>Title: {video.title} -- video_id: {video.video_id} </div>
            )}
          </div > */}
        </div>
      );
    }
  
  }
  
  export default SingleVideo;
  