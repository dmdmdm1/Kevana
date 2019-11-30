import React, { Component } from "react";

function ShowProfileData(props) {
  return (
    <div>
       Username: {props.dataToBeShown.userName}

      {/* ShowProfileData is called with data: {dataToBeShown} */}
      {console.log("dataToBeShown: " + props.dataToBeShown)}
      {console.log("userName: " + props.dataToBeShown.userName)}
    </div>
  );
}

export default ShowProfileData;
