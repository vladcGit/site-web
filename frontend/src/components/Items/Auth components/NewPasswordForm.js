import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Collapse,
  IconButton,
  makeStyles,
  Typography,
  TextField,
  Button,
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

export default function NewPasswordForm() {
  let { token } = useParams();
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
        handleButtonClick(token, document.getElementById("password").value);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  // functia responsabila pentru signin
  // seteaza un token in browserul clientului
  async function handleButtonClick(token, _password) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: _password,
        token: token,
      }),
    };

    const response = await fetch(
      "/api/password_reset/confirm/",
      requestOptions
    );
    const data = await response.json();
    if (data.status == "OK") window.location.replace("/signin");
    else {
      localStorage.clear();
      setError(true);
      var firstKey = Object.keys(data)[0];
      var message = data[firstKey];
      setErrorMessage(firstKey + ": " + message);
    }
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
            handleButtonClick(token, document.getElementById("password").value)
          }
        >
          Schimbare parola
        </Button>
      </form>
      <Collapse in={error}>
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
