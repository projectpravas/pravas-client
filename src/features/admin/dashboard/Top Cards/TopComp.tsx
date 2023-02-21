import * as React from "react";
import Grid from "@mui/material/Grid";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import Counter from "../../../../ui/Counter/Counter";

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
  mt: 1,
  boxShadow: "0px 0px 2px 0px rgb(0 0 0 / 20%)",
  "&:hover": {
    boxShadow: "0px 25px 50px 0px rgb(0 0 0 / 10%)",
  },
};

const CardImageStyle = {
  justifyContent: "center",
  alignItems: "center",
  p: "1.41rem 3.5rem",
  color: "#fff",
  background: "#f7a707",
  borderRadius: 3,
  width: "100%",
  height: 100,
  fontSize: 48,
  transition: "all .5s ease-in-out",
};
interface ITopCompProps {}

const TopComp: React.FunctionComponent<ITopCompProps> = (props) => {
  return (
    <>
      <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
        {/*--------------------------------------------------------- New Bokings */}
        <Grid item xs={12} sm={6} md={2}>
          <Grid
            container
            sx={{
              ...CardWrapperStyle,
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
            <Grid item sx={{ pt: "2.5rem", pb: "1rem" }}>
              <DetailsTypo>
                <Counter end={500} />
              </DetailsTypo>
              <TypoValue>New Bookings</TypoValue>
            </Grid>
          </Grid>
        </Grid>
        {/* ------------------------------------------------------Packages */}
        <Grid item xs={12} sm={6} md={2}>
          <Grid
            container
            sx={{
              ...CardWrapperStyle,
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
            <Grid item sx={{ pt: "2.5rem", pb: "1rem" }}>
              <DetailsTypo>
                <Counter end={13} />
              </DetailsTypo>
              <TypoValue>Packages</TypoValue>
            </Grid>
          </Grid>
        </Grid>
        {/*--------------------------------------------------------- Customers */}
        <Grid item xs={12} sm={6} md={2}>
          <Grid
            container
            sx={{
              ...CardWrapperStyle,
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
            <Grid item sx={{ pt: "2.5rem", pb: "1rem" }}>
              <DetailsTypo>
                <Counter end={55} />
              </DetailsTypo>
              <TypoValue>Customers</TypoValue>
            </Grid>
          </Grid>
        </Grid>
        {/* -----------------------------------------------------------Employees */}
        <Grid item xs={12} sm={6} md={2}>
          <Grid
            container
            sx={{
              ...CardWrapperStyle,
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
            <Grid item sx={{ pt: "2.5rem", pb: "1rem" }}>
              <DetailsTypo>
                <Counter end={4} />
              </DetailsTypo>
              <TypoValue>Total Employees</TypoValue>
            </Grid>
          </Grid>
        </Grid>
        {/* -----------------------------------------------------------Developers */}
        <Grid item xs={12} sm={6} md={2}>
          <Grid
            container
            sx={{
              ...CardWrapperStyle,
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
            <Grid item sx={{ pt: "2.5rem", pb: "1rem" }}>
              <DetailsTypo>
                <Counter end={5} />
              </DetailsTypo>
              <TypoValue>Total Developers</TypoValue>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TopComp;
