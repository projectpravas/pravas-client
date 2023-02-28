import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box, Grid } from "@mui/material";

interface ILocationClickProps {
  items: Array<any>;
}

const LocationClick: React.FunctionComponent<ILocationClickProps> = ({
  items,
}) => {
  console.log(items);

  return (
    <Grid sx={{ display: "flex" }}>
      <Carousel sx={{ width: "700px" }}>
        {items?.map((image, i) => (
          <Box key={i}>
            <img
              style={{ width: "700px", height: "550px" }}
              src={`http://localhost:9999/${image}`}
            />
          </Box>
        ))}
      </Carousel>
    </Grid>
  );
};

export default LocationClick;
