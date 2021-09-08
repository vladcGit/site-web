import React from "react";
import {
  CssBaseline,
  Grid,
  makeStyles,
  Container,
  Box,
  Typography,
  Button,
} from "@material-ui/core";

import { WhiteTextTypography, colors, DivAlb } from "./Util";
import CardWithButton from "./CardWithButton";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  heroContent: {
    padding: theme.spacing(3, 0, 5),
  },
  distantat: {
    padding: theme.spacing(20, 0, 0),
  },
  spacingItem: {
    padding: theme.spacing(2, 0, 2),
  },
  textAlb: {
    color: colors.alb,
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
      <div style={{ height: "100vh" }}>
        <Container
          maxWidth="md"
          component="main"
          className={classes.heroContent}
        >
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
          </WhiteTextTypography>
          <Grid container spacing={5} alignItems="stretch">
            {tiers.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <CardWithButton {...tier} />
            ))}
          </Grid>
        </Container>
      </div>
      <div style={{ backgroundColor: "white" }}>
        <div className={classes.distantat}>
          <Typography
            align="center"
            variant={window.innerWidth <= 768 ? "h5" : "h3"}
            className={window.innerWidth <= 768 ? classes.textAlb : null}
          >
            De ce credem ca abordarea noastra este cea corecta?
          </Typography>
        </div>
        <Box
          className={classes.distantat}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-around"
        >
          <img
            alt=""
            src={"/static/images/pngcarti.png"}
            style={{ flex: 1, maxHeight: "200px", maxWidth: "200px" }}
          />
          <Box style={{ flexGrow: 1, maxWidth: "500px" }}>
            <Typography
              component="h2"
              variant={window.innerWidth <= 768 ? "h6" : "h5"}
              align="center"
              className={window.innerWidth <= 768 ? classes.textAlb : null}
            >
              Sesiuni de invatare "bite-sized"
            </Typography>
            <Typography
              component="h2"
              variant={window.innerWidth <= 768 ? "subtitle2" : "subtitle1"}
              align="center"
              color="textSecondary"
              className={window.innerWidth <= 768 ? classes.textAlb : null}
            >
              Studiile arata ca o cantitate mica de informatie este retinuta mai
              bine de catre creierul nostru. Abordarea uzuala din invatamantul
              romanesc este exact inversa.
            </Typography>
          </Box>
        </Box>
        <Box
          className={classes.distantat}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-around"
        >
          <Box style={{ flexGrow: 1, maxWidth: "500px" }}>
            <Typography
              component="h2"
              variant={window.innerWidth <= 768 ? "h6" : "h5"}
              align="center"
              className={window.innerWidth <= 768 ? classes.textAlb : null}
            >
              Selectivitatea informatiei
            </Typography>
            <Typography
              component="h2"
              variant={window.innerWidth <= 768 ? "subtitle2" : "subtitle1"}
              align="center"
              color="textSecondary"
              className={window.innerWidth <= 768 ? classes.textAlb : null}
            >
              O mare parte din ce se invata la liceu nu va fi folosita
              niciodata. Noi credem ca e mai bine sa ne concentram pe ceea ce
              conteaza.
            </Typography>
          </Box>
          <img
            alt=""
            src={"/static/images/clipart1879433.png"}
            style={{ flex: 1, maxHeight: "200px", maxWidth: "200px" }}
          />
        </Box>
        <Box
          className={classes.distantat}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-around"
        >
          <img
            alt=""
            src={"/static/images/clipart380322.png"}
            style={{ flex: 1, maxHeight: "200px", maxWidth: "200px" }}
          />
          <Box style={{ flexGrow: 1, maxWidth: "500px" }}>
            <Typography
              component="h2"
              variant={window.innerWidth <= 768 ? "h6" : "h5"}
              align="center"
              className={window.innerWidth <= 768 ? classes.textAlb : null}
            >
              Mai mult timp liber
            </Typography>
            <Typography
              component="h2"
              variant={window.innerWidth <= 768 ? "subtitle2" : "subtitle1"}
              align="center"
              color="textSecondary"
              className={window.innerWidth <= 768 ? classes.textAlb : null}
            >
              Eliminarea drumurilor pana la meditatii si eficientizarea timpului
              de invatare ii permit elevului sa aiba mai mult timp la
              dispozitie. De asemenea, oferim si resurse gratuite pentru
              invatare si teme pentru cei care vor sa foloseasca productiv acest
              timp.
            </Typography>
          </Box>
        </Box>
      </div>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={{ marginTop: "180px", backgroundColor: "white" }}
      >
        <Grid xs={window.innerWidth <= 768 ? 12 : 6}>
          <Typography
            align="center"
            variant={window.innerWidth <= 768 ? "h6" : "h4"}
            style={{ marginBottom: "50px" }}
            className={window.innerWidth <= 768 ? classes.textAlb : null}
          >
            Nu in ultimul rand, cand inveti pentru tine, nu pentru nota sau alti
            factori externi, inveti mult mai bine.
          </Typography>
        </Grid>
        <Button
          component={Link}
          to="/pricing"
          size="large"
          color="primary"
          variant="contained"
        >
          Incearca gratuit
        </Button>
      </Grid>
    </React.Fragment>
  );
}

//card doar cu imagine, are si spatiu gol dedesupt

/*
<Card>
          <CardActionArea>
            <div
              style={{
                display: "flex",
                alignItem: "center",
                justifyContent: "center",
              }}
            >
              <CardMedia
                style={{
                  width: "auto",
                  maxHeight: "140px",
                }}
                component="img"
                image={"/static/images/pngcarti.png"}
                //title="Contemplative Reptile"
              />
            </div>
          </CardActionArea>
          <CardContent/>
        </Card>
*/
