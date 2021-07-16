import React, { useState } from "react";
import { withStyles, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

function tokenizeTitle(s) {
  let rez = "";

  for (var i = 0; i < s.split("_").length; i++) {
    let aux = s.split("_")[i];
    if (i == 0) aux = aux.charAt(0).toUpperCase() + aux.slice(1);
    rez += aux;
    if (i != s.split("_").length - 1) rez += " ";
  }
  return rez;
}

//nu merge
//
function canViewLesson() {
  if (localStorage.getItem("token") === null) return false;
  fetch("/subscribe/get_full_subscription_details/")
    .then((response) => response.json())
    .then((data) => {
      if (data.hasOwnProperty("Error")) return false;
      if (data.subscription.status != "active") return false;
      return true;
    });
}

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

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
  let dataString = day + "/" + luna + "/" + an;
  return dataString;
}

const colors = {
  galbenInchisRgb:[237,185,14],
  galbenInchis:"#EDB90E",
  portocaliuRgb:[242,107,23],
  movRgb:[127,71,166],
  mov:"#7F47A6",
  movDeschisRgb : [162,116,164],
  violetDeschis : "#BF6BFA",
  griDeschis:"#c7c7c7",
  gri:"#C0C0C0",
  alb: "#FFFFFF",
};

function SimpleTextPage()
{
  let {text} = useParams();
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

export {
  tokenizeTitle,
  WhiteTextTypography,
  getStringDateFromUnixTime,
  colors,
  SimpleTextPage,
};
