import React, { Component } from "react";
import { Typography, Grid, Box, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { WhiteTextTypography } from "./Util";

export default class DreptunghiNegru extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "50vh" }}
      >
        <Grid item xs={12} align="center">
          <Box bgcolor="text.secondary" align="center">
            <Container maxWidth="sm">
              <WhiteTextTypography
                display="inline"
                component="h1"
                variant="h2"
                color="textPrimary"
                gutterBottom
              >
                {this.props.text}
              </WhiteTextTypography>
            </Container>
          </Box>
        </Grid>
      </Grid>
    );
  }
}
