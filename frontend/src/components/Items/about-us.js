import React from "react";
import DreptunghiNegru from "../dreptunghiNegru";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

/*
const AboutPage = () => {
  return (
    <div>
      <DreptunghiNegru text="Ce facem? asdawd a dwad awd wd aw dawd  aw daw t hdt " />
      <DreptunghiNegru text="De ce facem?" />
      <DreptunghiNegru text="Cum facem?" />
    </div>
  );
};
*/

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
    padding: theme.spacing(8, 0, 6),
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
    title: "De ce facem?",
    description: [
      "Pentru ca ne dorim un viitor",
      "mai bun si vrem sa ajutam la",
      "construirea lui",
      ""
    ],
  },
  {
    title: "Ce facem?",
    description: [
      "Oferim invatamant de calitate",
      "la preturi reduse",
      "in mediul online"
    ],
  },
  {
    title: "Cum facem?",
    description: [
      "Cursuri asa cum am fi vrut sa",
      "avem si noi, precum si metode de invatare",
      "sustinute de ultimele studii realizate",
    ],
  },
];

const AboutPage = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline /> {/* Hero unit */}{" "}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Despre noi{" "}
        </Typography>{" "}
        <Typography
          variant="h4"
          align="center"
          color="textSecondary"
          component="p"
        >
          Suntem un grup de studenti care vor sa revolutioneze modul in care
          inveti.{" "}
        </Typography>{" "}
      </Container>{" "}
      {/* End hero unit */}{" "}
      <Container maxWidth="lg" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {" "}
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{
                    align: "center",
                    variant: "h4",
                  }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  className={classes.cardHeader}
                />{" "}
                <CardContent>
                  <ul>
                    {" "}
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="h5"
                        align="center"
                        key={line}
                      >
                        {" "}
                        {line}{" "}
                      </Typography>
                    ))}{" "}
                  </ul>{" "}
                </CardContent>{" "}
              </Card>{" "}
            </Grid>
          ))}{" "}
        </Grid>{" "}
      </Container>{" "}
    </React.Fragment>
  );
};

export default AboutPage;
