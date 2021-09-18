import React from "react";
import { Grid, Button, makeStyles } from "@material-ui/core";
import { WhiteTextTypography } from "./Util";

const lines = [
  "Ne pare rau sa te vedem plecand!",
  "Suntem constienti ca suntem la inceput si ca probabil",
  "facem multe greseli; cu ocazia asta ne cerem scuze ",
  "pentru orice neplacere produsa.",
  "Am aprecia enorm daca ai gasi timpul sa ne comunici ",
  "pe mail problemele pe care le-ai gasit,",
  "in ideea ca putem invata din ele si imbunatati site-ul.",
];

async function handleCancelButton() {
  const response = await fetch("/subscribe/cancel-subscription/");
  const data = await response.json();
  console.log(data);
  window.location.href = "/myaccount";
}

const useStyles = makeStyles((theme) => ({
  spacingItem: {
    marginTop: 160,
  },
}));

export default function PaginaDezabonare() {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "60vh" }}
    >
      {lines.map((line) => (
        <WhiteTextTypography component="h3" variant="h4" gutterBottom>
          {line}
        </WhiteTextTypography>
      ))}

      <Button
        className={classes.spacingItem}
        variant="contained"
        color="secondary"
        size="large"
        onClick={handleCancelButton}
      >
        Confirma Dezabonare
      </Button>
    </Grid>
  );
}
