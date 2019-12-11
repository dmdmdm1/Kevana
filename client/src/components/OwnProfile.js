import React from "react";
import ShowProfileData from "./ShowProfileData";
import axios from "axios";

class OwnProfile extends React.Component {
  state = {
    userData: this.props.theLoggedInUser,
    profileData: [],
    isLoading: true
  };

  getProfile = () => {
    axios.get(`/api/profile/${this.state.userData._id}`).then(response => {
      this.setState({ profileData: response.data, isLoading: false });
    });
  };

  render() {
    if (this.state.profileData.length === 0) {
      this.getProfile();
      return <h1>Loading.....</h1>;
    }
    return (
      <div>
        {this.state.isLoading ? (
          <p>loading...</p>
        ) : (
          <div>
            <ShowProfileData dataToBeShown={this.state.profileData} />
          </div>
        )}
      </div>
    );
  }
}

export default OwnProfile;
