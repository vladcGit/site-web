import React, { useEffect } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Collapse,
  Snackbar,
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

function Copyright() {
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paperContainer: {
    backgroundImage: `url(${"static/images/biblioteca.jpg"})`,
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(
    "Eroare la autentificare"
  );

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        // callMyFunction();
        handleButtonClick(
          document.getElementById("email").value,
          document.getElementById("password").value,
          document.getElementById("firstName").value,
          document.getElementById("lastName").value
        );
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  // functia responsabila pentru signup
  // seteaza un token in browserul clientului
  function handleButtonClick(_email, _password, _first_name, _last_name) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: _email,
        password1: _password,
        password2: _password,
        first_name: _first_name,
        last_name: _last_name,
      }),
    };

    fetch("/api/auth/register/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();
        if (data.detail && data.detail === "Verification e-mail sent.") {
          window.location.replace("/reset_successful");
        } else {
          setError(true);
          var firstKey = Object.keys(data)[0];
          var message = data[firstKey];
          setErrorMessage(firstKey + ": " + message);
        }
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inregistrare
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Prenume"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Nume"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Adresa de Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Parola"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() =>
              handleButtonClick(
                document.getElementById("email").value,
                document.getElementById("password").value,
                document.getElementById("firstName").value,
                document.getElementById("lastName").value
              )
            }
          >
            Inregistrare
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Deja ai cont? Spre pagina de autentificare
              </Link>
            </Grid>
          </Grid>
        </form>
        <Collapse in={error} style={{ marginTop: "20px" }}>
          <Alert
            severity="error"
            variant="filled"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setError(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {errorMessage}
          </Alert>
        </Collapse>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
