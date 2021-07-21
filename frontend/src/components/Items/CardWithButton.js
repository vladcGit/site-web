import React from "react";
import {
  Button,
  Card,
  Grid,
  CardMedia,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  makeStyles,
  Box,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { colors } from "./Util";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  heroContent: {
    padding: theme.spacing(3, 0, 5),
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  spacingItem: {
    padding: theme.spacing(2, 0, 2),
  },
}));

export default function CardWithButton(tier) {
  const classes = useStyles();
  const [onFocus, setOnFocus] = React.useState(false);
  const onMouseAction = () => {
    setOnFocus(!onFocus);
  };
  return (
    <Grid
      item
      key={tier.title}
      xs={12}
      sm={tier.title === "Entuziast" ? 12 : 6}
      md={4}
    >
      <Card
        onMouseOver={onMouseAction}
        onMouseOut={onMouseAction}
        raised={onFocus}
        style={{
          borderRadius: 35,
          borderStyle: "solid",
          borderColor: colors.alb,
        }}
        elevation={onFocus ? 10 : 0}
        variant={onFocus ? "elevation" : "outlined"}
      >
        <CardActionArea>
          <div
            style={{
              display: "flex",
              alignItem: "center",
              justifyContent: "center",
            }}
          >
            <CardMedia
              style={{
                width: "auto",
                maxHeight: "140px",
              }}
              component="img"
              image={tier.image}
              //title="Contemplative Reptile"
            />
          </div>
          <CardContent
            style={
              {
                //backgroundImage:`linear-gradient(45deg, ${colors.mov} 5%, ${colors.violetDeschis} 90%)`,
                //backgroundColor:colors.portocaliu
              }
            }
          >
            <div className={classes.cardPricing}>
              <Typography
                component="h4"
                variant="h5"
                color="textPrimary"
                gutterBottom
              >
                <Box fontWeight="fontWeightBold" m={1} align="center">
                  {tier.title}
                </Box>
              </Typography>
            </div>
            <ul>
              {tier.description.map((line) => (
                <Typography
                  component="h5"
                  variant="h6"
                  align="center"
                  key={line}
                >
                  <Box fontWeight="fontWeightLight" m={1}>
                    {line}
                  </Box>
                </Typography>
              ))}
            </ul>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{
            justifyContent: "center",
            //backgroundColor: colors.portocaliu
            //backgroundImage:`linear-gradient(45deg, ${colors.mov} 30%, ${colors.violetDeschis} 90%)`,
          }}
        >
          {tier.isLocked == null || tier.isLocked === false ? (
            <Button
              onMouseOver={onMouseAction}
              onMouseOut={onMouseAction}
              variant={onFocus ? "contained" : "outlined"}
              color="primary"
              component={Link}
              to={tier.link}
              style={{
                borderRadius: 20,
              }}
            >
              {tier.buttonText}
            </Button>
          ) : (
            <IconButton disabled>
              <LockOutlinedIcon color="secondary"/>
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
