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
  fontWeight: 500,
  fontSize: "1.1em",
  backgroundColor: "#2c5799",
  border: "2px solid #2c5799",
  borderRadius: "8px",
  padding: "0px 20px",
  letterSpacing: 2,
  width: "100%",
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

function getStyles(name: string, filterState: string, theme: Theme) {
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
    tourLocation: "",
    tourType: "",
  });

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

  // console.log("filter State", filterState);
  // console.log("activty state", allActivity);

  // change search params
  const changeSearchParams = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
    // console.log("searchParams", searchParams);
  };

  const navigate = useNavigate();
  const handleClickChange = () => {
    filterState.tourLocation &&
      changeSearchParams("tourLocation", filterState.tourLocation as any);

    filterState.tourType &&
      changeSearchParams("tourType", filterState.tourType as any);

    navigate(`/pravas?${searchParams}`);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFilterState((state) => ({
      ...state,
      [name]: value,
    }));
  };
  // console.log(
  //   "state T",
  //   Array.from(
  //     new Set(
  //       allTours
  //         .filter((item) => item?.category == "package")
  //         .map((obj) => obj?.tourLocation)
  //     )
  //   )
  // );

  // console.log("state A", allActivity);

  const handleResetChange = () => {
    setFilterState({ tourLocation: "", tourType: "" });
  };

  return (
    <>
      <Grid>
        <Grid
          container
          rowSpacing={{ xs: 2, md: 0 }}
          justifyContent={{ xs: "center", md: "space-evenly" }}
          alignItems="center"
          sx={{
            minWidth: 120,
            py: 2,
            borderRadius: "8px",
            backgroundColor: { xs: "white", md: "transparent" },
            boxShadow: "3px 5px 20px 1px rgb(0 0 0 / 23%)",
            backdropFilter: "blur(60px)",
            border: "1px solid #5a5a5a82",
          }}
        >
          {/* Tour Location  */}
          <Grid item xs={12} md={4}>
            <Grid
              container
              justifyContent={{ xs: "center", md: "space-around" }}
            >
              {/* location Icon  */}
              <Grid item xs={2}>
                <Grid sx={{ height: { xs: "34px", md: "35px" } }}>
                  <img
                    style={{ color: "red" }}
                    src="/Destination-icon.svg"
                    width="100%"
                    height="100%"
                    alt=""
                  />
                </Grid>
              </Grid>
              {/* location Input field  */}
              <Grid item xs={9} sx={{ width: "100%" }}>
                <FormControl
                  sx={{
                    width: "100%",
                    m: 0,
                    p: 0,
                    flexDirection: "row",
                  }}
                >
                  <InputLabel size="small" id="tourLocation">
                    Destinations
                  </InputLabel>
                  <Select
                    size="small"
                    fullWidth
                    labelId="tourLocation"
                    id="tourLocation"
                    name="tourLocation"
                    // multiple
                    value={filterState?.tourLocation}
                    onChange={handleChange}
                    input={<OutlinedInput label="Destionations" />}
                    MenuProps={MenuProps}
                  >
                    <MenuItem value="all">All Destinaions</MenuItem>
                    {/* <MenuItem value="all" onClick={handleResetChange}>
                      none
                    </MenuItem> */}
                    {Array.from(
                      new Set(
                        allTours
                          ?.filter((item) => item?.category == "package")
                          ?.map((obj) => obj?.tourLocation)
                      )
                    ).map((location, i) => (
                      <MenuItem
                        key={location + i}
                        value={location}
                        style={getStyles(
                          location,
                          filterState.tourLocation,
                          theme
                        )}
                      >
                        {location}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {/* Tour type */}
          <Grid item xs={12} md={4}>
            <Grid
              container
              justifyContent={{ xs: "center", md: "space-around" }}
            >
              {/* Type Icon  */}
              <Grid item xs={2}>
                <Grid sx={{ height: { xs: "34px", md: "35px" } }}>
                  <img src="/Tour-type.svg" width="100%" height="100%" alt="" />
                </Grid>
              </Grid>
              {/* Type Input Field  */}
              <Grid item xs={9} sx={{ width: "100%" }}>
                <FormControl
                  sx={{
                    width: "100%",
                    m: 0,
                    p: 0,
                    flexDirection: "row",
                  }}
                >
                  <InputLabel size="small" id="tourType">
                    Activities
                  </InputLabel>
                  <Select
                    fullWidth
                    size="small"
                    labelId="tourType"
                    id="tourType"
                    name="tourType"
                    // multiple
                    // value={filterState.tourType}
                    onChange={handleChange}
                    input={<OutlinedInput label="Activities" />}
                    MenuProps={MenuProps}
                  >
                    <MenuItem value="all">All Activities</MenuItem>
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
              </Grid>
            </Grid>
          </Grid>

          {/* Button  */}
          <Grid item xs={4} md={2} sx={{ justifyContent: "space-around" }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<SearchIcon />}
              sx={{ ...searchButton, maxWidth: "150px" }}
              onClick={() => handleClickChange()}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SearchBar;
