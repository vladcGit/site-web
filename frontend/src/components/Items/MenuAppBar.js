import React from "react";
import AccountBox from "@material-ui/icons/AccountBox";
import { withRouter } from "react-router-dom";
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
import CloseIcon from '@material-ui/icons/Close';
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
}));

const MenuAppBar = (props) => {
  const { history } = props;
  const classes = useStyles();

  // functia pentru redirect pe ce pagina vreau
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  const [onFocus, setOnFocus] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const onMouseAction = () => {
    setOnFocus(!onFocus);
  };

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
            Folosim module de tip cookie pentru a ne oferi serviciile. Prin navigarea pe site esti de acord cu {" "}
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
          <div className={classes.leftSide}>
            <Button
              variant="contained"
              size="large"
              onClick={() => handleButtonClick("/")}
              onMouseOver={onMouseAction}
              onMouseOut={onMouseAction}
              color={onFocus ? "primary" : "default"}
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

          <ButtonGroup color="primary" className={classes.buttonGroup}>
            <StyledButton to="/pricing" className={classes.MenuButton}>
              Preturi
            </StyledButton>
            <StyledButton to="/courses" className={classes.MenuButton}>
              Cursuri
            </StyledButton>
            <StyledButton to="/signup" className={classes.MenuButton}>
              Sign up
            </StyledButton>
            <StyledButton to="/signin" className={classes.MenuButton}>
              Login
            </StyledButton>
            <IconButton
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
