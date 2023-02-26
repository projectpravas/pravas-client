import { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import Container from "@mui/material/Container";
import TourService from "../../../services/TourService";
import { Outlet, useNavigate } from "react-router-dom";

import PravasCardList from "../pravas/PravasCardList";
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

  return (
    <>
      <Container>
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
