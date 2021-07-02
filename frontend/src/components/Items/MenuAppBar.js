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
  MenuButton: {},
  leftSide: {
    marginLeft: "auto",
    flex: 1,
    display: "flex",
  },
  title: {
    flexGrow: 1,
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
      <AppBar position="static"  style={{backgroundColor:"#7F47A6"}}>
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
            <Button onClick={() => handleButtonClick("/courses")}>
              {" "}
              Cursuri{" "}
            </Button>
            <Button onClick={() => handleButtonClick("/signup")}>
              {" "}
              Sign up{" "}
            </Button>
            <Button onClick={() => handleButtonClick("/signin")}>
              {" "}
              Login{" "}
            </Button>
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
