import React, { Component } from "react";

function ShowProfileData(props) {
  const { userName, favorites, follows, email } = props.dataToBeShown;
  return (
    <div>
      <p>Username: {userName}</p>
      Favorites:{" "}
      {favorites.length ? (
        <p>there is at least one favorite</p>
      ) : (
        <p>there are no favorites yet</p>
      )}
      Follows these users:{" "}
      {follows.length ? (
        <p>this user is following people!!!</p>
      ) : (
        <p>not following anyone ... YET!!!!!11</p>
      )}
    </div>
  );
}

export default ShowProfileData;
