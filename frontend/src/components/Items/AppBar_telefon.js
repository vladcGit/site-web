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
  Menu,
  MenuItem,
  withStyles,
} from "@material-ui/core";

const culoareGalbena = "#edb90e";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  MenuButton: {
    //borderRadius: 30,
    backgroundColor: culoareGalbena,
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

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    backgroundColor: culoareGalbena,
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const MenuAppBar = (props) => {
  const { history } = props;
  const classes = useStyles();

  // functia pentru redirect pe ce pagina vreau
  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
    handleClose();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              className={classes.MenuButton}
            >
              Meniu
            </Button>
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
              <MenuItem onClick={() => handleButtonClick("/signin")}>
                Login
              </MenuItem>
              <MenuItem onClick={() => handleButtonClick("/signup")}>
                Sign up
              </MenuItem>
              <MenuItem onClick={() => handleButtonClick("/myaccount")}>
                Contul meu
              </MenuItem>
            </StyledMenu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(MenuAppBar);
