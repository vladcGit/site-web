import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IconButton, Fade, Grow, makeStyles, Zoom } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { StyledButton, WhiteTextTypography, colors } from "./Util";
import GradientButton from "./GradientButton";
import AnimatedCardWithoutClick from "./Animations/AnimatedCardWithoutClick";
import PlanetAnimation from "./Animations/PlanetAnimation";
import ScrollingText from "./Animations/ScrollingText";
import Bookshelf from "./Animations/Bookshelf";
import Astronaut from "./Animations/Astronaut";
import Coffee from "./Animations/Coffee";
import "/static/css/index.css";

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
  FlexSpaceAround: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  HeroContent: {
    minHeight: "94vh",
  },
  flex: {
    display: "flex",
    flexWrap: "wrap",
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
  SpacedText: {
    marginBottom: "40px",
  },
  IconBtn: {
    backgroundColor: "white",
  },
  distantat: {
    padding:
      window.innerWidth <= 768
        ? theme.spacing(10, 0, 0)
        : theme.spacing(20, 0, 0),
  },
  subliniere: {
    backgroundImage: "linear-gradient(120deg, #f50057 0%, #b0003e 100%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 0.2em",
    backgroundPosition: "0 88%",
    transition: "background-size 0.25s ease-in",
    "&:hover": {
      backgroundSize: "100% 88%",
    },
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
    function handler() {
      setVisible(false);
    }
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
              <div style={{ width: "100%", maxWidth: "700px" }}>
                <PlanetAnimation />
              </div>
            </Zoom>
          )}
        </div>
        <div
          style={{
            position: "fixed",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Fade in={visible} timeout={timeout}>
            <div className={`box bounce-1 ${classes.FlexContainerColoana}`}>
              <IconButton
                className={classes.IconBtn}
                onClick={handleScrollButton}
                color="inherit"
              >
                <ArrowDownwardIcon />
              </IconButton>
            </div>
          </Fade>
        </div>
      </div>
      <div
        ref={myRef}
        className={classes.FlexContainerColoana}
        style={{
          backgroundColor: colors.roz,
          minHeight: "60vh",
        }}
      >
        <ScrollingText titleBefore="Te ajutam cu " items={materii} />
        <div
          className={classes.flex}
          style={{
            marginTop: "40px",
            minWidth: "60vw",
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
        style={{ backgroundColor: colors.verdeDeschis }}
      >
        <div style={{ maxWidth: "90vw", marginBottom: "100px" }}>
          <div className={classes.distantat}>
            <WhiteTextTypography
              align="center"
              variant={window.innerWidth <= 768 ? "h5" : "h3"}
            >
              De ce credem ca abordarea noastra este cea{" "}
              <span className={classes.subliniere}> corecta</span>?
            </WhiteTextTypography>
          </div>
          <div className={classes.FlexSpaceAround}>
            {isPhone && <Bookshelf height={350} width={350} />}
            {!isPhone && <Bookshelf height={450} width={450} />}
            <div style={{ maxWidth: "500px" }}>
              <WhiteTextTypography
                className={classes.SpacedText}
                variant={window.innerWidth <= 768 ? "h6" : "h4"}
                align="center"
              >
                Sesiuni de invatare "bite-sized"
              </WhiteTextTypography>
              <WhiteTextTypography
                variant={window.innerWidth <= 768 ? "subtitle2" : "subtitle1"}
                align="center"
                color="textSecondary"
              >
                Studiile arata ca o cantitate mica de informatie este retinuta
                mai bine de catre creierul nostru. Abordarea uzuala din
                invatamantul romanesc este exact inversa.
              </WhiteTextTypography>
            </div>
          </div>
          <div
            className={classes.FlexSpaceAround}
            style={{ marginBottom: isPhone ? "0px" : "100px" }}
          >
            {isPhone && <Astronaut />}
            <div style={{ maxWidth: "500px" }}>
              <WhiteTextTypography
                className={classes.SpacedText}
                variant={window.innerWidth <= 768 ? "h6" : "h4"}
                align="center"
              >
                Selectivitatea informatiei
              </WhiteTextTypography>
              <WhiteTextTypography
                variant={window.innerWidth <= 768 ? "subtitle2" : "subtitle1"}
                align="center"
                color="textSecondary"
              >
                O mare parte din ce se invata la liceu nu va fi folosita
                niciodata. Noi credem ca e mai bine sa ne concentram pe ceea ce
                conteaza.
              </WhiteTextTypography>
            </div>
            {!isPhone && <Astronaut />}
          </div>
          <div className={classes.FlexSpaceAround}>
            <Coffee />
            <div style={{ maxWidth: "500px" }}>
              <WhiteTextTypography
                className={classes.SpacedText}
                variant={window.innerWidth <= 768 ? "h6" : "h4"}
                align="center"
              >
                Mai mult timp liber
              </WhiteTextTypography>
              <WhiteTextTypography
                variant={window.innerWidth <= 768 ? "subtitle2" : "subtitle1"}
                align="center"
                color="textSecondary"
              >
                Eliminarea drumurilor pana la meditatii si eficientizarea
                timpului de invatare ii permit elevului sa aiba mai mult timp la
                dispozitie. De asemenea, oferim si resurse gratuite pentru
                invatare si teme pentru cei care vor sa foloseasca productiv
                acest timp.
              </WhiteTextTypography>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundColor: colors.mov }}
        className={classes.FlexContainerColoana}
      >
        <WhiteTextTypography
          align="center"
          variant={window.innerWidth <= 768 ? "h5" : "h3"}
          style={{
            marginTop: "40px",
            marginBottom: "40px",
            maxWidth: isPhone ? "95vw" : "85vw",
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
