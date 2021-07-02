import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CssBaseline,
  Grid,
  Typography,
  makeStyles,
  Container,
  Box,
  PaperProps,
  withStyles,
} from "@material-ui/core";


const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: "Icar Academy",
    subtitle: "Ca meditatiile, dar mai bine si mai ieftin",
    description: [
      "Promitem rezultate rapide",
      "Cu noi invatatul nu va fi un chin",
      "Metode verificate de invatare si aprofundare",
      "Apropiere de studenti (si noi suntem studenti)",
      "Si nu in ultimul rand, te vei distra invatand",
    ],
    buttonText: "Afla mai multe despre noi",
    buttonVariant: "contained",
  },
];

export default function HomePageCarduri() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline /> {/* Hero unit */}{" "}
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <WhiteTextTypography
          component="h1"
          variant="h1"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          <Box fontWeight="fontWeightBold" m={1}>
            Icar Academy{" "}
          </Box>
        </WhiteTextTypography>{" "}
        <WhiteTextTypography
          variant="h4"
          align="center"
          color="textPrimary"
          component="p"
        >
          Ca meditatiile, dar mai bine si mai ieftin!{" "}
        </WhiteTextTypography>{" "}
      </Container>{" "}
      {/* End hero unit */}{" "}
      <Container maxWidth="lg" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {" "}
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} md={12}>
              <Card>
                <CardHeader
                  //title={tier.title}
                  //subheader={tier.subheader}
                  titleTypographyProps={{
                    align: "center",
                  }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  className={classes.cardHeader}
                />{" "}
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography
                      component="h2"
                      variant="h2"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box fontWeight="fontWeightRegular" m={1} align="center" >
                        Aducem eficienta, cooperarea 
                        {" "}
                      </Box>
                      <Box fontWeight="fontWeightRegular" m={1} align="center" >
                        si simplitatea in educatie
                        {" "}
                      </Box>
                    </Typography>{" "}
                  </div>{" "}
                  <ul>
                    {" "}
                    {tier.description.map((line) => (
                      <Typography
                        component="h3"
                        variant="h4"
                        align="center"
                        gutterBottom
                        key={line}
                      >
                        {" "}
                        {line}{" "}
                      </Typography>
                    ))}{" "}
                  </ul>{" "}
                </CardContent>{" "}
                <CardActions style={{ justifyContent: "center" }}>
                  <Button
                    //fullWidth
                    variant={tier.buttonVariant}
                    color="primary"
                    component={Link}
                    to="/about-us"
                  >
                    {" "}
                    {tier.buttonText}{" "}
                  </Button>{" "}
                </CardActions>{" "}
              </Card>{" "}
            </Grid>
          ))}{" "}
        </Grid>{" "}
      </Container>{" "}
    </React.Fragment>
  );
}
