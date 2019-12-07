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
    bodyParts: "",
    difficultyLevel: "",
    creationError: null
  };

  onVideoCreation = event => {
    event.preventDefault();
    axios
      .post("/api/videos", {
        videoUrl: this.state.videoUrl,
        bodyParts: this.state.bodyParts,
        difficultyLevel: this.state.difficultyLevel
      })
      .then(response => {
        this.props.history.push(`videos/${response.data._id}`); // go to created video
      })
      .catch(error => {
        console.log("hi", error);
        if (error.response.status === 409) {
          this.setState({
            creationError: error.response.data.message
          });
        } else if (error.response.status === 422) {
          this.setState({
            creationError: error.response.data.message
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

  onbodyPartsChange = event => {
    this.setState({ bodyParts: event.target.value });
  };

  ondifficultyLevelChange = event => {
    this.setState({ difficultyLevel: event.target.value });
  };
  render() {
    return (
      <form className="{classes.container}" noValidate autoComplete="off">
        <div>
          <TextField
            error={this.state.creationError ? true : false}
            helperText={this.state.creationError}
            variant="outlined"
            fullWidth
            required
            margin="normal"
            name="video-url"
            label="Video URL"
            id="standard-required"
            onChange={this.onVideoUrlChange}
            value={this.state.videoUrl}
          />
          <TextField
            error={this.state.creationError ? true : false}
            helperText={this.state.creationError}
            variant="outlined"
            fullWidth
            required
            margin="normal"
            name="body-parts"
            id="standard-required"
            label="Body Parts"
            onChange={this.onbodyPartsChange}
            value={this.state.bodyParts}
          />
          <TextField
            error={this.state.creationError ? true : false}
            helperText={this.state.creationError}
            variant="outlined"
            fullWidth
            required
            margin="normal"
            name="difficulty-level"
            id="standard-required"
            label="Difficulty Level"
            onChange={this.ondifficultyLevelChange}
            value={this.state.difficultyLevel}
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
