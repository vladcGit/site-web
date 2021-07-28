import React from "react";
import StarIcon from "@material-ui/icons/StarBorder";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
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
    Collapse,
    IconButton,
    makeStyles,
} from "@material-ui/core";

import {loadStripe} from "@stripe/stripe-js";
import {WhiteTextTypography} from "./Util";

const useStyles = makeStyles((theme) => ({
    "@global": {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: "none",
        },
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
}));

const tiers = [
    {
        title: "Incepator",
        price: "0",
        description: [
            "Free trial de 7 zile anulabil oricand;",
            'Dupa 7 zile se activeaza abonamentul de tip "Student".',
        ],
        buttonText: "Incearca gratuit",
        buttonVariant: "contained",
        unitateTemporara: "",
        stripePriceId: "price_1JCVfHG3BrIJ6aWBgtvhhEFn",
    },
    {
        title: "Entuziast",
        price: "999",
        description: [
            "Potrivit pentru studentii cei mai silitori;",
            "Acces nelimitat la toate cursurile;",
            "Abilitatea de a trimite oricate intrebari;",
            "Cea mai buna valoare pentru banii tai.",
        ],
        buttonText: "Incepe sa inveti pe bune",
        buttonVariant: "contained",
        unitateTemporara: "/an",
        stripePriceId: "price_1JCVdoG3BrIJ6aWBgCVaC51t",
    },
    {
        title: "Student (cel mai popular)",
        //subheader: "Cel mai popular",
        price: "100",
        description: [
            "Potrivit pentru majoritatea studentilor;",
            "Acces nelimitat la toate cursurile;",
            "Un mare pas in directia invatarii.",
        ],
        buttonText: "Incepe calatoria",
        buttonVariant: "contained",
        unitateTemporara: "/luna",
        stripePriceId: "price_1IxFu2G3BrIJ6aWBH5Bch0wk",
    },
];

export default function Pricing()
{
    const classes = useStyles();
    const [error, setError] = React.useState(false);

    //nu face nimic
    //schimba ordinea elementelor din tiers dar nu se modifica nimic
    /*
    useEffect(() => {
      if (window.innerWidth <= 768) {
        tiers = [tiers[0],tiers.find(t=>t.price=="100"),tiers.find(t=>t.price=="999")]
      }
    }, []);
    */

    function handleButtonClick(stripePriceId)
    {
        if (localStorage.getItem("token") !== null)
        {
            fetch("subscribe/config/")
                .then((result) => result.json())
                .then(async (data) =>
                {
                    const stripePromise = loadStripe(data.publicKey);

                    const stripe = await stripePromise;

                    fetch("subscribe/create-checkout-session/" + stripePriceId + "/")
                        .then((result) => result.json())
                        .then((data) =>
                        {
                            console.log(data);
                            return stripe.redirectToCheckout({sessionId: data.sessionId});
                        })
                        .then((res) =>
                        {
                            console.log(res);
                        });
                });
        } else setError(true);
    }

    return (
        <React.Fragment>
            <CssBaseline/> {/* Hero unit */}
            <Container maxWidth="md" component="main" className={classes.heroContent}>
                <WhiteTextTypography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                >
                    Preturile noastre
                </WhiteTextTypography>
                <WhiteTextTypography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    component="p"
                    gutterBottom
                >
                    Ofertele noastre de invatare.
                </WhiteTextTypography>
                <WhiteTextTypography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    component="p"
                    gutterBottom
                >
                    Daca nu mai esti multumit poti anula abonamentul oricand.
                </WhiteTextTypography>
                <WhiteTextTypography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    component="p"
                    gutterBottom
                >
                    Procesam platile prin intermediul Stripe, cel mai mare serviciu de
                    plati online din lume; in traducere libera, cardul tau e in siguranta.
                </WhiteTextTypography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="lg" component="main">
                <Grid container spacing={5} alignItems="flex-end">
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
                                    action={tier.title === "Entuziast" ? <StarIcon/> : null}
                                    className={classes.cardHeader}
                                />
                                <CardContent>
                                    <div className={classes.cardPricing}>
                                        <Typography component="h2" variant="h3" color="textPrimary">
                                            {tier.price} Lei
                                        </Typography>
                                        <Typography variant="h6" color="textSecondary">
                                            {tier.unitateTemporara}
                                        </Typography>
                                    </div>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        variant={tier.buttonVariant}
                                        color="primary"
                                        onClick={() => handleButtonClick(tier.stripePriceId)}
                                    >
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Collapse in={error}>
                    <Alert
                        severity="warning"
                        variant="filled"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() =>
                                {
                                    setError(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }
                    >
                        Trebuie sa fii logat ca sa poti accesa pagina de plati.
                    </Alert>
                </Collapse>
            </Container>
        </React.Fragment>
    );
}
