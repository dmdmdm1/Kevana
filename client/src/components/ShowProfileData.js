import React, { Component } from "react";

function ShowProfileData(props) {
    const {userName, favorites, follows} = props.dataToBeShown
  return (
    <div>
       Username: {userName}<br></br>
       Favorites: {
           (favorites.length) ? <p>there is at least one favorite</p> : <p>there are no favorites yet</p>
       }
Follows these users: {
           (follows.length) ? <p>this user is following people!!!</p> : <p>not following anyone at the moment</p>
       }
    </div>
  );
}

export default ShowProfileData;
