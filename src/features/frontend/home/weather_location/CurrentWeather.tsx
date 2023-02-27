import * as React from "react";
import axios, { AxiosError } from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Typography } from "@mui/material";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import { useEffect } from "react";
import WeatherViewer from "./WeatherViewer";

interface ICurrentWeatherProps {}

const CurrentWeather: React.FunctionComponent<ICurrentWeatherProps> = (
  props
) => {
  const [citySearch, setCitySearch] = React.useState("");
  const [cityData, setCityData] = React.useState(null);

  const fetchCity = (e: any) => {
    e.preventDefault(e);
    axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=pPD8gBuj7Ve6GcAmZyAMO5DKHoy7f7ps&q=${citySearch}`
      )
      .then((response) => {
        setCitySearch("");
        setCityData(response.data[0]);
      });
  };
  // React.useEffect(() => {}, []);
  // console.log("citySeatch", citySearch);
  return (
    <>
      <Grid maxWidth={356} sx={{ m: "auto" }}>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "auto",
            justifyContent: "center",
          }}
        >
          <TextField
            type="search"
            name="search"
            label="Search"
            placeholder="Search...."
            autoFocus
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
          />

          <Button
            variant="contained"
            sx={{ paddingY: "4%" }}
            onClick={fetchCity}
          >
            Search
          </Button>
        </Grid>

        {cityData && (
          <Grid>
            <WeatherViewer cityData={cityData} />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default CurrentWeather;
