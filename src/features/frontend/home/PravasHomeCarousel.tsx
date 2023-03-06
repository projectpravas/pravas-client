import { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import Container from "@mui/material/Container";
import TourService from "../../../services/TourService";
import { Outlet, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import PravasCardList from "../pravas/PravasCardList";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Blogs from "../blogs/Blogs";
interface IPravasHomeCarouselProps {}

const options = {
  lazyLoad: true,
  loop: true,
  autoplay: true,
  autoplayHoverPause: true,
  margin: 30,
  responsiveClass: true,
  nav: false,
  dots: false,
  smartSpeed: 1000,
  autoplayTimeout: 2500,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 1,
    },
    600: {
      items: 2,
    },
    700: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
};

const seeMore = {
  // fontSize: "0.8em",
  backgroundColor: "#2c5799",
  color: "#fff",
  fontWeight: 400,
  height: "35px",
  padding: "1px 6px",
  letterSpacing: "1.3px",
  borderRadius: "8px",
  border: "2px solid #2c5799",
  "&:hover": {
    color: "#2c5799",
    backgroundColor: "#fff",
    border: "2px solid #2c5799",
    transition: "0.2s",
  },
};
const PravasHomeCarousel: React.FunctionComponent<
  IPravasHomeCarouselProps
> = () => {
  const navigate = useNavigate();
  const [allPackageCardData, setAllPackageCardData] = useState<Array<any>>([]);

  const loadPackageData = () => {
    TourService.fetchAllTours().then((response) => {
      let packages = response?.data?.data;
      setAllPackageCardData(packages);
    });
  };

  useEffect(() => {
    loadPackageData();
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleNavigateChange = () => {
    navigate("/pravas");
  };
  return (
    <>
      <Container>
        <Grid container>
          <Grid item sm={9}>
            <Typography
              sx={{ fontWeight: 800, fontSize: "1.5em", paddingLeft: "2%" }}
            >
              Explore to destination
            </Typography>
            <Typography
              sx={{
                color: "#90929b",
                paddingLeft: "2%",
                paddingRight: { xs: "0", md: "24%" },
              }}
            >
              There's a sunrise and a sunset every single day, and they are
              absolutely free. Don't miss so many of them.
            </Typography>
          </Grid>

          <Grid
            item
            sm={3}
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              paddingRight: { sm: "2%" },
              paddingLeft: { xs: "2%" },
              paddingTop: { xs: "1%" },
              alignItems: "center",
            }}
          >
            <Button size="small" sx={seeMore} onClick={handleNavigateChange}>
              View all
            </Button>
          </Grid>
        </Grid>
        <OwlCarousel
          className="owl-theme owl-carousel owl-nav-pravas "
          {...options}
        >
          <PravasCardList />
        </OwlCarousel>
        <Outlet />
      </Container>
    </>
  );
};

export default PravasHomeCarousel;
