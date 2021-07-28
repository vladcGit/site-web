import React, {useState, useEffect} from "react";
import {Button, Grid, Box} from "@material-ui/core/";
import {WhiteTextTypography} from "./Util";
import {Link} from "react-router-dom";

// handler buton de logout
// doar da logout, nu face nimic altceva
function handleLogoutButton()
{
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
        },
    };

    fetch("/api/auth/logout/", requestOptions)
        .then((response) => response.json())
        .then((data) =>
        {
            localStorage.clear();
            window.location.replace("");
        });
}

const Dashboard = () =>
{
    // variabila care retine numele utilizatorului conectat
    // si tipul de abonat
    const [userName, setUserName] = useState("");
    const [userSubscription, setUserSubscription] = useState("");
    const [userMail, setUserMail] = useState("");

    // verifica daca un user e logat
    // si retine email-ul sau

    useEffect(() =>
    {
        if (localStorage.getItem("token") === null)
        {
            window.location.replace("");
        } else
        {
            //get user email
            fetch("/api/auth/user/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
                .then((res) => res.json())
                .then((data) =>
                {
                    setUserName(data.first_name + " " + data.last_name);
                    setUserMail(data.email);
                });

            //get subscription status
            fetch("/subscribe/get_subscription_details/")
                .then((response) => response.json())
                .then((data) =>
                {
                    console.log(data);
                    if (data.hasOwnProperty("Error")) setUserSubscription("Cont gratis");
                    else setUserSubscription(data.subscription);
                });
        }
    }, []);

    return (
        <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justify="center"
            style={{minHeight: "50vh"}}
        >
            <Grid item xs={12} align="center">
                <WhiteTextTypography variant="h4" component="h4">
                    Salut, {userName}!
                </WhiteTextTypography>
                <WhiteTextTypography variant="h4" component="h4">
                    {userSubscription === "active" ? "Abonament activ" : "Cont gratuit"}
                </WhiteTextTypography>
            </Grid>
            <Grid container align="center" direction="column" spacing={10}>
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleLogoutButton()}
                    >
                        Logout
                    </Button>
                </Grid>
                <Box display={userSubscription === "active" ? "inline" : "none"}>
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/unsubscribe"
                    >
                        Anulare abonament
                    </Button>
                </Box>
                <Box display={userSubscription !== "active" ? "inline" : "none"}>
                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/pricing"
                    >
                        Aboneaza-te
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
