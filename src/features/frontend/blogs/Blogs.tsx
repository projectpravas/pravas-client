import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import * as React from "react";
import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import { data } from "./BlogData";

interface IBlogsProps {}

const Blogs: React.FunctionComponent<IBlogsProps> = (props) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage] = React.useState(3);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <Container>
        <Grid container padding={1} paddingY={8} justifyContent="space-evenly">
          {Array.isArray(currentPosts) &&
            currentPosts.map((blog, i) => (
              <Grid item xs={12} sm={6} md={4} key={blog?.title + i}>
                <BlogPost
                  id={blog?.id}
                  image={blog?.image}
                  title={blog?.title}
                  desc={blog?.desc}
                />
              </Grid>
            ))}
        </Grid>
        <Pagination
          totalPosts={data.length}
          postsPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>
    </>
  );
};

export default Blogs;
