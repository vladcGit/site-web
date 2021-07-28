import React from "react";
import {Grid} from "@material-ui/core";
import {WhiteTextTypography} from "../Util";

export default function ResetPasswordEmailSent()
{
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{minHeight: "70vh"}}
        >
            <WhiteTextTypography component="h1" variant="h2">
                Mail-ul de verificare a fost trimis.
            </WhiteTextTypography>
            <WhiteTextTypography component="h1" variant="h2">
                Poti inchide pagina.
            </WhiteTextTypography>
        </Grid>
    );
}
