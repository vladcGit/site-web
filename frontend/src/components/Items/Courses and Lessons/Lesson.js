import React, {Component, useEffect, Suspense} from "react";
import ReactPlayer from "react-player";
import {Button, Grid, Typography, CircularProgress} from "@material-ui/core";
import {Link, useParams} from "react-router-dom";
import {
    tokenizeTitle,
    WhiteTextTypography,
    getStringDateFromUnixTime,
} from "../Util";

export default class Lesson extends Component
{
    constructor(props)
    {
        super(props);
    }

    async getUrlStreamForMostRecentMP4OnDb() {
      fetch("http://localhost:4000/ytdl/streamMP4")
        .then(re => re.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(url => {
          this.setState({ playerSource: url });
        })
        .catch(err => {
          console.log(err);
        });
    }
  

    state = {
        lectie: [],
        canRender: false,
        time: 0.0,
        url: "",
        unixTimestamp: 0,
        videoSrc: null,
    };

    componentDidMount()
    {
        this.state.url =
            "https://" +
            window.location.host +
            "/courses/api/getlesson/" +
            this.props.match.params.course_name +
            "/" +
            this.props.match.params.lesson_title +
            "/";

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cod: "220620006969",
            }),
        };

        fetch(
            "https://" +
            window.location.host +
            "/subscribe/get_full_subscription_details/"
        )
            .then((response) => response.json())
            .then((data) =>
            {
                if (
                    data.hasOwnProperty("Error") ||
                    data.subscription.status != "active"
                )
                {
                    window.location.replace("/pricing");
                } else
                {
                    this.setState({
                        unixTimestamp: data.subscription.current_period_end,
                    });
                    fetch(this.state.url, requestOptions)
                        .then((response) => response.json())
                        .then((data) =>
                        {
                            if (data.hasOwnProperty("Error")) console.log("Nu ai acces, uita-te la altele");
                            fetch(this.state.url+"blob/",requestOptions).then(re=>re.blob()).then(blob => URL.createObjectURL(blob)).then(url=>this.setState({ videoSrc: url }))
                            this.setState({lectie: data, canRender: true});
                        });
                }
            });
    }

    componentWillUnmount()
    {
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
            .then((data) =>
            {
                console.log(data);
            });
    }

    renderReady()
    {
        return (
            <Grid
                container
                xs={12}
                spacing={3}
                direction="column"
                alignItems="center"
                justify="center"
                style={{minHeight: "70vh"}}
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
                        config={{ file: { 
                          attributes: {
                            //controlsList: 'nodownload'  //<- this is the important bit
                            onContextMenu: e => e.preventDefault()
                          }
                      }}}
                    />
                </div>

                <Typography>{this.state.lectie.details}</Typography>
                <Typography>
                    Abonamentul se incheie la data de{" "}
                    {getStringDateFromUnixTime(this.state.unixTimestamp)}
                </Typography>
            </Grid>
        );
    }

    renderNotReady()
    {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{minHeight: "50vh"}}
            >
                <CircularProgress/>
            </Grid>
        );
    }

    render()
    {
        return this.state.canRender ? this.renderReady() : this.renderNotReady();
    }
}

//component functional care probabil nu merge

/*
export default function Lesson() {
  const [lectie, setLectie] = React.useState([]);
  const [activeSubscriber, setActiveSubscriber] = React.useState(false);
  const [time, setTime] = React.useState(0.0);
  const [url, setUrl] = React.useState("");
  const [unixTimestamp, setUnixTimestamp] = React.useState(0);
  const [functie,setFunctie] = React.useState(()=>void 0);
  let { course_name,lesson_title } = useParams();
  useEffect(() => {
    const myUrl = "https://" +
    window.location.host +
    "/courses/api/getlesson/" +
    course_name +
    "/" +
    lesson_title +
    "/";

    setUrl(myUrl);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cod: "220620006969",
      }),
    };

    fetch(myUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setLectie(data);
      })
      .then(() => {
        fetch(
          "https://" +
            window.location.host +
            "/subscribe/get_full_subscription_details/"
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.hasOwnProperty("Error")) setActiveSubscriber(false);
            else if (data.subscription.status == "active") {
              setActiveSubscriber(true);
              setUnixTimestamp(data.subscription.current_period_end);
            }
            if(activeSubscriber) setFunctie(renderOk);
            else setFunctie(renderNotOk);
          });
      });
    return function setTimeWatched() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cod: "220620006969",
          time: time,
        }),
      };
      fetch(myUrl + "add/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    };
  },[]);

  const renderOk = () => {
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
          {tokenizeTitle(lectie.title)}
        </WhiteTextTypography>
        <div
          style={{
            height: "40vh",
          }}
        >
          <ReactPlayer
            url={lectie.link}
            //url={[{ src: `${this.state.lectie.link}`, type: "video/mp4" }]}
            controls
            type="video/mp4"
            onProgress={(progress) => setTime(progress.playedSeconds)}
          />
        </div>

        <WhiteTextTypography>{lectie.details}</WhiteTextTypography>
        <WhiteTextTypography>
          Abonamentul se incheie la date de{" "}
          {getStringDateFromUnixTime(unixTimestamp)}
        </WhiteTextTypography>
      </Grid>
    );
  };

  const renderNotOk = () => {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "70vh" }}
      >
        <WhiteTextTypography component="h1" variant="h2">
          Nu aveti acces
        </WhiteTextTypography>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to={"/pricing"}
        >
          Spre pagina de subscribe
        </Button>
      </Grid>
    );
  };

  const functiefct = () => {return activeSubscriber?renderOk():renderNotOk()}


  return functiefct();
}
*/
