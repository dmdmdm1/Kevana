import axios from "axios";
import React, { Component } from "react";

class OwnProfile extends React.Component {
    state = {
      userData: [],
      isLoading: true
    };
  
    getProfile = () => {
      axios.get(`/api/profile/`).then(response => {
        console.log("response.data : " + JSON.stringify(response.data));
        this.setState({ userData: response.data, isLoading: false }); // this triggers a re-render
      });
    };
  
    componentDidMount() {
      this.getProfile();
    }
  
    
  
    render() {
      return (
        <div>
          {/* {this.state.userData} */}
          {console.log(this.state)}
        </div>
      );
    }
  }

export default OwnProfile;