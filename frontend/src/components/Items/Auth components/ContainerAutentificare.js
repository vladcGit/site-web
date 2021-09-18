import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Avatar,
  CssBaseline,
  Grid,
  makeStyles,
  Container,
  Collapse,
  IconButton,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import { colors } from "../Util";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(5),
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
  const { error, errorMessage, onCloseError } = props;
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
            backgroundColor: colors.alb,
            borderRadius: "25px",
            boxShadow:
              window.innerWidth <= 768
                ? "none"
                : `${borderRadius[0]}px ${borderRadius[1]}px ${colors.griInchis}`,
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
              <Collapse in={error} style={{ marginBottom: "20px" }}>
                <Alert
                  severity="error"
                  variant="filled"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => onCloseError(false)}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {errorMessage}
                </Alert>
              </Collapse>
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
