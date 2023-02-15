import * as React from "react";
import Grid from "@mui/material/Grid";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";

const DetailsTypo = styled(Typography)({
  fontSize: 30,
  fontWeight: 600,
  textAlign: "center",
  color: "#27488d",
  fontFamily: "inherit",
});

const TypoValue = styled(Typography)({
  marginTop: 0,
  marginBottom: 0,
  color: "#666",
  textAlign: "center",
});

const CardWrapperStyle = {
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  p: "1rem",
  borderRadius: 3,
  transition: "all .5s ease-in-out",
};

const CardImageStyle = {
  justifyContent: "center",
  alignItems: "center",
  p: "1.41rem 3.5rem",
  color: "#fff",
  // border: "1px solid #fff",
  borderRadius: 3,
  width: "100%",
  height: 100,
  fontSize: 48,
  transition: "all .5s ease-in-out",
  // boxShadow: "0px 10px 20px 0px rgb(242 85 33 / 30%)",
  background: "#f7a707",
};
interface ITopCompProps {}

const TopComp: React.FunctionComponent<ITopCompProps> = (props) => {
  return (
    <>
      <Grid
        container
        justifyContent="space-evenly"
        spacing={4}
        // sx={{ px: { xs: 0, sm: 3, md: 15 } }}
      >
        {/*--------------------------------------------------------- New Bokings */}
        <Grid item xs={12} sm={6} md={3}>
          <Grid
            container
            sx={{
              ...CardWrapperStyle,
              boxShadow: "0px 2px 5px 0px rgb(0 0 0 / 20%)",
              "&:hover": {
                boxShadow: "0px 25px 50px 0px rgb(0 0 0 / 10%)",
              },
            }}
          >
            {/* Image area */}
            <Grid
              item
              sx={{
                ...CardImageStyle,
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <LibraryAddOutlinedIcon fontSize="inherit" />
              </Box>
            </Grid>
            {/* Details */}
            <Grid item sx={{ pt: "3rem", pb: "1rem" }}>
              <DetailsTypo>80</DetailsTypo>
              <TypoValue>New Bookings</TypoValue>
            </Grid>
          </Grid>
        </Grid>
        {/* ------------------------------------------------------Packages */}
        <Grid item xs={12} sm={6} md={3}>
          <Grid
            container
            sx={{
              ...CardWrapperStyle,
              boxShadow: "0px 2px 5px 0px rgb(0 0 0 / 20%)",
              "&:hover": {
                boxShadow: "0px 25px 50px 0px rgb(0 0 0 / 10%)",
              },
            }}
          >
            {/* Image area */}
            <Grid
              item
              sx={{
                ...CardImageStyle,
              }}
            >
              <Box sx={{ textAlign: "center", alignSelf: "center" }}>
                <CurrencyRupeeIcon fontSize="inherit" />
              </Box>
            </Grid>
            {/* Details */}
            <Grid item sx={{ pt: "3rem", pb: "1rem" }}>
              <DetailsTypo>13</DetailsTypo>
              <TypoValue>Packages</TypoValue>
            </Grid>
          </Grid>
        </Grid>
        {/*--------------------------------------------------------- Customers */}
        <Grid item xs={12} sm={6} md={3}>
          <Grid
            container
            sx={{
              ...CardWrapperStyle,
              boxShadow: "0px 2px 5px 0px rgb(0 0 0 / 20%)",
              "&:hover": {
                boxShadow: "0px 25px 50px 0px rgb(0 0 0 / 10%)",
              },
            }}
          >
            {/* Image area */}
            <Grid
              item
              sx={{
                ...CardImageStyle,
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <EmojiEmotionsOutlinedIcon fontSize="inherit" />
              </Box>
            </Grid>
            {/* Details */}
            <Grid item sx={{ pt: "3rem", pb: "1rem" }}>
              <DetailsTypo>5</DetailsTypo>
              <TypoValue>Customers</TypoValue>
            </Grid>
          </Grid>
        </Grid>
        {/* -----------------------------------------------------------Employees */}
        <Grid item xs={12} sm={6} md={3}>
          <Grid
            container
            sx={{
              ...CardWrapperStyle,
              boxShadow: "0px 2px 5px 0px rgb(0 0 0 / 20%)",
              "&:hover": {
                boxShadow: "0px 25px 50px 0px rgb(0 0 0 / 10%)",
              },
            }}
          >
            {/* Image area */}
            <Grid
              item
              sx={{
                ...CardImageStyle,
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <BadgeOutlinedIcon fontSize="inherit" />
              </Box>
            </Grid>
            {/* Details */}
            <Grid item sx={{ pt: "3rem", pb: "1rem" }}>
              <DetailsTypo>27</DetailsTypo>
              <TypoValue>Total Employees</TypoValue>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TopComp;
