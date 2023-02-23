import { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "../../../ui/owl-carousel/owl.css";
import Container from "@mui/material/Container";
import PravasPackageCard from "../pravas/PravasPackageCard";
import TourService from "../../../services/TourService";
import { useNavigate } from "react-router-dom";
interface IPravasHomeCarouselProps {}

const options = {
  lazyLoad: true,
  loop: true,
  autoplay: false,
  autoplayHoverPause: true,
  margin: 30,
  responsiveClass: true,
  nav: true,
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
      // console.log("loadPackages", response?.data?.data);
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
  // console.log(allPackageCardData);
  return (
    <>
      <Container>
        <OwlCarousel
          className="owl-theme owl-carousel owl-nav-pravas"
          {...options}
        >
          {Array.isArray(allPackageCardData) &&
            allPackageCardData.map((v, i) => {
              return (
                <div
                  onClick={() => {
                    handleNavigation(`/pravas/explore/${v?._id}`);
                  }}
                >
                  <PravasPackageCard key={v?._id + i} {...v} />
                </div>
              );
            })}
        </OwlCarousel>
      </Container>
    </>
  );
};

export default PravasHomeCarousel;
