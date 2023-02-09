import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import { ThemeProvider, createTheme } from "@mui/material";

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

interface Props {
  window?: () => Window;
  children: any;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const SecondaryAppbar = (props: any) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <Paper sx={{ position: "relative", width: "100%" }}>
          <Grid
            container
            sx={{
              width: "100vw",
              position: "fixed",
              p: 1,
              ml: -4,
              zIndex: 2,
              backgroundColor: "#e0e0ed",
              boxShadow:
                "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
            }}
          >
            <Grid item>
              <Grid container sx={{ ml: 8 }} columnSpacing={2}>
                <Grid item>item-1</Grid>
                <Grid item>item-2</Grid>
                <Grid item>item-3</Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </HideOnScroll>
    </React.Fragment>
  );
};

export default SecondaryAppbar;
