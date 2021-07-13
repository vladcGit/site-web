import React, { Component } from "react";
import MenuAppBar from "./Items/MenuAppBar";
import AboutPage from "./Items/about-us";
import SignIn from "./Items/Signin";
import SignUp from "./Items/Signup";
import Pricing from "./Items/Pricing";
import Footer from "./Items/Footer";
import Dashboard from "./Items/Dashboard";
import HomePageText from "./Items/HomePageText";
import HomePageCarduri from "./Items/HomePageCarduri";
import Courses from "./Items/Courses";
import Lesson from "./Items/Lesson";
import Lessons from "./Items/Lessons";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Cancel from "./Items/Cancel";
import AppBar_telefon from "./Items/AppBar_telefon";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  // aici se face redirect in principal si
  // se verifica daca utilizatorul e conectat pentru anumite actiuni
  render() {
    return (
      <div>
        <Router>
          {window.innerWidth <= 768 ? <AppBar_telefon /> : <MenuAppBar />}
          <Switch>
            <Route exact path="/">
              <HomePageCarduri />
            </Route>
            <Route exact path="/about-us">
              <AboutPage />
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
              {localStorage.getItem("token") === null ? (
                <Redirect to="/signin" />
              ) : (
                <Pricing />
              )}
            </Route>
            <Route exact path="/myaccount">
              {localStorage.getItem("token") === null ? (
                <Redirect to="/signin" />
              ) : (
                <Dashboard />
              )}
            </Route>
            <Route exact path="/cancel">
              <Cancel />
            </Route>
            <Route exact path="/courses">
              <Courses />
            </Route>
            <Route
              exact
              path="/courses/:course_name/:lesson_title"
              component={Lesson}
            >
              {localStorage.getItem("token") === null ? (
                <Redirect to="/signin" />
              ) : null}
            </Route>

            <Route exact path="/courses/:course_name" component={Lessons} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}
