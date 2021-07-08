import React from "react";
import AccountBox from "@material-ui/icons/AccountBox";
import { withRouter } from "react-router-dom";
import {
  AppBar,
  ButtonGroup,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  MenuButton: {
    //borderRadius: 30,
    backgroundColor: "#edb90e",
  },
  leftSide: {
    marginLeft: "auto",
    flex: 1,
    display: "flex",
  },
  logo: {
    marginLeft: theme.spacing(5),
  },
}));

const MenuAppBar = (props) => {
  const { history } = props;
  const classes = useStyles();

  // functia pentru redirect pe ce pagina vreau
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#7F47A6" }}>
        <Toolbar>
          <div className={classes.leftSide}>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleButtonClick("/")}
            >
              Icar Academy
            </Button>
            <Avatar
              className={classes.logo}
              alt="Logo prima pagina"
              src="/static/images/logo.jpeg"
              style={{ border: "3px solid lightseagreen" }}
            />
          </div>

          <ButtonGroup variant="contained" color="secondary">
            <Button
              onClick={() => handleButtonClick("/courses")}
              className={classes.MenuButton}
            >
              {" "}
              Cursuri{" "}
            </Button>
            <Button
              onClick={() => handleButtonClick("/signup")}
              className={classes.MenuButton}
            >
              {" "}
              Sign up{" "}
            </Button>
            <Button
              onClick={() => handleButtonClick("/signin")}
              className={classes.MenuButton}
            >
              {" "}
              Login{" "}
            </Button>
            <IconButton
            variant="contained"
            //color="secondary"
            onClick={() => handleButtonClick("/myaccount")}
            className={classes.MenuButton}
          >
            <AccountBox />
          </IconButton>
          </ButtonGroup>

          
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(MenuAppBar);
