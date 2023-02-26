import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import * as React from "react";
import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import { Helmet } from "react-helmet-async";
import FAQ from "./FAQ";
import BlogService from "../../../services/BlogService";
import ReviewSection from "../pravas/ReviewSection";
import { Outlet, useLocation } from "react-router-dom";

interface IBlogsProps {}

const Blogs: React.FunctionComponent<IBlogsProps> = (props) => {
  const [data, setData] = React.useState<Array<any>>([]);
  // Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage] = React.useState(6);
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
  const { pathname } = useLocation();

  const showBlogs =
    pathname.split("/")[pathname.split("/").length - 1] == "blogs";

  return (
    <>
      <Outlet />

      {showBlogs && (
        <>
          <Helmet>
            <title>Pravas Blogs</title>
            <meta name="description" content="Pravas Tourism Blogs" />
            <meta name="keywords" content="Pravas Tourism Blogs" />
            <link rel="canonical" href="/blogs" />
          </Helmet>
          <Container>
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
                        date={blog?.creationDate}
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
        </>
      )}

      {/* **********************Review section right************ */}
    </>
  );
};

export default Blogs;
