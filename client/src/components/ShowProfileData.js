import React from "react";
import { Link } from "react-router-dom";

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
        <div>
          this user is following people!!!
          {follows.map(followedUsers => (
            <div key={followedUsers}>
              <Link to={`/profile/${followedUsers}`}>
                link to the user{" "}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>not following anyone ... YET!!!!!11</p>
      )}
    </div>
  );
}

export default ShowProfileData;
