import axios from "axios";
import React, { Component } from "react";

class OwnProfile extends React.Component {
    state = {
      userData: []
    };
  
  // userData is given as props from App.js
    componentDidMount() {
      this.setState({ userData: this.props.theLoggedInUser })
    }
  
    render() {
      return (
        <div>
          {/* {this.state.userData} */}
          {console.log("this.state.userData._id: "+this.state.userData._id)}
        </div>
      );
    }
  }

export default OwnProfile;