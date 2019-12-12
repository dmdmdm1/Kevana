import React from "react";
import { Link } from "react-router-dom";

function ShowProfileData(props) {
  const { userName, favorites, follows, email } = props.dataToBeShown;
  return (
    <div class="profile-data">
      <div className="add-card">
        <h4>User {email}</h4>
        {follows.length ? (
          <div>
            is following these users:{" "}
            <ul class="list-group">
              {follows.map(followedUser => (
                <div key={followedUser._id}>
                  <Link
                    class="list-group-item"
                    to={`/profile/${followedUser._id}`}
                  >
                    {followedUser.email}{" "}
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <p>...is not following anyone at the moment. </p>
        )}
      </div>
    </div>
  );
}

export default ShowProfileData;
