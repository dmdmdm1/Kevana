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
        console.log(error.response.data.error);
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
          <FormLabel component="legend">Pick the targeted body parts</FormLabel>
          <FormControl
            required
            error={this.state.bodyPartsError ? true : false}
            component="fieldset"
          >
            {BODY_PARTS.map(bodyPart => (
              <FormGroup row key={BODY_PARTS.indexOf(bodyPart)}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.bodyParts.includes(bodyPart)}
                      onChange={this.onBodyPartsChange}
                      value={bodyPart}
                    />
                  }
                  label={bodyPart}
                />
              </FormGroup>
            ))}
          </FormControl>
          <FormHelperText>{this.state.bodyPartsError}</FormHelperText>
          <DifficultyLevel
            initialDifficulty={this.state.difficultyLevel}
            onDifficultyLevelChange={this.onDifficultyLevelChange}
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
