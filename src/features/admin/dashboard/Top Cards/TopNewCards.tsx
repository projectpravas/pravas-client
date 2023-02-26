import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Counter from "../../../../ui/Counter/Counter";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";
import TourService from "../../../../services/TourService";
import TourModel from "../../../../shared/models/tourModel";

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
  const [totalPackages, setTotalPackages] = React.useState(0);
  const [totalTours, setTotalTours] = React.useState(0);
  const [ongoing, setOngoing] = React.useState(0);
  const [upcoming, setUpcoming] = React.useState(0);

  const getTourStatus = (allTours: Array<TourModel>) => {
    const ongoingTours: Array<TourModel> = [];
    const upcomingTours: Array<TourModel> = [];

    const today = new Intl.DateTimeFormat("en-US").format(new Date(Date.now()));

    allTours.filter((tour: TourModel) => {
      const days = tour?.duration?.days ? tour?.duration?.days : 0;

      const startDate = tour?.tourDate
        ? new Intl.DateTimeFormat("en-US").format(new Date(`${tour?.tourDate}`))
        : today;

      const lastDate = startDate
        ? new Intl.DateTimeFormat("en-US").format(
            new Date(
              new Date(startDate).setDate(
                new Date(startDate).getDate() + Number(days)
              )
            )
          )
        : today;

      //ongoing
      if (startDate <= today && lastDate >= today) ongoingTours.push(tour);

      //upcoming
      if (startDate > today) upcomingTours.push(tour);
    });
    return { ongoingTours, upcomingTours };
  };

  React.useEffect(() => {
    TourService.fetchAllTours()
      .then((res) => {
        const response = res?.data?.data;

        const allPackages = response?.filter(
          (p: TourModel) => p?.category == "package"
        );
        const allTours = response?.filter(
          (p: TourModel) => p?.category == "tour"
        );

        const { ongoingTours, upcomingTours } = getTourStatus(allTours);

        setTotalPackages(allPackages?.length);
        setTotalTours(allTours?.length);
        setOngoing(ongoingTours?.length);
        setUpcoming(upcomingTours?.length);
      })
      .catch((err) => {
        console.error(err);
      });

    // TourService.fetchAllTours(`?category=tour`)
    //   .then((res) => {
    //     setTotalTours(res?.data?.data?.length);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }, [totalPackages, totalTours]);

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
              background: "linear-gradient(#fa8158, #ff5d26)",
            }}
          >
            <Grid container justifyContent="space-between">
              {/* Values */}
              <Grid item>
                <DetailsTypo>
                  <Counter end={totalPackages} />
                </DetailsTypo>
                <TypoValue>Total Packages</TypoValue>
              </Grid>
              {/* page link Arrow */}
              <NavLink to="/secured/pravas/packages">
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
              background: "linear-gradient(#ffa63c, #e97f00)",
            }}
          >
            <Grid container justifyContent="space-between">
              {/* Values */}
              <Grid item>
                <DetailsTypo>
                  <Counter end={totalTours} />
                </DetailsTypo>
                <TypoValue>Total Tours</TypoValue>
              </Grid>
              {/* page link Arrow */}
              <NavLink to="/secured/pravas/tours">
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
              background: "linear-gradient(#ffd246, #ffac00)",
            }}
          >
            <Grid container justifyContent="space-between">
              {/* Values */}
              <Grid item>
                <DetailsTypo>
                  <Counter end={ongoing} />
                </DetailsTypo>
                <TypoValue>Ongoing</TypoValue>
              </Grid>
              {/* page link Arrow */}
              <NavLink to="/secured/pravas/tours">
                <Grid item sx={ArrowAnimStyle}>
                  <ArrowOutwardRoundedIcon fontSize="large" />
                </Grid>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>

        {/* -----------------------------------------------------------Upcoming */}
        <Grid item xs={12} sm={6} md={3}>
          <Grid
            sx={{
              ...GridCardStyle,
              background: "linear-gradient(#9ac900, #5ca900)",
            }}
          >
            <Grid container justifyContent="space-between">
              {/* Values */}
              <Grid item>
                <DetailsTypo>
                  <Counter end={upcoming} />
                </DetailsTypo>
                <TypoValue>Upcoming</TypoValue>
              </Grid>
              {/* page link Arrow */}
              <NavLink to="/secured/pravas/tours">
                <Grid item sx={ArrowAnimStyle}>
                  <ArrowOutwardRoundedIcon fontSize="large" />
                </Grid>
              </NavLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TopNewCards;
