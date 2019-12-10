import React from "react";
import ShowProfileData from "./ShowProfileData"

class OwnProfile extends React.Component {
    state = {
      userData: this.props.theLoggedInUser
    };
  
    render() {
      return (
        <div>
          <ShowProfileData dataToBeShown={this.state.userData} />
        </div>
      );
    }
  }

export default OwnProfile;