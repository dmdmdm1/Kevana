import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import DifficultyLevel from "./DifficultyLevel";

const BODY_PARTS = [
  "mind",
  "legs",
  "back",
  "neck",
  "shoulders",
  "hands",
  "feet",
  "core"
];

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
    bodyParts: [],
    difficultyLevel: "",
    creationError: null,
    bodyPartsError: null
  };

  //  error = this.state.bodyParts.filter(v => v).length < 1;

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
        if (error.response.status === 409) {
          this.setState({
            creationError: error.response.data.message
          });
        } else if (error.response.status === 422) {
          this.setState({
            creationError: error.response.data.message
          });
        } else if (error.response.status === 400) {
          this.setState({
            bodyPartsError: error.response.data.error
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

  onBodyPartsChange = event => {
    if (event.target.checked) {
      this.setState({
        bodyParts: [...this.state.bodyParts, event.target.value]
      });
    } else {
      this.setState({
        bodyParts: this.state.bodyParts.filter(
          elem => elem !== event.target.value
        )
      });
    }
  };

  onDifficultyLevelChange = event => {
    this.setState({ difficultyLevel: event.target.value });
  };
  // onDifficultyLevelChange = event => {
  //
  // };
  render() {
    return (
      <div className="add-video-page">
        <h2>Add a video</h2>
        <div className="card-container col-md-6">
          <form className="{classes.container}" noValidate autoComplete="off">
            <div>
              <div className="well">
                <div className="add-card">
                  <div className="url-input-field">
                    <p className="add-video-p">
                      Enter the url of the video you want to add*:
                    </p>
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
                  </div>
                  <div className="checkbox-body-parts">
                    <p className="add-video-p" id="text-checkbox">
                      Pick the targeted body parts:
                    </p>
                    {BODY_PARTS.map(bodyPart => (
                      <div className="form-check form-check-inline">
                        <div key={BODY_PARTS.indexOf(bodyPart)}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            value={bodyPart}
                            onChange={this.onBodyPartsChange}
                          />
                          <label
                            className="form-check-label"
                            for="inlineCheckbox1"
                          >
                            {bodyPart}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="difficulty-level">
                    <p className="add-video-p">
                      Select the difficulty level of the video:
                    </p>
                    <DifficultyLevel
                      initialDifficulty={this.state.difficultyLevel}
                      onDifficultyLevelChange={this.onDifficultyLevelChange}
                    />
                  </div>
                  <div className="add-video-button">
                    <Button
                      variant="contained"
                      color="primary"
                      className="{classes.button}"
                      onClick={this.onVideoCreation}
                    >
                      Submit
                    </Button>
                  </div>
                  <p className="add-video-p" id="error-msg">
                    {this.state.bodyPartsError}
                  </p>
                  <p id="warning">
                    * At the moment we only support youtube videos
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withMyStyles(withRouter(AddVideo));
