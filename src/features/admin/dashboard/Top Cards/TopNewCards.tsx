import { Grid, Link, Paper, Typography } from "@mui/material";
import * as React from "react";
import Counter from "../../../../ui/Counter/Counter";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";

const ArrowAnimStyle = {
  color: "#fff",
  transition: "0.7s ease-in-out",
  "&:hover": {
    transform: "translate(5px,-5px)",
  },
};

const GridCardStyle = {
  p: 2.5,
  borderRadius: 2,
  transition: "0.8s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
};

const DetailsTypo = styled(Typography)({
  fontSize: 40,
  fontWeight: 800,
  textAlign: "left",
  color: "#ffffff",
  fontFamily: "inherit",
});

const TypoValue = styled(Typography)({
  color: "#ffffff",
  fontSize: 20,
});

interface ITopNewCardsProps {}

const TopNewCards: React.FunctionComponent<ITopNewCardsProps> = (props) => {
  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        sx={{ py: 2, mt: 2 }}
      >
        {/* -----------------------------------------------------------Total Packages */}
        <Grid item xs={12} sm={6} md={3}>
          <Grid
            sx={{
              ...GridCardStyle,
              background: "linear-gradient(#ed68ff, #be0ee1)",
            }}
          >
            <Grid container justifyContent="space-between">
              {/* Values */}
              <Grid item>
                <DetailsTypo>
                  <Counter end={40} />
                </DetailsTypo>
                <TypoValue>Total Packages</TypoValue>
              </Grid>
              {/* page link Arrow */}
              <NavLink to="/blogs">
                <Grid item sx={ArrowAnimStyle}>
                  <ArrowOutwardRoundedIcon fontSize="large" />
                </Grid>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>

        {/* -----------------------------------------------------------Total Tours */}
        <Grid item xs={12} sm={6} md={3}>
          <Grid
            sx={{
              ...GridCardStyle,
              background: "linear-gradient(#4eda89, #1a9f53)",
            }}
          >
            <Grid container justifyContent="space-between">
              {/* Values */}
              <Grid item>
                <DetailsTypo>
                  <Counter end={13} />
                </DetailsTypo>
                <TypoValue>Total Tours</TypoValue>
              </Grid>
              {/* page link Arrow */}
              <NavLink to="/pravas">
                <Grid item sx={ArrowAnimStyle}>
                  <ArrowOutwardRoundedIcon fontSize="large" />
                </Grid>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>

        {/* --------------------------------------------------------------Ongoing */}
        <Grid item xs={12} sm={6} md={3}>
          <Grid
            sx={{
              ...GridCardStyle,
              background: "linear-gradient(#64b3f6, #2b77e5)",
            }}
          >
            <Grid container justifyContent="space-between">
              {/* Values */}
              <Grid item>
                <DetailsTypo>
                  <Counter end={8} />
                </DetailsTypo>
                <TypoValue>Ongoing</TypoValue>
              </Grid>
              {/* page link Arrow */}
              <Link href="#" sx={{ textDecoration: "none" }}>
                <Grid item sx={ArrowAnimStyle}>
                  <ArrowOutwardRoundedIcon fontSize="large" />
                </Grid>
              </Link>
            </Grid>
          </Grid>
        </Grid>

        {/* -----------------------------------------------------------Upcoming */}
        <Grid item xs={12} sm={6} md={3}>
          <Grid
            sx={{
              ...GridCardStyle,
              background: "linear-gradient(#ff6179, #f11133)",
            }}
          >
            <Grid container justifyContent="space-between">
              {/* Values */}
              <Grid item>
                <DetailsTypo>
                  <Counter end={5} />
                </DetailsTypo>
                <TypoValue>Upcoming</TypoValue>
              </Grid>
              {/* page link Arrow */}
              <Link href="#" sx={{ textDecoration: "none" }}>
                <Grid item sx={ArrowAnimStyle}>
                  <ArrowOutwardRoundedIcon fontSize="large" />
                </Grid>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TopNewCards;
