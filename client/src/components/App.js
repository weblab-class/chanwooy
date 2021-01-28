import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";

import "../utilities.css";
import "./App.css";

import { socket } from "../client-socket.js";
import Navigation from "./modules/Navigation.js";
import About from "./pages/About.js";
import Resources from "./pages/Resources.js";
import ContentMenu from "./pages/ContentMenu.js";
import DBWriter from "./pages/DBWriter.js";
import Game from "./pages/Game/Game.js";
import Log from "./pages/Log.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        console.log("user id is : " + user._id);
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    console.log(this.state.userId);
    return (
      <>
        <Navigation 
          handleLogin={this.handleLogin} 
          handleLogout={this.handleLogout} 
          userId={this.state.userId}
        />

        {/* <div className = "App-body">
          hello
        </div> */}

        <div className = "App-body">
          <Router>
            <Skeleton path="/" />
            <About path = "/about/" /> 

            <Resources path = "/resources/" />
            
            <ContentMenu path = "/modules/" userId = {this.state.userId} />

            <Game path = "/game/" userId = {this.state.userId}/>

            <Log path = "/log/" googleId = {this.state.userId}/>
            
            <NotFound default />
          </Router> 
        </div>
      </>
    );
  }
}

export default App;
