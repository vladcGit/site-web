import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import AboutPage from "./Items/about-us";
import Cancel from "./Items/Cancel";
import Courses from "./Items/Courses and Lessons/Courses";
import Dashboard from "./Items/Dashboard";
import Footer from "./Items/Footer";
import HomePage from "./Items/HomePage";
import Lesson from "./Items/Courses and Lessons/Lesson";
import Lessons from "./Items/Courses and Lessons/Lessons";
import MenuAppBar from "./Items/MenuAppBar";
import NewPasswordForm from "./Items/Auth components/NewPasswordForm";
import PaginaDezabonare from "./Items/PaginaDezabonare";
import PasswordResetForm from "./Items/Auth components/PasswordResetForm";
import Pricing from "./Items/Pricing";
import ResetPasswordEmailSent from "./Items/Auth components/ResetPasswordEmailSent";
import SignIn from "./Items/Auth components/Signin";
import SignUp from "./Items/Auth components/Signup";
import Termeni from "./Items/Termeni";

export default function App() {
  return (
    <div>
      <div id="gradient">
        <Router>
          <MenuAppBar />
          <Switch>
            <Route exact path="/">
              <HomePage />
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
    </div>
  );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
