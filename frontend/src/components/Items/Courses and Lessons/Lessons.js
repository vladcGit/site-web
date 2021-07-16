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

export default class Lesson extends Component {
  constructor(props) {
    super(props);
  }

  state = { lectii: [] };

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
            {this.state.lectii.map((value) => (
              <Grid item key={value} xs={12} sm={12} md={4}>
                <Card
                  style={{
                    borderRadius: 25,
                    borderStyle: "solid",
                    borderColor: "#c7c7c7",
                  }}
                >
                  <CardHeader
                    title={tokenizeTitle(value.title)}
                    titleTypographyProps={{
                      align: "center",
                      variant: "h5",
                    }}
                    style={{ backgroundColor: "#C0C0C0" }}
                  />
                  <CardContent style={{ backgroundColor: colors.alb }}>
                    <CardActions style={{ justifyContent: "center" }}>
                      <Button
                        component={Link}
                        to={`/courses/${this.props.match.params.course_name}/${value.title}`}
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
  }

  /*
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
  */
}
