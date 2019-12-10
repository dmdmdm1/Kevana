import React from "react";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-custom">
      <Link to="/" className="navbar-brand" href="#">
        Kevana
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-between"
        id="navbarNavDropdown"
      >
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add-video">
              Add new video
            </Link>
          </li>
        </ul>
      </div>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNavDropdown"
      >
        <ul id="sign-out">
          <li className="nav-item">
            <button className="nav-link" id="so" onClick={props.signOutHandler}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
