import { Grid, Link, Paper, Typography } from "@mui/material";
import * as React from "react";
import Counter from "../../../../ui/Counter/Counter";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";
import BlogService from "../../../../services/BlogService";

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
};

const DetailsTypo = styled(Typography)({
  fontSize: 26,
  fontWeight: 700,
  textAlign: "left",
  color: "#ffffff",
  fontFamily: "inherit",
});

const TypoValue = styled(Typography)({
  color: "#ffffff",
  fontSize: 15,
});
interface ITotalBlogsNewProps {}

const TotalBlogsNew: React.FunctionComponent<ITotalBlogsNewProps> = (props) => {
  const [totalBlogs, setTotalBlogs] = React.useState(0);

  React.useEffect(() => {
    BlogService.fetchAllBlogs()
      .then((res) => {
        setTotalBlogs(res?.data?.data?.length);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [totalBlogs]);
  return (
    <>
      <Grid container spacing={2} justifyContent="space-between" sx={{ py: 2 }}>
        {/* -----------------------------------------------------------Total Blogs */}
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
                  <Counter end={totalBlogs} />
                </DetailsTypo>
                <TypoValue>Total Blogs</TypoValue>
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

        {/* --------------------------------------------------------------Wishlist */}
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
                <TypoValue>Wishlist</TypoValue>
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

        {/* -----------------------------------------------------------Rating */}
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
                <TypoValue>Rating</TypoValue>
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

export default TotalBlogsNew;
