import React, { Component } from "react";
import MenuAppBar from "./Items/MenuAppBar";
import SignIn from "./Items/Signin";
import SignUp from "./Items/Signup";
import Pricing from "./Items/Pricing";
import Footer from "./Items/Footer";
import Dashboard from "./Items/Dashboard";
import HomePageText from "./Items/HomePageText";
import { Grid, Button, ButtonGroup, Typography, Box } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Router>
          <MenuAppBar />

          <Switch>
            <Route exact path="/">
              <HomePageText />
            </Route>
            <Route exact path="/signup">
              {localStorage.getItem("token") !== null ? (
                <Redirect to="/myaccount" />
              ) : (
                <SignUp />
              )}
            </Route>
            <Route exact path="/signin">
              {localStorage.getItem("token") !== null ? (
                <Redirect to="/myaccount" />
              ) : (
                <SignIn />
              )}
            </Route>
            <Route exact path="/pricing">
              <Pricing />
            </Route>
            <Route exact path="/myaccount">
              {localStorage.getItem("token") === null ? (
                <Redirect to="/signin" />
              ) : (
                <Dashboard />
              )}
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}
