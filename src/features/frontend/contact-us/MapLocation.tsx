import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/system/Container";

interface IMapLocationProps {}

const MapLocation: React.FunctionComponent<IMapLocationProps> = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sx={{ height: 500 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.499046996375!2d73.8295119143907!3d18.50632298407137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07c80c48b91%3A0x9d17bc198fb222cf!2sPravas%20Tourism%20%26%20Pravas%20The%20Journey!5e0!3m2!1sen!2sin!4v1674561304131!5m2!1sen!2sin"
            // width="600"
            // height="450"
            style={{ border: 0, width: "100%", height: "100%" }}
            // allowfullscreen=""
            loading="lazy"
            // referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </Grid>
      </Grid>
    </>
  );
};

export default MapLocation;
