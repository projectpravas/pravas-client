import * as React from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Suspense } from "react";

interface IWeatherViewerProps {
  cityData: any;
}

const WeatherViewer: React.FunctionComponent<IWeatherViewerProps> = ({
  cityData,
}) => {
  const [wData, setWData] = React.useState<any>({
    Temperature: "",
    Metric: "",
    sun: "",
    moon: "",
  });
  console.log("cityData:", cityData);

  React.useEffect(() => {
    axios
      .get(
        `http://dataservice.accuweather.com/currentconditions/v1/${cityData.Key}?apikey=pPD8gBuj7Ve6GcAmZyAMO5DKHoy7f7ps`
      )
      .then((response) => {
        setWData(response.data[0]);
        console.log("dataTwo:", response.data);
      });
  }, [cityData.Key]);

  return (
    <React.Suspense fallback="loading...">
      {wData && (
        <Grid
          sx={{ maxWidth: "356px", border: "1px solid black", height: "356px" }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <Typography>
                <b>City- </b>
                {cityData.EnglishName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                <b>Country- </b>
                {cityData.Country.EnglishName}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            container
            sx={{ d: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Grid item lg={3}>
              <Typography
                sx={{ margin: "20px", fontSize: "2.5rem", fontWeight: 800 }}
              >
                {Math.ceil(wData?.Temperature?.Metric?.Value)}
                <span>&deg;{wData?.Temperature?.Metric?.Unit}</span>
              </Typography>
            </Grid>
            <Grid item lg={9}>
              {wData.IsDayTime === true && (
                <img src={"/sun-img.png"} alt="sun" style={{ width: "100%" }} />
              )}
              {wData.IsDayTime === false && (
                <img
                  src={"/moon-img.png"}
                  alt="moon"
                  style={{ width: "100%" }}
                />
              )}
            </Grid>
          </Grid>
          <Typography>{wData?.WeatherText}</Typography>
        </Grid>
      )}
    </React.Suspense>
  );
};

export default WeatherViewer;
