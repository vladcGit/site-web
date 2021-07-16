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

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardTitle:{
    color: "#ffffff"
  }
}));

const Courses = () => {
  const [cursuri, setCursuri] = useState([]);
  const classes = useStyles();
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
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "50vh" }}
    >
      <Container maxWidth="lg" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          
          {cursuri.map((value) => (
            <Grid item key={value} xs={12} sm={12} md={4}>
              <Card style={{borderRadius:25,borderStyle:'solid',borderColor:colors.griDeschis}}>
                <CardHeader
                  title={tokenizeTitle(value)}
                  titleTypographyProps={{
                    align: "center",
                    variant: "h5",
                  }}
                  className={classes.cardHeader}
                  style={{ backgroundColor: colors.gri }}
                  classes={{
                    //title:classes.cardTitle
                  }}
                />
                <CardContent style={{ backgroundColor: colors.alb }}>
                  <CardActions style={{ justifyContent: "center" }}>
                    <Button
                      component={Link}
                      to={`/courses/${value}`}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Acceseaza
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Grid>
  );
};
export default Courses;
