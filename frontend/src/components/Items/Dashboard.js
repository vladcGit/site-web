import React, { useState, useEffect, Fragment } from "react";
import { Button, Grid, Typography } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";


const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);


// handler buton de logout
// doar da logout, nu face nimic altceva
function handleButtonClick() 
{
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  };

  fetch("/api/auth/logout/", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      localStorage.clear();
      window.location.replace("");
    });
}


const Dashboard = () => {
  // variabila care retine numele utilizatorului conectat
  const [userEmail, setUserEmail] = useState("");

  // verifica daca un user e logat
  // si retine email-ul sau
  
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.replace("");
    } else {
      fetch("/api/auth/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserEmail(data.email);
        });
    }
  }, []);

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "50vh" }}
    >
      <Grid item xs={12} align="center">
        <WhiteTextTypography variant="h4" component="h4">
          Salut, {userEmail}!
        </WhiteTextTypography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButtonClick()}
        >
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
