import React, { Component } from "react";
//import { Card, CardMedia } from "@material-ui/core";
import ReactPlayer from "react-player";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CssBaseline,
  Grid,
  Typography,
  makeStyles,
  Container,
  Box,
  PaperProps,
  withStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);

export default class Lesson extends Component {
  constructor(props) {
    super(props);
  }

  state = { lectie: [], activeSubscriber: false };

  componentDidMount() {
    const url =
      "http://" +
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
          cod:"220620006969",
        }),
      };

    fetch(url,requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ lectie: data });
      })
      .then(() => {
        fetch(
          "http://" +
            window.location.host +
            "/subscribe/get_full_subscription_details/"
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.hasOwnProperty("Error"))
              this.setState({ activeSubscriber: false });
            else if (data.subscription.status == "active")
              this.setState({ activeSubscriber: true });
          });
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
          {this.state.lectie.title}
        </WhiteTextTypography>
        <div
          style={{
            height: "40vh",
          }}
        >
          <ReactPlayer url={this.state.lectie.link} controls />
        </div>
        <WhiteTextTypography>{this.state.lectie.details}</WhiteTextTypography>
      </Grid>
    );
  }
  
 /*
  renderOk() {
    return (
      <React.Fragment>
        <CssBaseline /> {" "}
        <Container maxWidth="md" component="main">
          <WhiteTextTypography
            component="h1"
            variant="h1"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            <Box fontWeight="fontWeightBold" m={1}>
              {this.state.lectie.title}{" "}
            </Box>
          </WhiteTextTypography>{" "}
        </Container>{" "}
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {" "}
            <Grid item xs={12} md={12}>
              <Card>
                <CardHeader
                  titleTypographyProps={{
                    align: "center",
                  }}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  title={this.state.lectie.title}
                />{" "}
                <CardContent>
                  <div
                    style={{
                      height: "40vh",
                    }}
                    align="center"
                  >
                    <ReactPlayer url={this.state.lectie.link} controls />
                  </div>
                </CardContent>{" "}
              </Card>{" "}
            </Grid>
            ))}{" "}
          </Grid>{" "}
        </Container>{" "}
      </React.Fragment>
    );
  }
*/
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
        <Typography component="h1" variant="h2">
          Nu aveti acces
        </Typography>
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
    return this.state.activeSubscriber ? this.renderOk() : this.renderNotOk();
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

/*
async function canView() {
await fetch(
"http://" +
window.location.host +
"/subscribe/get_full_subscription_details/"
)
.then((response) => response.json())
.then((data) => {
//console.log(data);
let bool = false;
console.log(data.subscription.status);
if (data.hasOwnProperty("Error")) return false;
if (data.subscription.status == "active") bool = true;
//console.log(bool);
return bool;
});

return true;
}
*/
