import React, { useEffect } from "react";
import { Grid, Container } from "@material-ui/core";
import { tokenizeTitle } from "../Util";
import CardWithButton from "../CardWithButton";
import AnimatedCard from "../Animations/AnimatedCard";

const Courses = () => {
  const [tiers, setTiers] = React.useState([]);
  useEffect(() => {
    const fct = async () => {
      const response = await fetch("courses/api/getcourses/");
      const data = await response.json();

      const nume = [];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          nume.unshift(data[key].name);
        }
      }

      //fac tiers pentru fiecare nume de curs
      var lista = [];
      for (var i = 0; i < nume.length; i++) {
        var obj = {};
        obj.title = tokenizeTitle(nume[i]);
        obj.description = [];
        obj.buttonText = "Acceseaza";
        obj.link = "/courses/" + nume[i];
        //obj.image="/static/images/carte_vector.png"
        lista.push(obj);
      }
      setTiers(lista);
    };

    fct();
  }, []);

  const margin = window.innerWidth <= 768 ? "70px" : "0px";

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "50vh", marginTop: margin }}
    >
      <Container maxWidth="lg" component="main">
        <Grid container justifyContent="center">
          {tiers.map((tier) => (
            <AnimatedCard {...tier} />
          ))}
        </Grid>
      </Container>
    </Grid>
  );
};
export default Courses;
