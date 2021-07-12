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
function handleButtonClick() {
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
  // si tipul de abonat
  const [userEmail, setUserEmail] = useState("");
  const [userSubscription, setUserSubscription] = useState("");

  // verifica daca un user e logat
  // si retine email-ul sau

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.replace("");
    } else {
      //get user email
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

      //get subscription status
      fetch("/subscribe/get_subscription_details/")
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if(data.hasOwnProperty('Error')) setUserSubscription("Cont gratis")
          else setUserSubscription(data.subscription);
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
        <WhiteTextTypography variant="h4" component="h4">
          {userSubscription === "active"? "Abonament activ" : "Cont gratuit"}
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
