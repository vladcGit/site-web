import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import MenuIcon from "@material-ui/icons/Menu";
import AccountBox from "@material-ui/icons/AccountBox";
import Icon from "@material-ui/core/Icon";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  MenuButton: {},
  HomeButton: {
    marginLeft: "auto",
    flex: 1
  },
  title: {
    flexGrow: 1
  }
}));

const MenuAppBar = (props) => {
  const { history } = props;
  const classes = useStyles();

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.HomeButton}>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleButtonClick("/")}
            >
              Icar Academy
            </Button>
          </div>

          <ButtonGroup variant="contained" color="secondary">
            <Button onClick={() => handleButtonClick("/signup")}>
              Sign up
            </Button>
            <Button onClick={() => handleButtonClick("/signin")}>Login</Button>
          </ButtonGroup>

          <IconButton
            variant="contained"
            color="secondary"
            onClick={() => handleButtonClick("/myaccount")}
          >
            <AccountBox />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(MenuAppBar);
