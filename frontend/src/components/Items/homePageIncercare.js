import React from "react";
import StarIcon from "@material-ui/icons/StarBorder";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CssBaseline,
  Grid,
  Typography,
  Container,
  withStyles
} from "@material-ui/core";

import { WhiteTextTypography } from "./Util";

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
    title: "Incepator",
    price: "0",
    description: [
      "Free trial de 7 zile anulabil oricand;",
      "Dupa 7 zile se activeaza abonamentul de tip \"Student\".",
    ],
    buttonText: "Incearca gratuit",
    buttonVariant: "contained",
    unitateTemporara:"",
    stripePriceId:"price_1JCVfHG3BrIJ6aWBgtvhhEFn",
  },
  {
    title: "Entuziast",
    price: "999",
    description: [
      "Potrivit pentru studentii cei mai silitori;",
      "Acces nelimitat la toate cursurile;",
      "Abilitatea de a trimite oricate intrebari;",
      "Cea mai buna valoare pentru banii tai."
    ],
    buttonText: "Incepe sa inveti pe bune",
    buttonVariant: "contained",
    unitateTemporara:"/an",
    stripePriceId:"price_1JCVdoG3BrIJ6aWBgCVaC51t",
  },
  {
    title: "Student (cel mai popular)",
    //subheader: "Cel mai popular",
    price: "100",
    description: [
      "Potrivit pentru majoritatea studentilor;",
      "Acces nelimitat la toate cursurile;",
      "Un mare pas in directia invatarii."
    ],
    buttonText: "Incepe calatoria",
    buttonVariant: "contained",
    unitateTemporara:"/luna",
    stripePriceId:"price_1IxFu2G3BrIJ6aWBH5Bch0wk",
  },
  
];

export default function homePageIncercare() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline /> {/* Hero unit */}{" "}
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <WhiteTextTypography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Preturile noastre{" "}
        </WhiteTextTypography>{" "}
        <WhiteTextTypography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          Ofertele noastre de invatare.
        </WhiteTextTypography>{" "}
        <WhiteTextTypography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          Daca nu mai esti multumit poti anula abonamentul oricand.
          
        </WhiteTextTypography>{" "}
        <WhiteTextTypography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          Procesam platile prin intermediul Stripe, cel mai mare serviciu de plati online din lume;
          in traducere libera, cardul tau e in siguranta.
        </WhiteTextTypography>{" "}
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
              sm={tier.title === "Entuziast" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{
                    align: "center",
                  }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  action={tier.title === "Entuziast" ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />{" "}
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      {tier.price}{" "} Lei
                    </Typography>{" "}
                    <Typography variant="h6" color="textSecondary">
                      {tier.unitateTemporara}{" "}
                    </Typography>{" "}
                  </div>{" "}
                  <ul>
                    {" "}
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {" "}
                        {line}{" "}
                      </Typography>
                    ))}{" "}
                  </ul>{" "}
                </CardContent>{" "}
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    color="primary"
                    onClick={() => {console.log('clicked')}}
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
