import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
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

  return (
    <>
      <OwlCarousel
        className="owl-review-nav"
        {...options}
        autoPlay={true}
        style={{ height: 160 }}
      >
        {Array.isArray(data) &&
          data
            ?.filter((v, i) => v?.approved == "true")
            .map((v, i: number) => {
              // const func = (dateObj: Date) => {
              //   let month = dateObj.getMonth() + 1;
              //   let year = dateObj.getFullYear();
              //   let date = dateObj.getDate();

              //   return `${date}/${month}/${year}`;
              // };
              return (
                <Card sx={{ backgroundColor: "#f5f2ed", borderRadius: 2 }}>
                  <CardHeader
                    // avatar={
                    //   <Avatar
                    //     sx={{ bgcolor: green[500] }}
                    //     {...stringAvatar(
                    //       `${v?.name ? v?.name?.toUpperCase() : "No Name"}`
                    //     )}
                    //   />
                    // }
                    title={
                      <>
                        <Rating
                          size="small"
                          name="half-rating-read"
                          defaultValue={v?.rating}
                          precision={0.1}
                          readOnly
                        />
                        <Typography
                          sx={{
                            fontFamily: "inherit",
                            fontWeight: 700,
                            fontSize: 16,
                            color: "#444",
                          }}
                        >
                          {v?.name
                            ? v?.name?.charAt(0).toUpperCase() +
                              v?.name?.slice(1)
                            : "No Name"}
                        </Typography>
                      </>
                    }
                    subheader={
                      <>
                        <Typography sx={{ color: "#979797", fontSize: "12px" }}>
                          {v?.date ? v?.date : "September 14, 2016"}
                        </Typography>
                      </>
                    }
                  />
                  <CardContent>
                    <Typography
                      sx={{
                        lineHeight: "16px",
                        fontSize: "13px",
                        fontFamily: "inherit",
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
