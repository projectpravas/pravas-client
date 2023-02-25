import * as React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import "../../../ui/owl-carousel/owl.css";
import BlogPost from "../blogs/BlogPost";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BlogService from "../../../services/BlogService";
import { useNavigate } from "react-router-dom";
import "../../../ui/owl-carousel/owl.module.css";

interface IOwlCarouselProps {}

const options = {
  margin: 30,
  responsiveClass: true,
  nav: true,
  dots: false,
  autoplay: false,
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

const BlogsHome: React.FunctionComponent<IOwlCarouselProps> = (props) => {
  const [data, setData] = React.useState<Array<any>>([]);

  const navigate = useNavigate();

  const loadBlogs = () => {
    BlogService.fetchAllBlogs()
      .then((response) => {
        setData(response?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <>
      {/* <Grid container mb={8}> */}

      <Container>
        <OwlCarousel
          {...options}
          className="owl-theme owl-carousel nav-btn"
          lazyLoad={true}
          loop
          dots={false}
          nav={true}
          autoplay={false}
          autoplayHoverPause={true}
          margin={8}
        >
          {Array.isArray(data) &&
            data?.map((blog, i) => {
              return (
                <div
                  style={{ margin: "0 -2" }}
                  onClick={() => navigate(`/blogs/details/${blog?._id}`)}
                >
                  <BlogPost
                    id={blog?._id}
                    image={blog?.image}
                    title={blog?.title}
                    desc={blog?.richText}
                    key={blog?._id + i}
                    category={blog?.categories}
                  />
                </div>
              );
            })}
        </OwlCarousel>{" "}
      </Container>
      {/* </Grid>  */}
    </>
  );
};

export default BlogsHome;
