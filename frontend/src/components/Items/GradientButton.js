import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { colors } from "./Util";

const useStyles = makeStyles({
  btn: {
    border: "none",
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
    backgroundImage: `linear-gradient(45deg, ${colors.portocaliu}, #EE5A24, ${colors.roz})`,
  },
});

export default function GradientButton(props) {
  const classes = useStyles();
  return (
    <>
      <div /*className={classes.container}*/>
        <Button className={`${classes.btn} ${classes.btn1}`} {...props}>
          {props.children}
        </Button>
      </div>
    </>
  );
}
