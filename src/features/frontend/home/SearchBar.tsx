import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Theme, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TourService from "../../../services/TourService";
import { errorToast } from "../../../ui/toast/Toast";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const searchButton = {
  fontWeight: 600,
  fontSize: "1.1em",
  backgroundColor: "#2c5799",
  border: "2px solid #2c5799",
  borderRadius: "8px",
  padding: "0px 20px",
  letterSpacing: 2,
  ":hover": {
    backgroundColor: "#fff",
    color: "#2c5799",
    border: "2px solid #2c5799",
  },
};
interface ISearchBarProps {}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, filterState: string[], theme: Theme) {
  return {
    fontWeight:
      filterState.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SearchBar: React.FunctionComponent<ISearchBarProps> = (props) => {
  const [allTours, setAllTours] = React.useState<Array<any>>([]);
  const [allActivity, setAllActivity] = React.useState<Array<any>>([]);
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterState, setFilterState] = React.useState({
    tourLocation: [],
    tourType: [],
  });

  const navigate = useNavigate();
  const handleNavigateChange = () => {
    navigate(`/pravas`);
    // changeSearchParams(key, value);
  };

  const loadAllTours = () => {
    TourService.fetchAllTours().then((response) => {
      setAllTours(response?.data?.data);
    });
  };

  const loadAllTourTypes = () => {
    let uniqueTourType = new Set();

    Array.isArray(allTours) &&
      allTours.map((item) => {
        if (item?.category === "package") {
          for (var i in item?.tourType) {
            uniqueTourType.add(item?.tourType[i]);
          }
        }
      });
    const ActivityType = [...uniqueTourType];
    setAllActivity(ActivityType);
  };

  useEffect(() => {
    loadAllTours();
  }, []);

  useEffect(() => {
    loadAllTourTypes();
  }, [allTours]);

  // change search params

  const changeSearchParams = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
    console.log("searchParams", searchParams);
  };

  const handleClickChange = () => {
    changeSearchParams("tourLocation", filterState.tourLocation as any);
    changeSearchParams("tourType", filterState.tourType as any);

    navigate(`/pravas?${searchParams}`);
  };
  console.log("filter State", filterState);

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFilterState((state) =>
      // On autofill we get a stringified value.
      // typeof value === "string" ? value.split(",") : value,
      ({
        ...state,
        [name]: value,
      })
    );
    // changeSearchParams(name, value);
    // console.log("event fil", event);
    // console.log("name fil", name);
    // console.log("value fil", value);
  };
  // console.log("state T", allTours);
  // console.log("state A", allActivity);

  return (
    <>
      <Grid
        container
        sx={{
          minWidth: 120,
          width: "85%",
          padding: "1.5% 3% 1.5% 3%",
          marginX: "7.5%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          borderRadius: "8px",

          gap: "1rem",
          backgroundColor: "white",

          boxShadow: "0 10px 30px 0 rgba(0,0,0,.05)",
        }}
      >
        <FormControl sx={{ m: 1, width: { xs: "100%", md: "30%", lg: "30%" } }}>
          <InputLabel id="tourLocation">Destinations</InputLabel>
          <Select
            labelId="tourLocation"
            id="tourLocation"
            name="tourLocation"
            // multiple
            value={filterState.tourLocation}
            onChange={handleChange}
            input={<OutlinedInput label="Destionations" />}
            MenuProps={MenuProps}
          >
            <MenuItem value="all">Destinaions</MenuItem>
            {allTours.map((tour, i) => (
              <MenuItem
                key={tour.tourLocation + i}
                value={tour?.tourLocation}
                style={getStyles(tour, filterState.tourLocation, theme)}
              >
                {tour?.tourLocation}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: { xs: "100%", md: "30%", lg: "30%" } }}>
          <InputLabel id="tourType">Activities</InputLabel>
          <Select
            labelId="tourType"
            id="tourType"
            name="tourType"
            // multiple
            value={filterState.tourType}
            onChange={handleChange}
            input={<OutlinedInput label="Activities" />}
            MenuProps={MenuProps}
          >
            <MenuItem value="all">Activities</MenuItem>
            {allActivity.map((act, i) => (
              <MenuItem
                key={act + i}
                value={act}
                style={getStyles(act, filterState.tourType, theme)}
              >
                {act}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          size="small"
          startIcon={<SearchIcon />}
          sx={searchButton}
          onClick={() => handleClickChange()}
        >
          Search
        </Button>
      </Grid>
    </>
  );
};

export default SearchBar;
