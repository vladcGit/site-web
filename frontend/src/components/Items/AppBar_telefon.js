import React from "react";
import {withRouter} from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Avatar,
    makeStyles,
    Menu,
    MenuItem,
    withStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {colors} from "./Util";

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
    sizeLogo:
        {
            height: '50px',
            width: '50px',
        },
}));

const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5",
        //backgroundColor: colors.galbenInchis,
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

const MenuAppBar = (props) =>
{
    const {history} = props;
    const classes = useStyles();

    // functia pentru redirect pe ce pagina vreau
    const handleButtonClick = (pageURL) =>
    {
        history.push(pageURL);
        handleClose();
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) =>
    {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () =>
    {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="static"
                style={{background: "transparent", boxShadow: "none"}}
                elevation={0}
            >
                <Toolbar>
                    <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        variant="contained"
                        className={classes.MenuButton}
                        style={{color: colors.alb}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <IconButton className={classes.logo} onClick={() => handleButtonClick("/")}>
                        <Avatar
                            className={classes.sizeLogo}
                            alt="Logo prima pagina"
                            src="/static/images/logo.jpeg"
                            style={{border: "3px solid lightseagreen"}}
                        />
                    </IconButton>

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
                    <Button
                        style={{color: colors.alb}}
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
