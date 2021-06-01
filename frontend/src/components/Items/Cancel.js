import React from "react";
import { Typography, Grid } from "@material-ui/core/";

export default function Cancel() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "50vh" }}
    >
      <Typography component="h1" variant="h1">
        Ceva nu a functionat la efectuarea platii :(
      </Typography>
    </Grid>
  );
}
