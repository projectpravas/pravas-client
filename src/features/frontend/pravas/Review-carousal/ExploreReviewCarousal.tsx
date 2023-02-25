import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Typography,
} from "@mui/material";
import * as React from "react";
import OwlCarousel from "react-owl-carousel";
// import "./ReviewOwlCarousal.module.css";

const options = {
  lazyLoad: true,
  loop: true,
  autoplay: true,
  autoplayHoverPause: true,
  margin: 20,
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
      items: 4,
    },
  },
};

interface Feedbacks {
  pravasiId?: string;
  name?: string;
  rating?: number;
  liked?: Boolean;
  comment?: string;
  date?: Date;
}

interface IExploreReviewCarousalProps {
  data: Feedbacks;
}

const ExploreReviewCarousal: React.FunctionComponent<
  IExploreReviewCarousalProps
> = ({ data }) => {
  function stringAvatar(name: string) {
    return {
      children: `${name?.split(" ")[0][0]}${name?.split(" ")[1][0]}`,
    };
  }
  //   console.log("data ;", data);

  return (
    <>
      <OwlCarousel
        className="owl-review-nav"
        {...options}
        autoPlay={true}
        style={{ maxWidth: "95%" }}
      >
        {Array.isArray(data) &&
          data?.map((v, i: number) => {
            return (
              <Card>
                <CardHeader
                  avatar={
                    <Avatar
                      {...stringAvatar(`${v?.name ? v?.name : "No Name"}`)}
                    />
                  }
                  title={
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 18,
                        color: "#444",
                        fontFamily: "Open sans",
                      }}
                    >
                      {v?.name ? v?.name : "No Name"}
                    </Typography>
                  }
                  subheader={
                    <>
                      <Typography
                        sx={{ color: "#444", opacity: ".5", fontSize: "12px" }}
                      >
                        {v?.date ? v?.date : "September 14, 2016"}
                      </Typography>
                      <Rating
                        name="half-rating-read"
                        defaultValue={v?.rating}
                        precision={1}
                        readOnly
                      />
                    </>
                  }
                  // action={
                  //   <CardMedia
                  //     component="img"
                  //     style={{
                  //       width: "25px",
                  //       margin: "10px 20px 0 0",
                  //     }}
                  //     image="https://cdn.trustindex.io/assets/platform/Google/icon.svg"
                  //     alt="Paella dish"
                  //   />
                  // }
                />
                <CardContent>
                  <Typography
                    sx={{
                      lineHeight: "16px",
                      fontSize: "13px",
                      fontStyle: "normal",
                    }}
                  >
                    {v?.comment ? v?.comment : "No Comment"}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
      </OwlCarousel>
    </>
  );
};

export default ExploreReviewCarousal;
