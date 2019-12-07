import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { withRouter } from "react-router-dom";

const withMyStyles = withStyles(theme => ({
  root: {
    height: "100vh"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

class AddVideo extends Component {
  state = {
    videoUrl: "",
    creationError: null
  };

  onVideoCreation = event => {
    event.preventDefault();
    axios
      .post("/api/videos", { videoUrl: this.state.videoUrl })
      .then(response => {
        this.props.history.push(`videos/${response.data._id}`); // go to created video
      })
      .catch(error => {
        console.log("hi", error);
        if (error.response.status === 403) {
          this.setState({
            creationError: "The Video already exists"
          });
        } else {
          this.setState({
            creationError: "Oops, something went wrong."
          });
        }
      });
  };

  onVideoUrlChange = event => {
    this.setState({ videoUrl: event.target.value });
  };

  render() {
    return (
      <form className="{classes.container}" noValidate autoComplete="off">
        <div>
          <TextField
            creationError={this.state.creationError ? true : false}
            helperText={this.state.creationError}
            variant="outlined"
            fullWidth
            required
            margin="normal"
            name="video-url"
            label="video-url"
            id="standard-required"
            label="Video url"
            onChange={this.onVideoUrlChange}
            value={this.state.videoUrl}
          />
          <Button
            variant="contained"
            color="primary"
            className="{classes.button}"
            onClick={this.onVideoCreation}
          >
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

export default withMyStyles(withRouter(AddVideo));
