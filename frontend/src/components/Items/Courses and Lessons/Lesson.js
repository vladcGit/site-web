import React, { Component, useEffect,Suspense } from "react";
import ReactPlayer from "react-player";
import { Button, Grid } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import {
  tokenizeTitle,
  WhiteTextTypography,
  getStringDateFromUnixTime,
} from "../Util";


export default class Lesson extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    lectie: [],
    activeSubscriber: false,
    time: 0.0,
    url: "",
    unixTimestamp: 0,
  };

  componentDidMount() {
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

    fetch(this.state.url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ lectie: data });
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
            if (data.hasOwnProperty("Error"))
              this.state.activeSubscriber = false;
            else if (data.subscription.status == "active") {
              this.setState({activeSubscriber:true,unixTimestamp:data.subscription.current_period_end})
            }
          });
      });
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

  renderOk() {
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
            url={this.state.lectie.link}
            //url={[{ src: `${this.state.lectie.link}`, type: "video/mp4" }]}
            controls
            type="video/mp4"
            onProgress={(progress) =>
              (this.state.time = progress.playedSeconds)
            }
          />
        </div>

        <WhiteTextTypography>{this.state.lectie.details}</WhiteTextTypography>
        <WhiteTextTypography>
          Abonamentul se incheie la date de{" "}
          {getStringDateFromUnixTime(this.state.unixTimestamp)}
        </WhiteTextTypography>
      </Grid>
    );
  }

  renderNotOk() {
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
  }

  render() {
    var flag = this.state.activeSubscriber;
    return flag ? this.renderOk() : this.renderNotOk();
  }
}


//component functional

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