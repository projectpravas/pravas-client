import { Box, Button, Grid } from "@mui/material";
import * as React from "react";
import Lottie from "lottie-react";
import notFoundAnim from "./not-found.json";
import { NavLink } from "react-router-dom";

interface IPageNotFoundProps {}

const PageNotFound: React.FunctionComponent<IPageNotFoundProps> = (props) => {
  return (
    <>
      <Grid
        bgcolor="#276612"
        paddingY={3}
        sx={{ paddingBottom: { xs: 3, md: 6 } }}
      >
        <Grid container flexDirection="column" alignItems="center">
          <Grid item sx={{ width: { xs: "70%", md: "40%" } }}>
            <Lottie loop={true} animationData={notFoundAnim} />
          </Grid>
          <Grid
            item
            sx={{
              color: "#fff",
              fontSize: { xs: 100, md: 155 },
              fontWeight: 700,
              mt: { xs: -4, md: -8 },
            }}
          >
            404
          </Grid>
          <Grid
            item
            sx={{
              color: "#F3D830",
              fontSize: { xs: 26, md: 42 },
              fontWeight: 600,
              mt: -3,
              mb: { xs: -2, md: -1 },
            }}
          >
            Page Not Found
          </Grid>
          <Grid
            item
            sx={{
              color: "#fff",
              fontSize: 20,
              fontWeight: 400,
              textAlign: "center",
              px: { xs: 2, md: 0 },
            }}
          >
            <p style={{ marginBottom: 0 }}>
              The page you are looking for may have been moved,
            </p>
            <p style={{ marginTop: 0 }}> deleted or possibly never existed.</p>
          </Grid>
          <NavLink
            to=""
            style={{
              textDecoration: "none",
            }}
          >
            <Grid item border="2px solid #F3D830" borderRadius={1}>
              <Box
                sx={{
                  fontSize: 16,
                  padding: "15px 30px",
                  color: "#fff",
                  "&:hover": {
                    color: "#276612",
                    backgroundColor: "#F3D830",
                    borderColor: "#FFFFFF",
                    transition: "all .3s",
                  },
                }}
              >
                Go Home
              </Box>
            </Grid>
          </NavLink>
        </Grid>
      </Grid>
    </>
  );
};

export default PageNotFound;

// #276612
