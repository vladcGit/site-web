import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import {
  Grid,
  Typography,
  Link,
  makeStyles,
  Container,
  Box,
  CardHeader,
  Card,
  CardMedia,
  Avatar,
  IconButton,
  Icon,
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
const useStyles = makeStyles((theme) => ({
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
const footers = [
  {
    title: "Company",
    description: ["Our team", "About us", "Contact us"],
  },
  {
    title: "Features",
    description: [],
  },
  {
    title: "Resources",
    description: [],
  },
  {
    title: "Legal",
    description: [],
  },
];

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="primary" href="/">
        Icar Academy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  const classes = useStyles();
  return (
    <div>
      <Container
        maxWidth="md"
        component="footer"
        className={classes.footer}
        style={{ textAlign: "center" }}
      >
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${
                        item.split(" ")[0].toLowerCase() +
                        "-" +
                        item.split(" ")[1]
                      }`}
                      variant="subtitle1"
                      color="primary"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Typography>Urmareste-ne pe social media</Typography>
          <IconButton
            target="_blank"
            href="https://www.instagram.com/icaracademy/"
          >
            <InstagramIcon color="primary" />
          </IconButton>
          <IconButton target="_blank" href="https://www.facebook.com/">
            <FacebookIcon color="primary" />
          </IconButton>
          <IconButton target="_blank" href="https://www.tiktok.com/ro-RO/">
            <Avatar
              src="/static/images/tiktok.png"
              style={{ height: "25px", width: "25px" }}
            />
          </IconButton>
        </Box>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      { window.innerWidth > 768 &&
      <Box mt={5}>
        <img style={{ maxWidth: "100%" }} src={"/static/images/footer.png"} />
      </Box>
}
    </div>
  );
}
