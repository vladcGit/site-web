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
import { WhiteTextTypography,colors } from "./Util";

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
      <CssBaseline /> {/* Hero unit */}
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <WhiteTextTypography
          component="h1"
          variant={window.innerWidth<=768?"h3":"h2"}
          align="center"
          color="textPrimary"
          gutterBottom
        >
          <Box fontWeight="fontWeightBold" m={1}>
            Icar Academy
          </Box>
        </WhiteTextTypography>
        <WhiteTextTypography
          variant="h4"
          align="center"
          color="textPrimary"
          component="p"
        >
          Ca meditatiile, dar mai bine si mai ieftin!
        </WhiteTextTypography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} md={12}>
              <Card style={{borderRadius:45,borderStyle:'solid',borderColor:'#ffffff'}}
              >
                <CardContent
                  style={{
                    
                    backgroundImage:`linear-gradient(45deg, ${colors.mov} 5%, ${colors.violetDeschis} 90%)`,
                    //backgroundColor:colors.portocaliu
                  }}
                >
                  <div className={classes.cardPricing}>
                    <WhiteTextTypography
                      component="h2"
                      variant="h3"
                      color="textPrimary"
                      gutterBottom
                    >
                      <Box fontWeight="fontWeightRegular" m={1} align="center">
                        Aducem eficienta, cooperarea
                      </Box>
                      <Box fontWeight="fontWeightRegular" m={1} align="center">
                        si simplitatea in educatie
                      </Box>
                    </WhiteTextTypography>
                  </div>
                  <ul>
                    
                    {tier.description.map((line) => (
                      <WhiteTextTypography
                        component="h3"
                        variant="h5"
                        align="center"
                        gutterBottom
                        key={line}
                      >
                        
                        {line}
                      </WhiteTextTypography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions
                  style={{
                    justifyContent: "center",
                    //backgroundColor: colors.portocaliu
                    backgroundImage:`linear-gradient(45deg, ${colors.mov} 30%, ${colors.violetDeschis} 90%)`,
                  }}
                >
                  <Button
                    //fullWidth
                    variant={tier.buttonVariant}
                    //color="primary"
                    component={Link}
                    to="/about-us"
                    style={{borderRadius:20, backgroundColor:colors.galbenInchis}} 
                  >
                    
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
