import React from "react";
import { Grid, Button, Typography, Box, Container } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

const HomePageText = (props) => {
  const { history } = props;

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };
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
              component="h1"
              variant="h2"
              color="textPrimary"
              gutterBottom
            >
              Ca meditatiile dar mai bine si mai ieftin
            </WhiteTextTypography>
            <WhiteTextTypography
              variant="h5"
              color="textSecondary"
              component="p"
              gutterBottom
              paragraph
            >
              Suntem un grup de studenti care vor sa revolutioneze modul in care
              inveti.
            </WhiteTextTypography>
            <WhiteTextTypography
              variant="h5"
              color="textSecondary"
              component="p"
              gutterBottom
              paragraph
            >
              Cu noi invatatul nu este un chin.
            </WhiteTextTypography>
          </Container>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={() => handleButtonClick("/pricing")}
          >
            Oferta noastra
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default withRouter(HomePageText);
