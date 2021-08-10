import React from "react";
import { Grid, Button, makeStyles, Typography } from "@material-ui/core";
import { WhiteTextTypography } from "./Util";

const lines = [
  "Icar Academy SRL este unicul operator al acestui site.",
  "Aceasta pagina are rolul de a informa in legatura cu politica noastra de colectare si folosire a datelor cu caracter personal.",
  "Folosim aceste date cu unicul rol de a oferi utilizatorilor un serviciu impecabil; niciodata nu vom vinde sau folosi in scop comercial aceste date (promitem).",
  "Prin navigarea pe site si inregistrarea unui cont sunteti de acord cu termenii si conditiile noastre.",
  "In general, prin simpla vizitare a unor site-uri, automat puneti la dispozitie date despre dumneavoastra, cum ar fi: adresa IP, data si ora vizitei, sistemul de operare al computerului sau browser-ul de pe care intrati. Noi colectam aceste servicii automat.",
  "Continuand paralela cu majoritatea site-urilor, folosim module de tip cookie. Acestea nu sunt nimic altceva decat un mic fisier text trimis de catre server catre navigator de fiecare data cand acceseaza acel server. De exemplu, fara module cookie ar trebui sa va autentificati din nou mereu cand accesati alta pagina din cadrul oricarui site.",
  "Acest website foloseste cookie-uri strict necesare. Pentru inceput, folosim autentificarea pe baza de token-uri; in limba romana asta inseamna ca stocam un sir de caractere in browser-ul dumneavoastra pentru a verifica ca sunteti autentificat de fiecare data cand e nevoie. In continuare, folosim cookie-uri pentru securitate, care sa protejeze datele de acces neautorizat",
  "Alte module cookie care nu ne apartin si pe care le folosim sunt cele de la Google Fonts (Google va descarca fisiere pentru font-urile utilizate de noi in browser-ul dumneavoastra si vor fi actualizate la nevoie. Acestea raman in browser dupa vizita pe oricare site care le utilizeaza, asa ca sunt sanse mari sa le aveti deja stocate.) si cele de la Stripe (aplicatia prin care procesam plati; cu toate ca este foarte sigura si folosita, va invitam sa cititi politica lor la adresa: 'https://stripe.com/cookies-policy/legal'.)",
  "De asemenea, colectam date necesare, cum ar fi numele contului, adresa de email sau momentul in care un cont a fost creat sau folosit. Parolele nu sunt stocate in text citibil; folosim algoritmul PBKDF2 cu hash-ul SHA256 pentru a le cripta (nici macar noi nu le putem citi vreodata). Aceasta modalitate se asigura ca este aproape imposibil ca cineva sa intre in posesia parolei dumneavoastra.",
  "In continuare, colectam date anonime despre timpul de vizionare al fiecarei lectii, pentru a intelege mai bine ce doresc utilizatorii nostri.",
  "Nu credem ca mai e nevoie sa spunem, dar continutul cursurilor ne apartine in totalitate, iar orice incercare de copiere, descarcare sau imprumut fara acordul nostru constituie o infractiune conform codului penal.",
  "Pentru orice intrebare sau reclamatie va rugam sa ne scrieti un email la adresa: icaracademyro@gmail.com",
];

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    backgroundColor: "white",
    marginTop: 20,
  },
  text: {
    marginLeft: 16,
    marginTop: 18,
  },
}));

export default function PaginaDezabonare() {
  const classes = useStyles();
  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
      
    >
        <Grid item xs={8} className={classes.mainGrid}>
      <Typography className={classes.text} component="h5" variant="h6">
        Termeni si conditii
      </Typography>
      {lines.map((line) => (
        <Typography
          className={classes.text}
          component="h6"
          variant={window.innerWidth <= 768 ? "subtitle2" : "subtitle1"}
          gutterBottom
        >
          {line}
        </Typography>
      ))}
      </Grid>
    </Grid>
  );
}
