import React, { useState } from "react";
import {withStyles,Typography} from '@material-ui/core';

function tokenizeTitle(s)
{
  let rez="";

  for(var i=0;i<s.split("_").length;i++)
    {
      let aux = s.split("_")[i];
      if(i==0) aux=aux.charAt(0).toUpperCase() + aux.slice(1)
      rez+=aux;
      if(i!=s.split("_").length-1) rez+=" ";
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

export { tokenizeTitle, WhiteTextTypography };
