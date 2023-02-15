import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import NativeSelect from "@mui/material/NativeSelect";
import SearchIcon from "@mui/icons-material/Search";
import TourService from "../../../services/TourService";
interface ISearchBarProps {}

const SearchBar: React.FunctionComponent<ISearchBarProps> = (props) => {
  // const data: Array<object> = [
  //   {
  //     id: 1,
  //     name: "Hampi",
  //     desc: "Hampi (Hampe) is a village and temple town recognized as a UNESCO World Heritage Site,listed as the Group of Monuments at Hampi, in northern Karnataka, India.",
  //     ActivityType: {
  //       type1: "honeyMoon",
  //       type2: "Adventure",
  //       type3: "trek",
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: "Kashmir",
  //     desc: "Kashmir (Hampe) is a village and temple town recognized as a UNESCO World Heritage Site,listed as the Group of Monuments at Hampi, in northern Karnataka, India.",
  //     ActivityType: {
  //       type1: "Adventure",
  //       type2: "trek",
  //     },
  //   },
  //   {
  //     id: 3,
  //     name: "Kerela",
  //     desc: "Kerela (Hampe) is a village and temple town recognized as a UNESCO World Heritage Site,listed as the Group of Monuments at Hampi, in northern Karnataka, India.",
  //     ActivityType: {
  //       type1: "Group",
  //     },
  //   },
  // ];

  // const [age, setAge] = React.useState("");
  const [tours, setTours] = React.useState<Array<any>>([]);

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);
  // };

  // const loadTours = () => {
  //   setTours([...tours, ...data]);
  // };
  //  console.log("state: ", tours);

  const loadTours = () => {
    TourService.fetchAllTours().then((response) => {
      console.log("tour data api", response.data);
      setTours(response?.data?.data);
    });
  };

  useEffect(() => {
    loadTours();
  }, []);

  console.log("tours: ", tours);

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
        <FormControl sx={{ width: { xs: "100%", md: "30%", lg: "30%" } }}>
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native"
            sx={{
              lineHeight: "1.86em",
              fontWeight: 400,
              letterSpacing: "1px",
              fontSize: "16px",
              color: "#757783",
            }}
          >
            Where are you going?
          </InputLabel>
          <NativeSelect
          //   defaultValue={0}
          // inputProps={{
          //   name: "age",
          //   id: "uncontrolled-native",
          // }}
          >
            <option>-- Destinations --</option>

            {Array.isArray(tours) &&
              tours.map((item, i) => {
                return (
                  <option
                    style={{ textAlign: "left", paddingLeft: "2%" }}
                    key={item?._id}
                  >
                    {item?.title}
                  </option>
                );
              })}
          </NativeSelect>
        </FormControl>

        <FormControl sx={{ width: { xs: "100%", md: "30%", lg: "30%" } }}>
          <InputLabel
            variant="standard"
            htmlFor="uncontrolled-native"
            sx={{
              lineHeight: "1.86em",
              fontWeight: 400,
              letterSpacing: "1px",
              fontSize: "16px",
              color: "#757783",
            }}
          >
            Activity Type
          </InputLabel>
          <NativeSelect
          // defaultValue={0}
          // inputProps={{
          //   name: "age",
          //   id: "uncontrolled-native",
          // }}
          >
            <option value={0}>-- Tour Type --</option>
            <option value={10}>Hampi</option>
            {/* {
            Array.isArray(tours) && tours.map((item, i) => {
             return <option key={item?.ActivityType + i}> {item?.ActivityType?.type1}</option>
              
            }) 
          } */}
          </NativeSelect>
        </FormControl>

        <Stack spacing={2} direction="row" sx={{ position: "relative" }}>
          <Button
            variant="contained"
            sx={{
              width: { xs: "100%", md: "10rem" },
              fontWeight: 600,
              fontSize: "1.1em",
              backgroundColor: "#2c5799",
              letterSpacing: 2,
              padding: {
                xs: "2% 3% 2% 10%",
                sm: "2% 6% 2% 10%",
                md: "2% 8% 2% 20%",
                lg: "2% 8% 2% 20%",
              },
            }}
          >
            Search
          </Button>
          <SearchIcon
            sx={{
              position: "absolute",
              color: "#fff",
              fontSize: "1.2rem",
              stroke: "white",
              strokeWidth: 0,
              top: { xs: "14%", sm: "20%", md: "28%", lg: "28%" },
              left: { xs: "30%", sm: "39%", md: "2.5%", lg: "4%" },
              cursor: "pointer",
            }}
          />
        </Stack>
      </Grid>
    </>
  );
};

export default SearchBar;
