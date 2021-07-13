import React from "react";
import {Link} from "react-router-dom";
import { Button, Typography, Grid, withStyles } from "@material-ui/core/";
import { WhiteTextTypography } from "./Util";

export default function Cancel() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "70vh" }}
    >
      <WhiteTextTypography component="h1" variant="h2">
        Ceva nu a functionat la efectuarea platii :(
      </WhiteTextTypography>
      <Button variant="contained" color="primary" component={Link} to={"/"}>
        Spre pagina de pornire
      </Button>
    </Grid>
  );
}
