import React, { Component } from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-js';
import poop from './poop.svg';
import './App.css';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const accessToken = params.access_token;
    if (accessToken) {
      spotifyApi.setAccessToken(accessToken);
    }
    this.state = {
      loggedIn: accessToken ? true : false,
      value: '',
      token: accessToken,
      currentPlaylist: null,
      playlistName: null,
      playlistOwner: null,
      playlistImage: null,
      playlistUri: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getHashParams() {
      let hashParams = {};
      let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
      e = r.exec(q);
      while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        e = r.exec(q);
      }
      console.log(hashParams);
      return hashParams;
    }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    //random number generator for playlist limit so it's always a different list
    const randomNum = Math.floor(Math.random() * 50);
    const AuthStr = 'Bearer '.concat(this.state.token);
    axios.get(`https://api.spotify.com/v1/search?q=${this.state.value}&type=playlist&limit=${randomNum}`, { headers: { Authorization: AuthStr } }, { responseType: "json" })
      .then(response => {
        const results = response.data.playlists.items;
        // console.log("RESPONSE:", response)
        console.log("RESULTS:", results)
        for (let item in results) {
          let playlistInfo = results[item];
          this.setState({currentPlaylist: results[item].external_urls.spotify, playlistName: playlistInfo.name, playlistOwner: playlistInfo.owner.id, playlistUri: playlistInfo.uri})
          // console.log("FUCKIN URI THIS BITCH:", this.state.playlistUri)
          for (let image in playlistInfo.images)
            this.setState({playlistImage: playlistInfo.images[image].url});
        }
      });
    this.setState({value: ''});
  }

  render() {

    let nowPlaying = null;

    let playlistSite = `https://open.spotify.com/embed?uri=${this.state.playlistUri}`

    let renderedPlaylist = <iframe src={playlistSite} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>

    if (this.state.currentPlaylist) {
      nowPlaying =
        <div>
          <h3>Now playing:</h3>
          <p>Playlist Name: {this.state.playlistName}</p>
          <p>Playlist owner: {this.state.playlistOwner}</p>
          <p><a href={this.state.currentPlaylist}>URL</a></p>
          <img src={this.state.playlistImage} alt={this.state.playlistName} />
          {renderedPlaylist}
        </div>
      }



    return (
      <div className="App">
        <header className="App-header">
          <img src={poop} className="App-logo" alt="logo" />
          <h1 className="App-title">Searching for Shit</h1>
        </header>
        <div>
        <a href='http://localhost:8888'>Login to Spotify</a>
        </div>
        <div>
          <p>Search for a playlist:</p>
          <form onSubmit={this.handleSubmit}>
            <input
              type="search"
              value={this.state.value}
              onChange={this.handleChange} />
            <input
              type="submit"
              value="Create" />
          </form>
          <div>
          {nowPlaying}
          </div>
          <div>
{/*            <iframe src={this.state.currentPlaylist} title="Playlist" width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media" Content-Security-Policy="frame-ancestors 'none'"></iframe>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
