import React, { Component } from "react";
//import { Card, CardMedia } from "@material-ui/core";
import ReactPlayer from "react-player";
import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

export default class Lesson extends Component {
  constructor(props) {
    super(props);
  }

  state = { lectie: [] };

  componentDidMount() {
    const url =
      "http://" +
      window.location.host +
      "/courses/api/getlesson/" +
      this.props.match.params.course_name +
      "/" +
      this.props.match.params.lesson_title +
      "/";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ lectie: data });
      });
  }

  render() {
    return (
      <Grid
        container
        xs={12}
        spacing={3}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "70vh" }}
      >
        <WhiteTextTypography component="h1" variant="h2" gutterBottom>
          {this.state.lectie.title}
        </WhiteTextTypography>
        <div
          style={{
            height: "40vh",
          }}
        >
          <ReactPlayer url={this.state.lectie.link} />
        </div>
        <WhiteTextTypography>{this.state.lectie.details}</WhiteTextTypography>
      </Grid>
    );
  }
}

/*<div>
        <Card>
          <CardMedia
            component="iframe"
            height="560"
            width="315"
            title="test"
            src={this.state.lectie.link}
          />
        </Card>
      </div>*/
