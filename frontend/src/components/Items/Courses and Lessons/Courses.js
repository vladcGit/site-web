import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  ButtonGroup,
  Typography,
  Box,
  makeStyles,
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { tokenizeTitle, colors } from "../Util";
import CardWithButton from "../CardWithButton";

const Courses = () => {
  const [tiers,setTiers] = React.useState([]);
  useEffect(() => {
    fetch("courses/api/getcourses/")
      .then((result) => result.json())
      .then((data) => {
        //console.log(data);
        const nume = [];
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            nume.unshift(data[key].name);
          }
        }

        //fac tiers pentru fiecare nume de curs
        var lista=[];
        for(var i=0;i<nume.length;i++)
        {
          var obj = {};
          obj.title=tokenizeTitle(nume[i]);
          obj.description = [];
          obj.buttonText = "Acceseaza";
          obj.link="/courses/"+nume[i];
          //obj.image="/static/images/carte_vector.png"
          lista.push(obj);
        }
        setTiers(lista);
      });
  }, []);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "50vh" }}
    >
      <Container maxWidth="lg" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          
        {tiers.map((tier) => (
            <CardWithButton {...tier}/>
          ))}
        </Grid>
      </Container>
    </Grid>
  );
};
export default Courses;
