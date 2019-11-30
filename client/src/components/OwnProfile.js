import React, { Component } from "react";
import ShowProfileData from "./ShowProfileData"

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
          <ShowProfileData dataToBeShown={this.state.userData} />
          {/* {this.state.userData} */}
          {console.log("this.state.userData._id: "+this.state.userData._id)}
        </div>
      );
    }
  }

export default OwnProfile;