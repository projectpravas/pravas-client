import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Theme, useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import NativeSelect from "@mui/material/NativeSelect";
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

function getStyles(name: string, destination: string[], theme: Theme) {
  return {
    fontWeight:
      destination.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SearchBar: React.FunctionComponent<ISearchBarProps> = (props) => {
  const [allTours, setAllTours] = React.useState<Array<any>>([]);
  const [allActivity, setAllActivity] = React.useState<Array<any>>([]);
  const [destination, setDestionation] = React.useState<string[]>([]);
  const [activity, setActivity] = React.useState<string[]>([]);
  const theme = useTheme();
  const [tours, setTours] = React.useState<object[]>([{}]);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleNavigateChange = (path: string) => {
    navigate(path);
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
        // console.log("item tourtype: ", item?.tourType);
        if (item?.category === "package") {
          for (var i in item?.tourType) {
            // console.log("i---------------->", item?.tourType[i]);
            uniqueTourType.add(item?.tourType[i]);
          }
          // console.log("tour value---------------->", uniqueTourType);
        }
      });
    const ActivityType = [...uniqueTourType];
    setAllActivity(ActivityType);

    // console.log("array-------------------------->", ActivityType);
  };

  useEffect(() => {
    loadAllTours();
  }, []);
  useEffect(() => {
    loadAllTourTypes();
  }, [allTours]);

  const handleDestinationChange = (
    event: SelectChangeEvent<typeof destination>
  ) => {
    const {
      target: { value, name = "tourLocation" },
    } = event;

    let paramValue = searchParams.getAll(name);
    console.log("paramV", paramValue);
    // if (!paramValue?.includes("name")) {
    //   paramValue = paramValue?.split("&") + "_" + value;
    // }
    // setSearchParams({ tourLocation: value });

    // console.log("event", event);

    // let paramValue1 = searchParams.getAll(name);

    // paramValue = paramValue + "_" + value;

    setSearchParams({ ...searchParams, [name]: value });
    setDestionation(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleActivityChange = (event: SelectChangeEvent<typeof activity>) => {
    const {
      target: { value, name = "tourType" },
    } = event;
    // let paramAct = searchParams.get(name);
    // console.log("paramAct", paramAct);

    // setSearchParams(searchParams);
    setActivity(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // const handleFilterChange = (event: any, name: any, value: any) => {
  //   console.log("event fil", event);
  //   let x = destination.map((item) => {
  //     return searchParams.get(item);
  //   });
  //   console.log("paramV", x);
  // };

  // console.log("search", searchParams);
  // ?tourLocation=Leh+Ladakh+8N9D&tourType=Adventure

  // const loadTours = () => {
  //   TourService.fetchAllTours()
  //     .then((res) => {
  //       setTours(res?.data?.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       const msg = err?.response?.data?.message || "Try Again..";
  //       errorToast(msg, 5000);
  //     });
  // };

  // console.log("Activity", activity);
  // console.log("des", destination);
  // console.log("all tours", allTours);

  // console.log("api des", tours);

  // React.useEffect(() => {
  //   loadTours();
  // }, []);

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
          position: "absolute",
          gap: "1rem",
          backgroundColor: "white",
          bottom: { xs: "-85%", sm: "-40%", md: "-10%", lg: "-8%" },
          boxShadow: "0 10px 30px 0 rgba(0,0,0,.05)",
        }}
      >
        <FormControl sx={{ m: 1, width: { xs: "100%", md: "30%", lg: "30%" } }}>
          <InputLabel id="demo-multiple-name-label">Destinations</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={destination}
            onChange={handleDestinationChange}
            // onChange={(e) => setSearchParams({ destination: e?.target?.value })}
            input={<OutlinedInput label="Destionations" />}
            MenuProps={MenuProps}
          >
            {allTours.map((tour, i) => (
              <MenuItem
                key={tour.title + i}
                value={tour?.title}
                style={getStyles(tour, destination, theme)}
                // onChange={(e) =>
                //   setSearchParams({ tourLocation: e?.target?.value })
                // }
              >
                {tour?.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: { xs: "100%", md: "30%", lg: "30%" } }}>
          <InputLabel id="demo-multiple-name-label">Activities</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={activity}
            onChange={handleActivityChange}
            input={<OutlinedInput label="Activities" />}
            MenuProps={MenuProps}
          >
            {allActivity.map((act, i) => (
              <MenuItem
                key={act + i}
                value={act}
                style={getStyles(act, activity, theme)}
                // onChange={(e) => handleFilterChange(e, "tourLocation", act)}
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
          onClick={() => handleNavigateChange("/pravas")}
        >
          Search
        </Button>
      </Grid>
    </>
  );
};

export default SearchBar;
