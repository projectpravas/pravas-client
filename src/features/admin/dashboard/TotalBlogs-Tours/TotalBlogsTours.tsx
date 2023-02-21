import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import * as React from "react";
import Counter from "../../../../ui/Counter/Counter";
import { styled } from "@mui/system";

const DetailsTypo = styled(Typography)({
  fontSize: 30,
  fontWeight: 600,
  textAlign: "left",
  color: "#27488d",
  fontFamily: "inherit",
});

const TypoValue = styled(Typography)({
  marginTop: 0,
  marginBottom: 0,
  color: "#666",
  textAlign: "left",
});

const ImageBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  background: "#f7a707",
});

const ArrowAnimStyle = {
  transition: "0.7s ease-in-out",
  "&:hover": {
    transform: "translate(5px,-5px)",
  },
};

const paperStyle = {
  boxShadow: "0px 0px 3px 0px rgb(0 0 0 / 20%)",
  "&:hover": {
    boxShadow: "0px 25px 50px 0px rgb(0 0 0 / 10%)",
  },
};

interface ITotalBlogsToursProps {}

const TotalBlogsTours: React.FunctionComponent<ITotalBlogsToursProps> = (
  props
) => {
  return (
    <Grid container spacing={2} sx={{ py: 2 }} justifyContent="space-around">
      {/* first */}
      <Grid item xs={12} md={3}>
        <Paper
          sx={{
            p: 1,
            borderRadius: 2,
            boxShadow: "0px 0px 3px 0px rgb(0 0 0 / 20%)",
            "&:hover": {
              boxShadow: "0px 25px 50px 0px rgb(0 0 0 / 10%)",
            },
          }}
        >
          <Grid
            container
            justifyContent="space-evenly"
            columnSpacing={2}
            sx={{ p: 1 }}
          >
            {/* Image Area */}
            <Grid item xs={4}>
              <ImageBox sx={{ borderRadius: 2, p: 3 }}>
                <ListAltRoundedIcon />
              </ImageBox>
            </Grid>
            {/* Details */}
            <Grid item xs={5}>
              <Grid container flexDirection="column">
                <DetailsTypo>
                  <Counter end={40} />
                </DetailsTypo>
                <TypoValue>Total Blogs</TypoValue>
              </Grid>
            </Grid>
            {/* Arrow */}
            <Grid item xs={3} sx={ArrowAnimStyle} alignSelf="center">
              <ArrowOutwardRoundedIcon fontSize="large" />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Second */}
      <Grid item xs={12} md={3}>
        <Paper
          sx={{
            p: 1,
            borderRadius: 2,
            boxShadow: "0px 0px 3px 0px rgb(0 0 0 / 20%)",
            "&:hover": {
              boxShadow: "0px 25px 50px 0px rgb(0 0 0 / 10%)",
            },
          }}
        >
          <Grid
            container
            justifyContent="space-evenly"
            columnSpacing={2}
            sx={{ p: 1 }}
          >
            {/* Image Area */}
            <Grid item xs={4}>
              <ImageBox sx={{ borderRadius: 2, p: 3 }}>
                <ListAltRoundedIcon />
              </ImageBox>
            </Grid>
            {/* Details */}
            <Grid item xs={5}>
              <Grid container flexDirection="column">
                <DetailsTypo>
                  <Counter end={15} />
                </DetailsTypo>
                <TypoValue>Total Tours</TypoValue>
              </Grid>
            </Grid>
            {/* Arrow */}
            <Grid item xs={3} sx={ArrowAnimStyle} alignSelf="center">
              <ArrowOutwardRoundedIcon fontSize="large" />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Third */}
      <Grid item xs={12} md={3}>
        <Paper
          sx={{
            p: 1,
            borderRadius: 2,
            boxShadow: "0px 0px 3px 0px rgb(0 0 0 / 20%)",
            "&:hover": {
              boxShadow: "0px 25px 50px 0px rgb(0 0 0 / 10%)",
            },
          }}
        >
          <Grid
            container
            justifyContent="space-evenly"
            columnSpacing={2}
            sx={{ p: 1 }}
          >
            {/* Image Area */}
            <Grid item xs={4}>
              <ImageBox sx={{ borderRadius: 2, p: 3 }}>
                <ListAltRoundedIcon />
              </ImageBox>
            </Grid>
            {/* Details */}
            <Grid item xs={5}>
              <Grid container flexDirection="column">
                <DetailsTypo>
                  <Counter end={40} />
                </DetailsTypo>
                <TypoValue>Employees</TypoValue>
              </Grid>
            </Grid>
            {/* Arrow */}
            <Grid item xs={3} sx={ArrowAnimStyle} alignSelf="center">
              <ArrowOutwardRoundedIcon fontSize="large" />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Fourth */}
      <Grid item xs={12} md={3}>
        <Paper
          sx={{
            p: 1,
            borderRadius: 2,
            boxShadow: "0px 0px 3px 0px rgb(0 0 0 / 20%)",
            "&:hover": {
              boxShadow: "0px 25px 50px 0px rgb(0 0 0 / 10%)",
            },
          }}
        >
          <Grid
            container
            justifyContent="space-evenly"
            columnSpacing={2}
            sx={{ p: 1 }}
          >
            {/* Image Area */}
            <Grid item xs={4}>
              <ImageBox sx={{ borderRadius: 2, p: 3 }}>
                <ListAltRoundedIcon />
              </ImageBox>
            </Grid>
            {/* Details */}
            <Grid item xs={5}>
              <Grid container flexDirection="column">
                <DetailsTypo>
                  <Counter end={40} />
                </DetailsTypo>
                <TypoValue>Total Blogs</TypoValue>
              </Grid>
            </Grid>
            {/* Arrow */}
            <Grid item xs={3} sx={ArrowAnimStyle} alignSelf="center">
              <ArrowOutwardRoundedIcon fontSize="large" />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TotalBlogsTours;
