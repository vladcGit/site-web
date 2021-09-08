import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Avatar,
  CssBaseline,
  Grid,
  makeStyles,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const ContainerAutentificare = (props) => {
  const classes = useStyles();
  const [borderRadius, setBorderRadius] = React.useState([60, -16]);
  return (
    <div
      style={
        {
          /*minHeight: "90vh"*/
        }
      }
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <Grid
          xs={3}
          style={{
            backgroundColor: "#fff",
            borderRadius: "25px",
            boxShadow:
              window.innerWidth <= 768
                ? "none"
                : `${borderRadius[0]}px ${borderRadius[1]}px #888888`,
            transition: "box-shadow 500ms",
            minWidth: window.innerWidth <= 768 ? "90vw" : "auto",
          }}
        >
          <Container
            onMouseOver={() => setBorderRadius([0, 0])}
            onMouseOut={() => setBorderRadius([60, -16])}
            component="main"
            maxWidth="xs"
          >
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              {props.children}
            </div>
          </Container>
        </Grid>
      </div>
    </div>
  );
};

export default ContainerAutentificare;
