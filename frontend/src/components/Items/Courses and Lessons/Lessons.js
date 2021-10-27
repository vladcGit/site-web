import React, { Component } from "react";
import { Grid, Typography, Container } from "@material-ui/core";
import { tokenizeTitle, colors } from "../Util";
import CardWithButton from "../CardWithButton";
import AnimatedCard from "../Animations/AnimatedCard";

export default class Lesson extends Component {
  state = { lectii: [], tiers: [] };

  componentDidMount() {
    const url =
      "https://" +
      window.location.host +
      "/courses/api/getlessons/" +
      this.props.match.params.course_name +
      "/";

    const getTiers = (data) => {
      //fac tiers pentru fiecare nume de curs
      var lista = [];
      for (var i = 0; i < data.length; i++) {
        var obj = {};
        obj.title = tokenizeTitle(data[i].title);
        obj.description = [];
        obj.buttonText = "Acceseaza";
        obj.link = `/courses/${this.props.match.params.course_name}/${data[i].title}`;
        //doar data[0] are ultima lectie vizionata si data calendaristica din motive de trimis mai putine date
        //daca te ai uitat deja la lectie sau a trecut o zi de la ultima lectie vizionata te poti uita la urmatoarea
        var numarZile =
          (new Date().getTime() - Date.parse(data[0].data_ultima_lectie)) /
          (1000 * 3600 * 24);
        var decizie =
          obj.title.charAt(0) - data[0].last_viewed == 1 && numarZile > 1;

        if (data[0].last_viewed < obj.title.charAt(0) && !decizie)
          obj.isLocked = true;
        //obj.image="/static/images/carte_vector.png"
        // linie adaugata pentru beta
        obj.isLocked = false;
        lista.push(obj);
      }
      this.setState({ tiers: lista });
    };

    const request = async () => {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ lectii: data });
      getTiers(data);
    };

    request();
  }

  render() {
    return (
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "50vh", marginTop: "50px" }}
        direction="column"
      >
        <Grid item style={{ padding: "20px" }}>
          {localStorage.getItem("token") === null && (
            <Typography
              align="center"
              style={{ marginBottom: "50px", color: "white" }}
            >
              Nota: pentru a viziona cursurile este nevoie de un cont cu un
              abonament activ
            </Typography>
          )}
        </Grid>
        <Container maxWidth="lg" component="main">
          <Grid container justifyContent="center">
            {this.state.tiers.map((tier) => (
              <AnimatedCard {...tier} />
            ))}
          </Grid>
        </Container>
      </Grid>
    );
  }
}
