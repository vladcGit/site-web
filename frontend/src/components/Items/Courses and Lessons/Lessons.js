import React, { Component } from "react";
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

export default class Lesson extends Component {
  constructor(props) {
    super(props);
  }

  state = { lectii: [], tiers: [] };

  componentDidMount() {
    const url =
      "https://" +
      window.location.host +
      "/courses/api/getlessons/" +
      this.props.match.params.course_name +
      "/";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ lectii: data });

        //fac tiers pentru fiecare nume de curs
        var lista=[];
        for(var i=0;i<data.length;i++)
        {
          var obj = {};
          obj.title=tokenizeTitle(data[i].title);
          obj.description = [];
          obj.buttonText = "Acceseaza";
          obj.link=`/courses/${this.props.match.params.course_name}/${data[i].title}`;
          //obj.image="/static/images/carte_vector.png"
          lista.push(obj);
        }
        this.state.tiers=lista;
        this.setState({tiers:lista});
      });

  }

  render() {
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ minHeight: "50vh" }}
      >
        <Container maxWidth="lg" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {this.state.tiers.map((tier) => (
              <CardWithButton {...tier}/>
            ))}
          </Grid>
        </Container>
      </Grid>
    );
  }
}
