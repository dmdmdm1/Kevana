import React from 'react';
import axios from 'axios'
import { Link } from "react-router-dom";

class AllVideos extends React.Component {

    state = {
      videos: [],
      isLoading: true
    }
  
    getAllVideos = () => {
      axios.get('/api/videos').then((response) => {
        console.log("response.data : " + JSON.stringify(response.data))
        this.setState({ videos: response.data, isLoading: false }) // this triggers a re-render
      })
    }
  
    componentDidMount() {
      this.getAllVideos()
    }
  
  
    render() {
      return (
        <div>
          <div id="video-list-container">
            <h1>Yoga Videos from our database</h1>
            {this.state.isLoading ? <h2>Loading...</h2> : null}
            {(!this.state.isLoading && this.state.videos.length === 0) ? <h2>no videos so far...</h2> : null}
            {this.state.videos.map(video =>
              <div key={video._id}>
                <Link to={`/videos/${video._id}`} >
                Title: {video.title} </Link>
                -- video_id: {video.video_id} </div>
            )}
          </div >
        </div>
      );
    }
  
  }
  
  export default AllVideos;
  