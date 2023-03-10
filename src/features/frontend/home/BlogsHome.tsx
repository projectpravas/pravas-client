import * as React from "react";
import OwlCarousel from "react-owl-carousel";
import BlogPost from "../blogs/BlogPost";
import Container from "@mui/material/Container";
import BlogService from "../../../services/BlogService";
import { useNavigate } from "react-router-dom";
interface IOwlCarouselProps {}

const options = {
  margin: 30,
  autoHeight: true,
  responsiveClass: true,
  nav: true,
  dots: true,
  autoplay: true,
  // loop: true,
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
          className="owl-theme owl-carousel owl-nav-blogs "
          style={{ height: "100%" }}
        >
          {Array.isArray(data) &&
            data?.map((blog, i) => {
              return (
                <div
                  style={{
                    margin: "0 -2",
                    width: "100%",
                    marginBottom: 2,
                  }}
                  // onClick={() => navigate(`/blogs/details/${blog?._id}`)}
                  key={blog?.title + i}
                >
                  <BlogPost
                    id={blog?._id}
                    image={blog?.image}
                    title={blog?.title}
                    desc={blog?.richText}
                    category={blog?.categories}
                    date={blog?.creationDate}
                  />
                </div>
              );
            })}
        </OwlCarousel>
      </Container>
      {/* </Grid>  */}
    </>
  );
};

export default BlogsHome;
