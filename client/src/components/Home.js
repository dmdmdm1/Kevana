import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-background">
            <a class="navbar-brand" href="#">
              Kevana
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
              <ul class="navbar-nav">
                <li class="nav-item active">
                  <a class="nav-link" href="#">
                    Home <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Profile
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Add new video
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Dropdown link
                  </a>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div class="header">
          <form>
            <h1>Search for amazing yoga videos</h1>
            <div class="form-box">
              <input
                type="text"
                class="search-field business"
                placeholder="Search"
              ></input>
              <button class="search-btn" type="button">
                Go
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
