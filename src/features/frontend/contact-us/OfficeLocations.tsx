import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Link from "@mui/material/Link";

interface IOfficeLocationsProps {}

const OfficeLocations: React.FunctionComponent<IOfficeLocationsProps> = (
  props
) => {
  return (
    <>
      <Container>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid item xs={12} md={6}>
            <Link
              sx={{
                textDecoration: "none",
                alignSelf: "center",
              }}
              href="https://goo.gl/maps/TwT4cLw2EPX9ePq88"
              target="_blank"
            >
              <Grid
                sx={{
                  backgroundColor: "#2b5799",
                  p: 5,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "center" },
                  borderRadius: 2,
                }}
              >
                <Grid item xs={12} md={2}>
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      cursor: "pointer",
                      bgcolor: "#f39100",
                      "&:hover": {
                        bgcolor: "#e8604c",
                      },
                    }}
                  >
                    <LocationOnOutlinedIcon />
                  </Avatar>
                </Grid>
                <Grid item xs={12} md={10}>
                  <Box
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    Pune
                  </Box>
                  <Box sx={{ color: "#fff" }}>
                    3rd floor, 06 Goodwill house, Above Nisarg Restaurant,
                    Erandwane, Pune 411004.
                  </Box>
                </Grid>
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link
              sx={{
                textDecoration: "none",
                alignSelf: "center",
              }}
              href="https://goo.gl/maps/kgXc15gwEU7UARNo7"
              target="_blank"
            >
              <Grid
                sx={{
                  backgroundColor: "#2b5799",
                  p: 5,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "center" },
                  borderRadius: 2,
                }}
              >
                <Grid item xs={12} md={2}>
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      cursor: "pointer",
                      bgcolor: "#f39100",
                      "&:hover": {
                        bgcolor: "#e8604c",
                      },
                    }}
                  >
                    <LocationOnOutlinedIcon />
                  </Avatar>
                </Grid>
                <Grid item xs={12} md={10}>
                  <Box
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    Kashmir
                  </Box>
                  <Box sx={{ color: "#fff" }}>
                    Khazir Complex, Near Bajaj Paris Automobiles, Srinagar
                    190001.
                  </Box>
                </Grid>
              </Grid>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default OfficeLocations;
