import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import * as React from "react";
import FeelFreeToContact from "./FeelFreeToContact";
import OfficeLocations from "./OfficeLocations";

interface IContactUsProps {}

const ContactUs: React.FunctionComponent<IContactUsProps> = (props) => {
  return (
    <>
      <h2>Contact Us</h2>
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
    </>
  );
};

export default ContactUs;
