import React from "react";
import AccountBox from "@material-ui/icons/AccountBox";
import { Link, withRouter } from "react-router-dom";
import {
  AppBar,
  ButtonGroup,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  makeStyles,
  Collapse,
} from "@material-ui/core";
import { colors, StyledButton } from "./Util";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
  },
  MenuButton: {
    //borderRadius: 30,
    //backgroundColor: colors.galbenInchis,
    marginRight: "10px",
  },
  leftSide: {
    marginLeft: "auto",
    flex: 1,
    display: "flex",
  },
  logo: {
    marginLeft: theme.spacing(5),
  },
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  flexbox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
}));

const MenuAppBar = (props) => {
  const { history } = props;
  const classes = useStyles();

  // functia pentru redirect pe ce pagina vreau
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  const [open, setOpen] = React.useState(true);

  const isLoggedIn = localStorage.getItem("token") !== null;

  return (
    <div className={classes.root}>
      <div className={classes.alert}>
        <Collapse in={open}>
          <Alert
            severity="info"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Folosim module de tip cookie pentru a ne oferi serviciile. Prin
            navigarea pe site esti de acord cu{" "}
            <a href="/terms">termenii si conditiile noastre</a>.
          </Alert>
        </Collapse>
      </div>
      <AppBar position="static" color="transparent" elevation={5}>
        <Toolbar>
          <div className={classes.flexbox}>
            <div style={{ display: "flex" }}>
              <StyledButton size="large" onClick={() => handleButtonClick("/")}>
                Icar Academy
              </StyledButton>
              <Avatar
                className={classes.logo}
                alt="Logo prima pagina"
                src="/static/images/logo.jpeg"
                style={{ border: "3px solid lightseagreen" }}
              />
            </div>
            <div>
              <StyledButton
                onClick={() => handleButtonClick("/pricing")}
                className={classes.MenuButton}
              >
                Preturi
              </StyledButton>
              <StyledButton
                onClick={() => handleButtonClick("/courses")}
                className={classes.MenuButton}
              >
                Cursuri
              </StyledButton>

              <StyledButton
                onClick={() => handleButtonClick("/signup")}
                className={classes.MenuButton}
                style={{
                  display: isLoggedIn ? "none" : "inline",
                }}
              >
                Sign up
              </StyledButton>
              <StyledButton
                onClick={() => handleButtonClick("/signin")}
                className={classes.MenuButton}
                style={{
                  display: isLoggedIn ? "none" : "inline",
                }}
              >
                Login
              </StyledButton>
              <StyledButton
                //color="secondary"
                onClick={() => handleButtonClick("/myaccount")}
                style={{
                  display: isLoggedIn ? "inline" : "none",
                }}
              >
                Contul meu
              </StyledButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(MenuAppBar);
