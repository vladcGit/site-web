import React, { Component } from "react";
import { Grid, Button, ButtonGroup, Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class Lesson extends Component {
  constructor(props) {
    super(props);
  }

  state = { lectii: [] };

  componentDidMount() {
    const url =
      "http://" +
      window.location.host +
      "/courses/api/getlessons/" +
      this.props.match.params.course_name +
      "/";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ lectii: data });
      });
  }

  render() {
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
      {this.state.lectii.map((value) => {
        return (
          <Grid item>
            <Typography>{value.title}</Typography>
            <Button
              component={Link}
              to={`/courses/${this.props.match.params.course_name}/${value.title}`}
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
  }
}