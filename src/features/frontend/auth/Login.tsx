import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import TourService from "../../../services/TourService";
import LoginCard from "./LoginCard";

const theme = createTheme();

const Login = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    TourService.fetchAllTours().then((res) => {
      const arr: any = [];
      const imgs = res?.data?.data?.forEach((v: any, i: any) =>
        arr.push(...v.images)
      );
      setImages(arr);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main">
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(http://localhost:9999/${
              images[Math.floor(Math.random() * images.length)]
            })`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <LoginCard />
      </Grid>
    </ThemeProvider>
  );
};
export default Login;
