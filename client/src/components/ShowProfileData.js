import React from "react";
import { Link } from "react-router-dom";

function ShowProfileData(props) {
  const { userName, favorites, follows, email } = props.dataToBeShown;
  return (
    <div>
      {/* {console.log(follows)} */}
      {/* <p>Username: {userName}</p> */}
      {/* Favorites:{" "}
      {favorites.length ? (
        <p>there is at least one favorite</p>
      ) : (
        <p>there are no favorites yet</p>
      )} */}
      User {email}
      {follows.length ? (
        <div>
          is following these users:{" "}
          {follows.map(followedUser => (
            <div key={followedUser._id}>
              <Link to={`/profile/${followedUser._id}`}>
                {followedUser.email}{" "}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>is not following anyone</p>
      )}
    </div>
  );
}

export default ShowProfileData;
