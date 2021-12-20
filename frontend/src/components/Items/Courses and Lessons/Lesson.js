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
      /*
      const abonament = await fetch(
        "https://" +
          window.location.host +
          "/subscribe/get_full_subscription_details/"
      );
      let data = await abonament.json();
      //modificat pentru beta
      
      if (
        data.hasOwnProperty("Error") ||
        data.subscription.status !== "active"
      )
      

      if (false) {
        window.location.replace("/pricing");
        return;
      } else {
        this.setState({
          unixTimestamp: data.subscription.current_period_end,
        });
      }

      */
      const response = await fetch(this.state.url, requestOptions);
      let data = await response.json();

      if (data.hasOwnProperty("Error"))
        console.log("Nu ai acces, uita-te la altele");
      /*
      const blobResponse = await fetch(
        this.state.url + "blob/",
        requestOptions
      );
  
      const blob = await blobResponse.blob();
      const urlVideo = await URL.createObjectURL(blob);
        */
      this.setState({ lectie: data, canRender: true });
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
        <div style={{ maxWidth: "80vw", textAlign: "center" }}>
          <WhiteTextTypography
            component="h1"
            variant={window.innerWidth <= 768 ? "h5" : "h2"}
            gutterBottom
          >
            {tokenizeTitle(this.state.lectie.title)}
          </WhiteTextTypography>
        </div>
        <div
          style={{
            height: "40vh",
          }}
        >
          <ReactPlayer
            style={{ maxWidth: "80vw" }}
            //url={this.state.lectie.link}
            url={this.state.lectie.link}
            //url={this.state.videoSrc}
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

          {/* <iframe
            style={{ width: "60vw", height: "40vh" }}
            src={this.state.lectie.link}
            allowfullscreen
            scrolling="no"
            allow="encrypted-media;"
          ></iframe> */}
        </div>

        <WhiteTextTypography
          dangerouslySetInnerHTML={{ __html: this.state.lectie.details }}
        />
        {/* <WhiteTextTypography>
          Abonamentul se incheie la data de{" "}
          {getStringDateFromUnixTime(this.state.unixTimestamp)}
        </WhiteTextTypography> */}
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
