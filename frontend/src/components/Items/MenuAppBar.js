import React from "react";
import { withRouter } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
  Toolbar,
} from "@material-ui/core";
import { StyledButton } from "./Util";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import Alert from "@material-ui/lab/Alert";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SchoolIcon from "@material-ui/icons/School";
import HomeIcon from "@material-ui/icons/Home";
import { colors } from "./Util";

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
  logoPhone: {
    flexGrow: 1,
  },
  sizeLogo: {
    height: "50px",
    width: "50px",
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
    setDrawer(false);
  };

  const [drawer, setDrawer] = React.useState(false);
  const [open, setOpen] = React.useState(
    localStorage.getItem("acceptCookies") === null
  );

  const isLoggedIn = localStorage.getItem("token") !== null;
  const isPhone = window.innerWidth <= 768;

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;
    setDrawer(isOpen);
  };

  function componentPc() {
    return (
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
    );
  }

  function componentTelefon() {
    return (
      <AppBar
        position="static"
        style={{ background: "transparent", boxShadow: "none" }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            onClick={toggleDrawer(true)}
            style={{ color: colors.alb }}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            open={drawer}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <List>
              <ListItem button onClick={() => handleButtonClick("/")}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Pagina principala"} />
              </ListItem>
              <ListItem button onClick={() => handleButtonClick("/courses")}>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary={"Cursuri"} />
              </ListItem>
              <ListItem button onClick={() => handleButtonClick("/pricing")}>
                <ListItemIcon>
                  <CreditCardIcon />
                </ListItemIcon>
                <ListItemText primary={"Preturi"} />
              </ListItem>
              <ListItem button onClick={() => handleButtonClick("/signup")}>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary={"Signup"} />
              </ListItem>
              <ListItem button onClick={() => handleButtonClick("/myaccount")}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={"Contul meu"} />
              </ListItem>
            </List>
          </SwipeableDrawer>
          <IconButton
            className={classes.logoPhone}
            onClick={() => handleButtonClick("/")}
          >
            <Avatar
              className={classes.sizeLogo}
              alt="Logo prima pagina"
              src="/static/images/logo.jpeg"
              style={{ border: "3px solid lightseagreen" }}
            />
          </IconButton>

          <Button
            style={{ color: colors.alb }}
            variant="text"
            onClick={() => handleButtonClick("/signin")}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.alert}>
        <Collapse in={open}>
          <Alert
            severity="info"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                  localStorage.setItem("acceptCookies", true);
                }}
              >
                {/* <CloseIcon fontSize="inherit" /> */}
                Accepta
              </Button>
            }
          >
            Folosim module de tip cookie pentru a ne oferi serviciile. Prin
            apasarea butonului esti de acord cu{" "}
            <a href="/terms">termenii si conditiile noastre</a>.
          </Alert>
        </Collapse>
      </div>
      {isPhone ? componentTelefon() : componentPc()}
    </div>
  );
};

export default withRouter(MenuAppBar);
