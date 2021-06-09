import React, { useState, useEffect } from "react";
import { Grid, Button, ButtonGroup, Typography, Box } from "@material-ui/core";

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
            //console.log(data[key].name);
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
      spacing={3}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "50vh" }}
    >
      <Typography>{cursuri.join()}</Typography>
    </Grid>
  );
};
export default Courses;
