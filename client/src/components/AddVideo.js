import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import axios from 'axios'

export default class AddVideo extends Component {
  state = {
    videoUrl: ""
  }

  onVideoCreation = () => {
    axios.post('/api/videos', { videoUrl: this.state.videoUrl })
      .then(response => {
        console.log(response)
        this.props.history.push(`videos/${response.data._id}`) // go to created video 
      })
  }

  onVideoUrlChange = (event) => {
    this.setState({ videoUrl: event.target.value })
  }

  render() {

    return (
      <form className="{classes.container}" noValidate autoComplete="off">
        <div>
          <TextField
            required
            id="standard-required"
            label="Video url"
            className="{classes.textField}"
            margin="normal"
            onChange={this.onVideoUrlChange}
            value={this.state.videoUrl}
          />
          <Button variant="contained" color="primary" className="{classes.button}" onClick={this.onVideoCreation}>
            Submit
      </Button>
        </div>
      </form>
    )
  }
}
