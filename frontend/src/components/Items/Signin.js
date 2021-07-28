import React, {useEffect} from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
    Collapse,
    IconButton,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    makeStyles,
    Container,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";


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
}));

export default function SignIn()
{
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
                    document.getElementById("email").value,
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
    function handleButtonClick(_email, _password)
    {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: _email,
                password: _password,
            }),
        };

        fetch("/api/auth/login/", requestOptions)
            .then((response) => response.json())
            .then((data) =>
            {
                if (data.key)
                {
                    localStorage.clear();
                    localStorage.setItem("token", data.key);
                    window.location.replace("");
                } else
                {
                    localStorage.clear();
                    setError(true);
                    const firstKey = Object.keys(data)[0];
                    const message = data[firstKey];
                    setErrorMessage(firstKey + ": " + message);
                }
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Autentificare
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adresa de Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
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
                                document.getElementById("email").value,
                                document.getElementById("password").value
                            )
                        }
                    >
                        Autentificare
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/reset_password" variant="body2">
                                Am uitat parola
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Nu ai cont? Inregistreaza-te"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>

                <Collapse in={error} style={{marginTop: "20px"}}>
                    <Alert
                        severity="error"
                        variant="filled"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() =>
                                {
                                    setError(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }
                    >
                        {errorMessage}
                    </Alert>
                </Collapse>
            </div>
            <Box mt={8}>
            </Box>
        </Container>
    );
}
