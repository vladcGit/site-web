import React from "react";
import { Button, Card, Typography, withStyles, Grid } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

function tokenizeTitle(s) {
  let rez = "";

  for (let i = 0; i < s.split("_").length; i++) {
    let aux = s.split("_")[i];
    if (i === 0) aux = aux.charAt(0).toUpperCase() + aux.slice(1);
    rez += aux;
    if (i !== s.split("_").length - 1) rez += " ";
  }
  return rez;
}

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

const DivAlb = (props) => {
  return (
    <div style={{ backgroundColor: "white" }} {...props}>
      {props.children}
    </div>
  );
};

function getStringDateFromUnixTime(unixTime) {
  let data = new Date(unixTime * 1000);
  const luni = [
    "ianuarie",
    "februarie",
    "martie",
    "aprilie",
    "mai",
    "iunie",
    "iulie",
    "august",
    "septembrie",
    "octombrie",
    "noiembrie",
    "decembrie",
  ];
  let day = data.getDate();
  let luna = luni[data.getMonth()];
  let an = data.getFullYear();
  return day + "/" + luna + "/" + an;
}

const colors = {
  galbenInchisRgb: [237, 185, 14],
  galbenInchis: "#EDB90E",
  portocaliuRgb: [242, 107, 23],
  movRgb: [127, 71, 166],
  mov: "#7F47A6",
  movDeschisRgb: [162, 116, 164],
  violetDeschis: "#BF6BFA",
  griDeschis: "#c7c7c7",
  gri: "#C0C0C0",
  alb: "#FFFFFF",
  roz: "#D90368",
  portocaliu: "#FF7F11",
};

function SimpleTextPage() {
  let { text } = useParams();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "70vh" }}
    >
      <WhiteTextTypography component="h1" variant="h2">
        {text}
      </WhiteTextTypography>
    </Grid>
  );
}

const StyledCard = (props) => {
  const [onFocus, setOnFocus] = React.useState(false);
  const onMouseAction = () => setOnFocus(!onFocus);
  return (
    <Card
      onMouseOver={onMouseAction}
      onMouseOut={onMouseAction}
      raised={onFocus}
      style={{
        borderRadius: 25,
        borderStyle: "solid",
        borderColor: colors.alb,
      }}
      elevation={onFocus ? 10 : 0}
      variant={onFocus ? "elevation" : "outlined"}
      {...props}
    >
      {props.children}
    </Card>
  );
};

const StyledButton = (props) => {
  const [onFocus, setOnFocus] = React.useState(false);
  const onMouseAction = () => setOnFocus(!onFocus);
  //const redTheme = createTheme({ palette: { primary: { main: "#f50057" } } });
  return (
    <Button
      onMouseOver={onMouseAction}
      onMouseOut={onMouseAction}
      variant="contained"
      color={onFocus ? props.myColor : "default"}
      {...props}
    >
      {props.children}
    </Button>
  );
};

StyledButton.defaultProps = { myColor: "secondary" };

export {
  tokenizeTitle,
  WhiteTextTypography,
  getStringDateFromUnixTime,
  colors,
  SimpleTextPage,
  StyledCard,
  StyledButton,
  DivAlb,
};
