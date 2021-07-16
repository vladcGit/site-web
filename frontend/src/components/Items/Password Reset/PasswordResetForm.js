import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Collapse, Snackbar, SnackbarContent } from "@material-ui/core";

//functia care afiseaza copyright in josul paginii
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  snackbarStyleViaContentProps: {
    backgroundColor: "#b71c1c"
  },
}));

export default function PasswordResetForm() {
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
          document.getElementById("email").value
        );
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  // functia responsabila pentru signin
  // seteaza un token in browserul clientului
  function handleButtonClick(_email) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: _email,
      }),
    };

    fetch("/api/password_reset/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
        if (data.status == 'OK') {
          window.location.replace("/reset_successful");
        } else {
          localStorage.clear();
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
          Schimbare parola
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() =>
              handleButtonClick(
                document.getElementById("email").value,
              )
            }
          >
            Trimitere mail
          </Button>
        </form>

        <Collapse in={error}>
          <Snackbar
            open={error}
            autoHideDuration={6000}
            onClose={()=>setError(false)}
            message={errorMessage}
            ContentProps={{
              "aria-describedby": "message-id",
              className: classes.snackbarStyleViaContentProps
            }}
          ></Snackbar>
        </Collapse>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}