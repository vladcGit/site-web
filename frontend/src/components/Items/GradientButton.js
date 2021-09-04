import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { culori } from "./Util";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  btn: {
    border: "none",
    margin: 20,
    width: 250,
    height: 65,
    borderRadius: 6,
    textTransform: "uppercase",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    cursor: "pointer",
    color: "#fff",
    backgroundSize: "200%",
    transition: "0.4s",
    "&:hover": {
      backgroundPosition: "right",
    },
  },
  btn1: {
    backgroundImage: `linear-gradient(45deg, ${culori.portocaliu}, #EE5A24, ${culori.roz})`,
  },
});

export default function GradientButton(props) {
  const classes = useStyles();
  return (
    <>
      <div /*className={classes.container}*/>
        <Button className={`${classes.btn} ${classes.btn1}`}>
          {props.children}
        </Button>
      </div>
    </>
  );
}
