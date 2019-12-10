import axios from "axios";
import React from "react";
import ShowProfileData from "./ShowProfileData";

class SomeProfile extends React.Component {
  state = {
    profileData: [],
    isLoading: true,
    isFollowed: true
  };

  getProfile = () => {
    axios.get(`/api/profile/${this.props.match.params.id}`).then(response => {
      this.setState({ profileData: response.data, isLoading: false }); // this triggers a re-render
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

  changeFollowStatus = () => {
    if (
      this.props.theLoggedInUser.follows.includes(this.props.match.params.id)
    ) {
      axios
        .put(`/api/profile/unfollow/${this.props.match.params.id}`)
        .then(response => {
          this.props.updateUser(response.data);
        })
        .catch(err => console.log("something went Wrong ", err));
    } else {
      axios
        .put(`/api/profile/follow/${this.props.match.params.id}`)
        .then(response => {
          this.props.updateUser(response.data);
        })
        .catch(err => console.log("something went Wrong ", err));
    }
  };

  render() {
    if (this.state.profileData.length === 0) {
      return <h1>Loading.....</h1>;
    }
    return (
      <div>
        {this.state.isLoading ? (
          <p>loading...</p>
        ) : (
          <div>
            <ShowProfileData dataToBeShown={this.state.profileData} />
            <button type="button" onClick={this.changeFollowStatus}>
              {/* {this.props.theLoggedInUser.follows.includes(this.state.profileData.userId_) ? "unfollow" : "follow"} */}
              {this.props.theLoggedInUser.follows.includes(
                this.props.match.params.id
              )
                ? "unFollow"
                : "follow"}
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default SomeProfile;
