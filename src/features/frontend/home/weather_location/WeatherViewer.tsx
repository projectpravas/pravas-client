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
          <Typography>
            {cityData.EnglishName}
            {cityData.Country.EnglishName}
          </Typography>
          <Box>
            <Box>
              <Typography>
                {Math.ceil(wData?.Temperature?.Metric?.Value)}
              </Typography>
              <Typography>&deg;{wData?.Temperature?.Metric?.Unit}</Typography>
            </Box>
            {wData.IsDayTime === true && <img src={wData?.sun} alt="sun" />}
            {wData.IsDayTime === false && <img src={wData?.moon} alt="moon" />}
            <Typography>{wData?.WeatherText}</Typography>
          </Box>
        </Grid>
      )}
    </React.Suspense>
  );
};

export default WeatherViewer;
