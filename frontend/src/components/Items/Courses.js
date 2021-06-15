import React, { useState, useEffect } from "react";
import { Grid, Button, ButtonGroup, Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

function getCourses() {
  fetch("courses/api/getcourses/")
    .then((result) => result.json())
    .then((data) => {
      //console.log(data);
      var nume = [];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          //console.log(data[key].name);
          nume.unshift(data[key].name);
        }
      }
      console.log(nume);
      return nume;
    });
}

const Courses = () => {
  const [cursuri, setCursuri] = useState([]);
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
        setCursuri(nume);
      });
  }, []);

  return (
    <Grid
      container
      xs={12}
      spacing={5}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "50vh" }}
    >
      {cursuri.map((value) => {
        return (
          <Grid item>
            <Typography>{value}</Typography>
            <Button
              component={Link}
              to={`/courses/${value}`}
              variant="contained"
              color="primary"
            >
              Go
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};
export default Courses;
