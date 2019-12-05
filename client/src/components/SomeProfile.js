import axios from "axios";
import React, { Component } from "react";
import ShowProfileData from "./ShowProfileData";

class SomeProfile extends React.Component {
  state = {
    profileData: [],
    isLoading: true,
    isFollowing: false // hier holt sich der button die Info
  };

  getProfile = () => {
    axios.get(`/api/profile/${this.props.match.params.id}`).then(response => {
      this.setState({ profileData: response.data, isLoading: false }); // this triggers a re-render
    });
    // this.state.profileData.follows.includes(this.props.theLoggedInUser._id) ? this.setState({isFollowing: true}) : this.setState({isFollowing: false})
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

  // funktion um follow/unfollow ans backend zu senden
  // und dann den state updaten
  changeFollowStatus(){ 
    this.state.isFollowing ? ()

    :
    // this.state.isFollowing ? 
    // this.setState({isFollowing: false})

  }


  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <p>loading...</p>
        ) : (
          <ShowProfileData dataToBeShown={this.state.profileData} />
          // stand in for a follow button
        )}

        <button type="button" onClick={this.changeFollowStatus}>{this.state.isFollowing ? "unfollow" : "follow"}</button>
        {/* {this.state.userData} */}
        {console.log(this.state.userData)}
      </div>
    );
  }
}

export default SomeProfile;
