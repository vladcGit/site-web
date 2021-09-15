import React from "react";
import { withRouter } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  makeStyles,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
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
  MenuButton: {
    //borderRadius: 30,
    //backgroundColor: colors.galbenInchis,
    marginRight: theme.spacing(2),
  },
  logo: {
    //marginLeft: theme.spacing(13),
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
}));

const MenuAppBar = (props) => {
  const { history } = props;
  const classes = useStyles();

  // functia pentru redirect pe ce pagina vreau
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
    //handleClose();
    setDrawer(false);
  };

  const [drawer, setDrawer] = React.useState(false);
  const [open, setOpen] = React.useState(
    localStorage.getItem("acceptCookies") === null
  );
  const toggleDrawer = (isOpen) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;
    setDrawer(isOpen);
  };

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
                Ok
              </Button>
            }
          >
            Folosim module de tip cookie pentru a ne oferi serviciile. Prin
            apasarea butonului esti de acord cu{" "}
            <a href="/terms">termenii si conditiile noastre</a>.
          </Alert>
        </Collapse>
      </div>
      <AppBar
        position="static"
        style={{ background: "transparent", boxShadow: "none" }}
        elevation={0}
      >
        <Toolbar>
          <IconButton onClick={toggleDrawer(true)} style={{ color: "#FFFFFF" }}>
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
            className={classes.logo}
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
    </div>
  );
};

export default withRouter(MenuAppBar);

/*
<StyledMenu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleButtonClick("/courses")}>
                            Cursuri
                        </MenuItem>
                        <MenuItem onClick={() => handleButtonClick("/pricing")}>
                            Preturi
                        </MenuItem>
                        <MenuItem onClick={() => handleButtonClick("/signup")}>
                            Sign up
                        </MenuItem>
                        <MenuItem onClick={() => handleButtonClick("/myaccount")}>
                            Contul meu
                        </MenuItem>
                    </StyledMenu>
*/

/*
<IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            variant="contained"
            className={classes.MenuButton}
            style={{ color: colors.alb }}
          >
            <MenuIcon />
          </IconButton>
*/
