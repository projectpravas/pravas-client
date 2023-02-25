import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import TourService from "../../../services/TourService";
import { Helmet } from "react-helmet-async";
import LoginCard from "./LoginCard";
import { Paper } from "@mui/material";

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
    <>
      <Helmet>
        <title>Login To Pravas Tourism</title>
        <meta name="description" content="Login to Pravas Tourism" />
        <meta name="keywords" content="Login to Pravas Tourism" />
        <link rel="canonical" href="/login" />
      </Helmet>
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
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={1}
            square
          >
            <LoginCard />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
export default Login;
