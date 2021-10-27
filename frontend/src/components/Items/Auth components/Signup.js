import React, { useEffect } from "react";
import {
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ContainerAutentificare from "./ContainerAutentificare";
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
  async function handleButtonClick(_email, _password, _first_name, _last_name) {
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

    const response = await fetch("/api/auth/register/", requestOptions);
    const data = await response.json();
    //console.log(data);
    if (data.key) {
      window.location.href = "/signin";
      return;
    }
    if (data.detail && data.detail === "Verification e-mail sent.") {
      window.location.href = "/reset_successful";
    } else {
      setError(true);
      const firstKey = Object.keys(data)[0];
      const message = data[firstKey];
      setErrorMessage(firstKey + ": " + message);
    }
  }

  return (
    <ContainerAutentificare
      error={error}
      errorMessage={errorMessage}
      onCloseError={setError}
    >
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
          color="secondary"
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
    </ContainerAutentificare>
  );
}
