import React, { useState, useEffect, useRef } from "react";
import {
  IconButton,
  Grid,
  Fade,
  Slide,
  Grow,
  makeStyles,
  Button,
  Zoom,
  Typography,
  Box,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { Link } from "react-router-dom";
import { StyledButton, WhiteTextTypography } from "./Util";
import GradientButton from "./GradientButton";
import AnimatedCardWithoutClick from "./AnimatedCardWithoutClick";
import "./Homepage.css";
import PlanetAnimation from "./PlanetAnimation";
import ScrollingText from "./ScrollingText";

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

const useStyles = makeStyles((theme) => ({
  HeroContent: {
    minHeight: "94vh",
  },
  FlexContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "start",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  FlexContainerColoana: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  DivCentrat: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: window.innerHeight > 768 ? "20vh" : "0px",
  },
  Image: {
    //maxWidth: "30vw",
    flex: 1,
    maxHeight: "200px",
    maxWidth: "200px",
  },
  SpacedText: {
    marginBottom: "40px",
  },
  IconBtn: {
    marginTop: "10px",
    marginBottom: "50px",
    backgroundColor: "white",
  },
  distantat: {
    padding:
      window.innerWidth <= 768
        ? theme.spacing(10, 0, 0)
        : theme.spacing(20, 0, 0),
  },
}));
const HomePage = () => {
  const classes = useStyles();
  const [visible, setVisible] = useState(true);
  const myRef = useRef(null);
  const isPhone = window.innerWidth <= 768;
  const timeout = 1500;
  const handleScrollButton = () => {
    myRef.current.scrollIntoView();
    setVisible(false);
  };
  const materii = [
    "matematica",
    "romana",
    "fizica",
    "chimia",
    "informatica",
    "biologia",
    "engleza",
    "franceza",
  ];
  useEffect(() => {
    const handler = () => {
      setVisible(false);
    };
    window.onscroll = handler;
    window.ontouchmove = handler;
  }, []);
  return (
    <React.Fragment>
      <div className={classes.HeroContent}>
        <div
          className={classes.FlexContainer}
          style={{ minHeight: isPhone ? "50vh" : "70vh" }}
        >
          <Grow in={true} timeout={timeout}>
            <div className={classes.DivCentrat} style={{ maxWidth: "90vw" }}>
              <WhiteTextTypography
                variant={isPhone ? "h4" : "h2"}
                className={classes.SpacedText}
                align="center"
              >
                Invata mai mult cu mai putini bani
              </WhiteTextTypography>
              <WhiteTextTypography
                variant={isPhone ? "subtitle1" : "h5"}
                className={classes.SpacedText}
                align="center"
              >
                Aducem eficienta, cooperarea si simplitatea in educatie. Poti
                incerca gratuit serviciul nostru.
              </WhiteTextTypography>
              <GradientButton component={Link} to="/pricing">
                Vezi oferta
              </GradientButton>
            </div>
          </Grow>

          {!isPhone && (
            <Zoom in={true} timeout={timeout}>
              {/*
                <img
                  className={`${classes.Image} sBinalla`}
                  alt=""
                  //src="https://picsum.photos/1920/1080"
                  src="/static/images/atom2.png"
                />
              */}
              <PlanetAnimation />
            </Zoom>
          )}
        </div>
        <Fade in={visible} timeout={timeout}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{
              position: "absolute",
              bottom: 0,
            }}
            className="box bounce-1"
          >
            <IconButton
              className={classes.IconBtn}
              onClick={handleScrollButton}
              color="inherit"
            >
              <ArrowDownwardIcon />
            </IconButton>
          </Grid>
        </Fade>
      </div>
      <div
        ref={myRef}
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f50057",
          minHeight: "60vh",
        }}
      >
        <ScrollingText titleBefore="Te ajutam cu " items={materii} />
        <div
          style={{
            marginTop: "40px",
            minWidth: "60vw",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: isPhone ? "center" : "space-between",
          }}
        >
          {tiers.map((tier) => {
            return (
              <div
                className={classes.FlexContainerColoana}
                style={{ marginBottom: "40px" }}
              >
                <AnimatedCardWithoutClick {...tier} />
                <StyledButton
                  component={Link}
                  to={tier.link}
                  style={{
                    //width: "50%",
                    marginTop: "20px",
                  }}
                >
                  {tier.buttonText}
                </StyledButton>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={classes.FlexContainerColoana}
        style={{ backgroundColor: "#00a575" }}
      >
        <div style={{ maxWidth: "80vw", marginBottom: "100px" }}>
          <div className={classes.distantat}>
            <WhiteTextTypography
              align="center"
              variant={window.innerWidth <= 768 ? "h5" : "h3"}
            >
              De ce credem ca abordarea noastra este cea corecta?
            </WhiteTextTypography>
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
              className={classes.Image}
            />
            <Box style={{ flexGrow: 1, maxWidth: "500px" }}>
              <WhiteTextTypography
                component="h2"
                variant={window.innerWidth <= 768 ? "h6" : "h4"}
                align="center"
                className={window.innerWidth <= 768 ? classes.textAlb : null}
              >
                Sesiuni de invatare "bite-sized"
              </WhiteTextTypography>
              <WhiteTextTypography
                component="h2"
                variant={window.innerWidth <= 768 ? "subtitle2" : "subtitle1"}
                align="center"
                color="textSecondary"
                className={window.innerWidth <= 768 ? classes.textAlb : null}
              >
                Studiile arata ca o cantitate mica de informatie este retinuta
                mai bine de catre creierul nostru. Abordarea uzuala din
                invatamantul romanesc este exact inversa.
              </WhiteTextTypography>
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
              <WhiteTextTypography
                component="h2"
                variant={window.innerWidth <= 768 ? "h6" : "h4"}
                align="center"
                className={window.innerWidth <= 768 ? classes.textAlb : null}
              >
                Selectivitatea informatiei
              </WhiteTextTypography>
              <WhiteTextTypography
                component="h2"
                variant={window.innerWidth <= 768 ? "subtitle2" : "subtitle1"}
                align="center"
                color="textSecondary"
                className={window.innerWidth <= 768 ? classes.textAlb : null}
              >
                O mare parte din ce se invata la liceu nu va fi folosita
                niciodata. Noi credem ca e mai bine sa ne concentram pe ceea ce
                conteaza.
              </WhiteTextTypography>
            </Box>
            <img
              alt=""
              src={"/static/images/clipart1879433.png"}
              className={classes.Image}
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
              className={classes.Image}
            />
            <Box style={{ flexGrow: 1, maxWidth: "500px" }}>
              <WhiteTextTypography
                component="h2"
                variant={window.innerWidth <= 768 ? "h6" : "h4"}
                align="center"
                className={window.innerWidth <= 768 ? classes.textAlb : null}
              >
                Mai mult timp liber
              </WhiteTextTypography>
              <WhiteTextTypography
                component="h2"
                variant={window.innerWidth <= 768 ? "subtitle2" : "subtitle1"}
                align="center"
                color="textSecondary"
                className={window.innerWidth <= 768 ? classes.textAlb : null}
              >
                Eliminarea drumurilor pana la meditatii si eficientizarea
                timpului de invatare ii permit elevului sa aiba mai mult timp la
                dispozitie. De asemenea, oferim si resurse gratuite pentru
                invatare si teme pentru cei care vor sa foloseasca productiv
                acest timp.
              </WhiteTextTypography>
            </Box>
          </Box>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#4E38C5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <WhiteTextTypography
          align="center"
          variant={window.innerWidth <= 768 ? "h5" : "h3"}
          style={{
            marginTop: "40px",
            marginBottom: "40px",
            maxWidth: isPhone ? "none" : "85vw",
          }}
        >
          E timpul sa incepi sa investesti in tine
        </WhiteTextTypography>
        <div style={{ maxWidth: isPhone ? "70vw" : "30vw" }}>
          <WhiteTextTypography
            variant={window.innerWidth <= 768 ? "subtitle1" : "h5"}
            align="center"
            style={{ marginBottom: "40px" }}
          >
            Pentru ca a invata despre lume se poate dovedi cea mai buna decizie
            pe care ai luat-o
          </WhiteTextTypography>
        </div>
        <StyledButton
          component={Link}
          to="/signup"
          style={{ marginBottom: "40px" }}
        >
          Incepe gratuit
        </StyledButton>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
