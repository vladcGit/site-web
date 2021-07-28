import React, {useEffect} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {Collapse, Snackbar} from "@material-ui/core";
import {useParams} from "react-router-dom";

//functia care afiseaza copyright in josul paginii
function Copyright()
{
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="/">
                Icar Academy
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    snackbarStyleViaContentProps: {
        backgroundColor: "#b71c1c"
    },
}));

export default function NewPasswordForm()
{
    let {token} = useParams();
    const classes = useStyles();
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(
        "Eroare la autentificare"
    );

    useEffect(() =>
    {
        const listener = (event) =>
        {
            if (event.code === "Enter" || event.code === "NumpadEnter")
            {
                event.preventDefault();
                // callMyFunction();
                handleButtonClick(
                    token,
                    document.getElementById("password").value
                );
            }
        };
        document.addEventListener("keydown", listener);
        return () =>
        {
            document.removeEventListener("keydown", listener);
        };
    }, []);

    // functia responsabila pentru signin
    // seteaza un token in browserul clientului
    function handleButtonClick(token, _password)
    {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: _password,
                token: token
            }),
        };

        fetch("/api/password_reset/confirm/", requestOptions)
            .then((response) => response.json())
            .then((data) =>
            {
                console.log(data);
                if (data.status == 'OK')
                {
                    window.location.replace("/signin");
                } else
                {
                    localStorage.clear();
                    setError(true);
                    var firstKey = Object.keys(data)[0];
                    var message = data[firstKey];
                    setErrorMessage(firstKey + ": " + message);
                }
            });
    }
    //TODO sa scap de snackbar si sa fac ca la signup si login
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Schimbare parola
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Parola"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() =>
                            handleButtonClick(
                                token,
                                document.getElementById("password").value
                            )
                        }
                    >
                        Schimbare parola
                    </Button>
                </form>

                <Collapse in={error}>
                    <Snackbar
                        open={error}
                        autoHideDuration={6000}
                        onClose={() => setError(false)}
                        message={errorMessage}
                        ContentProps={{
                            "aria-describedby": "message-id",
                            className: classes.snackbarStyleViaContentProps
                        }}
                    ></Snackbar>
                </Collapse>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}
