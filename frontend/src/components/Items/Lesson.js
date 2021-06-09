import React, { Component } from "react";
//import { Card, CardMedia } from "@material-ui/core";
import ReactPlayer from "react-player";

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40vh",
        }}
      >
        <ReactPlayer url={this.state.lectie.link} />
      </div>
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
