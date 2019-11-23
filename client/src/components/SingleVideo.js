import axios from 'axios';
import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { Link } from "react-router-dom";

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
      console.log("hello!!!!!!!!!!!!!")
    }

    practicedButtonHandler = () => {
      axios.post(`/api/videos/practiced/${this.props.match.params.id}`)
      .then(response => {
        console.log(response)
        // this.props.history.push(`videos/${response.data._id}`) // go to created video 
      })
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
      console.log("mir!")
      return (
        <div>
          {this.state.video.title}
          {console.log(this.state)}
          <ReactPlayer
  url={this.state.video.link}
/>
<button
                type="button"
                onClick={this.practicedButtonHandler}
              >
                I practiced this video
              </button>
<Link to={`/`} >
                Back to all videos </Link>

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
  