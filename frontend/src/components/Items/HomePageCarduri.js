import React from "react";
import {
  CssBaseline,
  Grid,
  makeStyles,
  Container,
  Box,
} from "@material-ui/core";

import { WhiteTextTypography } from "./Util";
import CardWithButton from "./CardWithButton";


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
    padding: theme.spacing(3, 0, 5),
  },
  distantat: {
    padding: theme.spacing(20, 0, 0),
  },
  cardHeader: {
    /*
        backgroundColor:
          theme.palette.type === "light"
            ? theme.palette.primary
            : theme.palette.primary,
            */
    //backgroundImage: "linear-gradient(45deg, #34435e 5%, #6369d1 90%)",
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
  spacingItem: {
    padding: theme.spacing(2, 0, 2),
  },
  
}));

const tiers = [
  {
    title: "Misiunea noastra",
    description: [
      "Ne propunem ca fiecare persoana ambitioasa sa aiba acces la invatamant de calitate.",
    ],
    buttonText: "Afla mai multe despre noi",
    image1: "/static/images/home_11.jpeg",
    image2: "/static/images/home_21.jpeg",
    link: "/about-us",
  },
  {
    title: "Incearca gratuit",
    description: [
      "Primele 7 zile sunt gratuite; daca nu esti multumit te poti dezabona cu o simpla apasare de buton.",
    ],
    buttonText: "Inregistreaza-te",
    image1: "/static/images/home_12.jpeg",
    image2: "/static/images/home_22.jpeg",
    link: "/signup",
  },
  {
    title: "Lista noastra de cursuri",
    description: [
      "Fie ca te pregatesti sa devii medic, inginer sau programator, ti-am pregatit o oferta foarte buna.",
    ],
    buttonText: "Cursurile noastre",
    image1: "/static/images/home_13.jpeg",
    image2: "/static/images/home_23.jpeg",
    link: "/courses",
  },
];

export default function HomePageCarduri() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline /> {/* Hero unit */}
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <WhiteTextTypography
          component="h1"
          variant={window.innerWidth <= 768 ? "h3" : "h2"}
          align="center"
          gutterBottom
        >
          <Box fontWeight="fontWeightBold" m={1}>
            Icar Academy
          </Box>
        </WhiteTextTypography>
        <WhiteTextTypography variant="h4" align="center" component="p">
          Ca meditatiile, dar mai bine si mai ieftin!
        </WhiteTextTypography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="lg" component="main">
        <WhiteTextTypography
          component="h2"
          variant={window.innerWidth <= 768 ? "subtitle1" : "h6"}
          align="center"
          gutterBottom
          className={classes.spacingItem}
        >
          <Box fontWeight="fontWeightBold" m={1}>
            Aducem eficienta, cooperarea si simplitatea in educatie.
          </Box>
          <Box fontWeight="fontWeightBold" m={1}></Box>
        </WhiteTextTypography>
        <Grid container spacing={5} alignItems="stretch">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <CardWithButton {...tier} />
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
