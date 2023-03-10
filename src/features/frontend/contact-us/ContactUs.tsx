import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import * as React from "react";
import FeelFreeToContact from "./FeelFreeToContact";
import OfficeLocations from "./OfficeLocations";
import MapLocation from "./MapLocation";
import { Helmet } from "react-helmet-async";

interface IContactUsProps {}

const ContactUs: React.FunctionComponent<IContactUsProps> = (props) => {
  return (
    <>
      <Helmet>
        <title>Contact Pravas</title>
        <meta name="description" content="Pravas Tourism Contact-us" />
        <meta name="keywords" content="Pravas Tourism Contact-us" />
        <link rel="canonical" href="/contact-us" />
      </Helmet>
      <Container>
        <Grid container spacing={5}>
          <Grid item sx={{ mt: 10 }}>
            <FeelFreeToContact />
          </Grid>
          <Grid item sx={{ mt: 10 }}>
            <OfficeLocations />
          </Grid>
        </Grid>
      </Container>
      <Grid sx={{ m: 5 }}>
        <MapLocation />
      </Grid>
    </>
  );
};

export default ContactUs;
