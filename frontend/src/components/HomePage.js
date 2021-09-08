import React, { Component } from "react";
import MenuAppBar from "./Items/MenuAppBar";
import AboutPage from "./Items/about-us";
import SignIn from "./Items/Auth components/Signin";
import SignUp from "./Items/Auth components/Signup";
import Pricing from "./Items/Pricing";
import Footer from "./Items/Footer";
import Dashboard from "./Items/Dashboard";
import HomePageText from "./Items/HomePageText";
import HomePageCarduri from "./Items/HomePageCarduri";
import Courses from "./Items/Courses and Lessons/Courses";
import Lesson from "./Items/Courses and Lessons/Lesson";
import Lessons from "./Items/Courses and Lessons/Lessons";
import PasswordResetForm from "./Items/Auth components/PasswordResetForm";
import NewPasswordForm from "./Items/Auth components/NewPasswordForm";
import ResetPasswordEmailSent from "./Items/Auth components/ResetPasswordEmailSent";
import PaginaDezabonare from "./Items/PaginaDezabonare";
import Termeni from "./Items/Termeni";
import HomePage2 from "./Items/HomePage2";

import {
  BrowserRouter as Router,
  Switch,
  Route,
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
      <div id="gradient">
        <Router>
          {window.innerWidth <= 768 ? <AppBar_telefon /> : <MenuAppBar />}
          <Switch>
            <Route exact path="/">
              <HomePage2 />
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
            <Route exact path="/reset_password">
              <PasswordResetForm />
            </Route>
            <Route
              exact
              path="/new_password/:token"
              component={NewPasswordForm}
            />
            <Route exact path="/reset_successful">
              <ResetPasswordEmailSent />
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
            <Route exact path="/unsubscribe">
              {localStorage.getItem("token") === null ? (
                <Redirect to="signin" />
              ) : (
                <PaginaDezabonare />
              )}
            </Route>
            <Route exact path="/terms">
              <Termeni />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}
