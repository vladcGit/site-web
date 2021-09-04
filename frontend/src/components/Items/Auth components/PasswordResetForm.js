import React, { useEffect } from "react";
import {
  Collapse,
  IconButton,
  Button,
  TextField,
  Link,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import ContainerAutentificare from "./ContainerAutentificare";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
        handleButtonClick(document.getElementById("email").value);
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
        if (data.status == "OK") {
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
    <ContainerAutentificare>
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
          color="secondary"
          className={classes.submit}
          onClick={() =>
            handleButtonClick(document.getElementById("email").value)
          }
        >
          Trimitere mail
        </Button>
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
    </ContainerAutentificare>
  );
}
