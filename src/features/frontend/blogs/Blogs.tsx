import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import * as React from "react";
import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import { Helmet } from "react-helmet";
import AddBlog from "./AddBlog/AddBlog";
import FAQ from "./FAQ";
import BlogService from "../../../services/BlogService";
import ReviewSection from "../pravas/ReviewSection";

interface IBlogsProps {}

const Blogs: React.FunctionComponent<IBlogsProps> = (props) => {
  const [data, setData] = React.useState<Array<any>>([]);
  // Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage] = React.useState(3);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

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
      <Helmet>
        <title>Pravas Blogs</title>
        <meta name="description" content="Pravas Tourism Blogs" />
        <meta name="keywords" content="Pravas Tourism Blogs" />
      </Helmet>
      <Container
      // sx={{
      //   display: "flex",
      //   flexDirection: "column",
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
      >
        <Grid item>
          <Grid
            container
            padding={1}
            paddingY={6}
            justifyContent="space-evenly"
          >
            {Array.isArray(data) &&
              currentPosts.map((blog, i) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={blog?.title + i}
                  sx={{ pt: 3 }}
                >
                  <BlogPost
                    id={blog?._id}
                    image={blog?.image}
                    title={blog?.title}
                    desc={blog?.richText}
                    category={blog?.categories}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item>
          <Pagination
            totalPosts={data.length}
            postsPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
          />
        </Grid>
      </Container>
      <AddBlog />
      <FAQ />

      {/* **********************Review section right************ */}

      <ReviewSection />
    </>
  );
};

export default Blogs;
