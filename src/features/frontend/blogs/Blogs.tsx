import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import * as React from "react";
import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import { data } from "./BlogData";
import { Helmet } from "react-helmet";
import AddBlog from "./AddBlog/AddBlog";

interface IBlogsProps {}

const Blogs: React.FunctionComponent<IBlogsProps> = (props) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage] = React.useState(9);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

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
            {Array.isArray(currentPosts) &&
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
                    id={blog?.id}
                    image={blog?.image}
                    title={blog?.title}
                    desc={blog?.desc}
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
    </>
  );
};

export default Blogs;
