import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Grid, Typography, CircularProgress } from "@material-ui/core";
import {
  tokenizeTitle,
  WhiteTextTypography,
  getStringDateFromUnixTime,
} from "../Util";

export default class Lesson extends Component {
  state = {
    lectie: [],
    canRender: false,
    time: 0.0,
    url:
      "https://" +
      window.location.host +
      "/courses/api/getlesson/" +
      this.props.match.params.course_name +
      "/" +
      this.props.match.params.lesson_title +
      "/",
    unixTimestamp: 0,
    videoSrc: null,
  };

  componentDidMount() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cod: "220620006969",
      }),
    };

    const request = async () => {
      const abonament = await fetch(
        "https://" +
          window.location.host +
          "/subscribe/get_full_subscription_details/"
      );
      let data = await abonament.json();
      if (
        data.hasOwnProperty("Error") ||
        data.subscription.status !== "active"
      ) {
        window.location.replace("/pricing");
      } else {
        this.setState({
          unixTimestamp: data.subscription.current_period_end,
        });
      }

      const response = await fetch(this.state.url, requestOptions);
      data = await response.json();

      if (data.hasOwnProperty("Error"))
        console.log("Nu ai acces, uita-te la altele");

      const blobResponse = await fetch(
        this.state.url + "blob/",
        requestOptions
      );
      const blob = await blobResponse.blob();
      const urlVideo = await URL.createObjectURL(blob);
      this.setState({ videoSrc: urlVideo, lectie: data, canRender: true });
    };

    request();
  }

  componentWillUnmount() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cod: "220620006969",
        time: this.state.time,
      }),
    };
    fetch(this.state.url + "add/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  renderReady() {
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
          {tokenizeTitle(this.state.lectie.title)}
        </WhiteTextTypography>
        <div
          style={{
            height: "40vh",
          }}
        >
          <ReactPlayer
            //url={this.state.lectie.link}
            //url={[{ src: `${this.state.lectie.link}`, type: "video/mp4" }]}
            url={this.state.videoSrc}
            controls
            type="video/mp4"
            onProgress={(progress) =>
              (this.state.time = progress.playedSeconds)
            }
            config={{
              file: {
                attributes: {
                  //controlsList: 'nodownload'  //<- this is the important bit
                  onContextMenu: (e) => e.preventDefault(),
                },
              },
            }}
          />
        </div>

        <WhiteTextTypography>{this.state.lectie.details}</WhiteTextTypography>
        <WhiteTextTypography>
          Abonamentul se incheie la data de{" "}
          {getStringDateFromUnixTime(this.state.unixTimestamp)}
        </WhiteTextTypography>
      </Grid>
    );
  }

  renderNotReady() {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "50vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  render() {
    return this.state.canRender ? this.renderReady() : this.renderNotReady();
  }
}
