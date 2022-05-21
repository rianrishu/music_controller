import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Info from "./Info"
export default class RoomJoinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomcode : "",
      error : ""
    }
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
    this.roomButtonPressed = this.roomButtonPressed.bind(this)
  }

  render() {
    return <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography vacriant="h4" component="h4">
          <h1>Join a Room</h1>
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField 
        error={this.state.error}
        label="Code"
        placeholder="Enter a Room Code"
        // value={this.state.roomcode}
        helperText={this.state.error}
        vacriant="outlined"
        onChange={this.handleTextFieldChange}/>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={this.roomButtonPressed}>Enter Room</Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
      </Grid>
    </Grid>
  }

  handleTextFieldChange(e){
    this.setState({
      roomcode: e.target.value
    })
  }

  roomButtonPressed(){
    const requestOptions= {
      method: "POST",
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({
        code: this.state.roomcode
      })
    }
    fetch('/api/join-room', requestOptions).then((response) => {
      if(response.ok){
        this.props.history.push(`/room/${this.state.roomcode}`)
      }
      else{
        this.setState({
          error: "Room not Found"
        })
      } 
    })
  }
}



