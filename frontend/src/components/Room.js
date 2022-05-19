import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state={
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
        showSettings: false,
        spotifyAuthenticated: false,
        song: {}
    }
    this.roomCode = this.props.match.params.roomCode
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this)
    this.updateShowSettings = this.updateShowSettings.bind(this)
    this.renderSettingsButton = this.renderSettingsButton.bind(this)
    this.renderSettings = this.renderSettings.bind(this)
    this.getRoomDetails = this.getRoomDetails.bind(this)
    this.authenticateSpotify = this.authenticateSpotify.bind(this)
    this.getRoomDetails();
    this.getCurrentSong();
  }

  getRoomDetails(){
      fetch('/api/get-room' + '?code=' + this.roomCode)
      .then(response => {
        if(!response.ok){
          this.props.leaveRoomCallback();
          this.props.history.push('/')
        }
        return response.json()})
      .then((data) => {
          this.setState({
              votesToSkip : data.votes_to_skip,
              guestCanPause : data.guest_can_pause,
              isHost : data.is_host
          })
          if(this.state.isHost){
            this.authenticateSpotify()
          }
      })
  }

  getCurrentSong(){
    fetch('/spotify/current-song').then((response) => {
      if(!response.ok){
        return {};
      }else{
        return response.json(); 
      }
    }).then((data) => {
      this.setState({song: data})
      console.log(data)
    })
  }

  leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      this.props.leaveRoomCallback();
      this.props.history.push("/");
    });
  }

  updateShowSettings(value){
    this.setState({
      showSettings : value
    })
  }

  renderSettingsButton(){
    return (
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={() => this.updateShowSettings(true) }>
          Settings
        </Button>
      </Grid>
    );
  }

  renderSettings(){
    return <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <CreateRoomPage update={true} 
        votesToSkip={this.state.votesToSkip}
        guestCanPause={this.state.guestCanPause}
        roomCode={this.roomCode}
        updateCallback={this.getRoomDetails}/>
      </Grid>
      <Grid item xs={12} align="center">
        <Button 
        variant="contained"
        color="secondary"
        onClick={() => {
          this.updateShowSettings(false)
        }}>Close</Button>
      </Grid>
    </Grid>
  }

  authenticateSpotify(){
    fetch('/spotify/is-authenticated')
    .then(response => response.json())
    .then((data) => {
      this.setState({
        spotifyAuthenticated: data.status
      })
      if(!data.status){
        fetch('/spotify/get-auth-url')
        .then(response => response.json())
        .then((data) => {
          window.location.replace(data.url)
        })
      }
    })
  }

  render() {
    if(this.state.showSettings){
      return this.renderSettings()
    }
    return <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <h1>Code : {this.roomCode}</h1>
      </Grid>  
      {/* {this.state.song} */}
      {this.state.isHost ? this.renderSettingsButton() : null}
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={this.leaveButtonPressed}>
          Leave Room
        </Button>
      </Grid>
    </Grid>
    // <div>
    //         <h2>{this.roomCode}</h2>
    //         <p>Votes : {this.state.votesToSkip}</p>
    //         <p>Guest can Pause : {this.state.guestCanPause.toString()}</p>
    //         <p>Host : {this.state.isHost.toString()}</p>
    //     </div>
  }
}
