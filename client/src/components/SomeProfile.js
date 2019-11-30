import axios from "axios";
import React, { Component } from "react";
import ShowProfileData from "./ShowProfileData"

class SomeProfile extends React.Component {
  state = {
    userData: [],
    isLoading: true
  };

  getProfile = () => {
    axios.get(`/api/profile/${this.props.match.params.id}`).then(response => {
      console.log(response)
      this.setState({ userData: response.data, isLoading: false }); // this triggers a re-render
    });
  };

  // if user is trying to look at her own profile, she is redirected to /profile
  // otherwise axios request for profile data is made
  componentDidMount() {   
    if (this.props.theLoggedInUser._id === this.props.match.params.id) {
      this.props.history.push("/profile");
    } else {
      this.getProfile();
    }
  }

  render() {
    return (
      <div>
        <ShowProfileData dataToBeShown={this.state.userData} />
        {/* {this.state.userData} */}
        {console.log(this.state.userData)}
      </div>
    );
  }
}

export default SomeProfile;
