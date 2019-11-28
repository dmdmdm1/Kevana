import axios from "axios";
import React, { Component } from "react";

class SomeProfile extends React.Component {
    state = {
      userData: [],
      isLoading: true
    };
  
    getProfile = () => {
      axios.get(`/api/profile/${this.props.match.params.id}`).then(response => {
        console.log("response.data : " + JSON.stringify(response.data));
        this.setState({ userData: response.data, isLoading: false }); // this triggers a re-render
      });
    };
  
    componentDidMount() {
      this.getProfile();
    }
  
    
  
    render() {
      if (this.state.userData.isUser){
      this.props.history.push("/");}
      return (
        <div>
          {/* {this.state.userData} */}
          {console.log(this.state)}
        </div>
      );
    }
  }

export default SomeProfile;