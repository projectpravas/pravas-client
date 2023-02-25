import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OwlCarousel from "react-owl-carousel";
import "../../../ui/owl-carousel/owl.css";

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

interface IReviewCarouselProps {}

const ReviewCarousel: React.FunctionComponent<IReviewCarouselProps> = () => {
  return (
    <>
      <Container>
        <OwlCarousel
          className="owl-theme owl-carousel owl-nav-review"
          {...options}
          autoPlay={true}
          nav
        >
          <Card>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  AB
                </Avatar>
              }
              title={
                <Typography
                  sx={{
                    fontWeight: " 700",
                    fontSize: "15px",
                    color: "#444",
                    fontFamily: "Open sans",
                  }}
                >
                  Abhi Gujar
                </Typography>
              }
              subheader={
                <Typography
                  sx={{ color: "#444", opacity: ".5", fontSize: "12px" }}
                >
                  September 14, 2016
                </Typography>
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
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
          </Card>
        </OwlCarousel>
      </Container>
    </>
  );
};
export default ReviewCarousel;
