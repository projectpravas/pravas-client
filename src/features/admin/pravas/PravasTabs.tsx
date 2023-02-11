import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import { ThemeProvider, createTheme } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PravasList from "./PravasList";
import { useLocation } from "react-router";
import TourService from "../../../services/TourService";
import { errorToast } from "../../../ui/toast/Toast";
import Packages from "../pravas/packages/Packages";
import Tours from "./tours/Tours";
import { Link } from "react-router-dom";

// const customTheme = createTheme({
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 200,
//       md: 400,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

const PravasTabs = (props: any) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Link to="pravas/packages">
          <Tab label="Packages" />
        </Link>
        <Link to="pravas/tours">
          <Tab label="Tours" />
        </Link>
        <Tab label="Item Three" />
      </Tabs>
    </Box>
  );
};

export default PravasTabs;
