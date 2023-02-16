import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import BlogService from "../../../services/BlogService";
import { endPoints } from "../../../api";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

interface IBlogDetailsProps {}

const BlogDetails: React.FunctionComponent<IBlogDetailsProps> = () => {
  const [data, setData] = React.useState<Array<any>>([]);
  const { id } = useParams();

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

  const singleCareerData = data.find((obj) => obj?._id == id);
  console.log("singleCareerData ", singleCareerData);

  return (
    <>
      <Helmet>
        <title>{singleCareerData?.title}</title>
        <meta name="description" content={singleCareerData?.metaDescription} />
      </Helmet>
      <Container sx={{ pt: 8 }}>
        <Grid container>
          {/* image Area  */}
          <Grid item xs={12}>
            <img
              src={`${endPoints?.serverBaseURL}/${singleCareerData?.image}`}
              style={{ width: "100%", height: "100%" }}
            />
          </Grid>
          {/* Pravas & category */}
          <Grid item xs={12}>
            <Grid container sx={{ justifyContent: "space-between", p: 1 }}>
              <Grid item>
                <Grid
                  container
                  sx={{
                    color: "#54595f",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box pr={1}>
                    <BorderColorOutlinedIcon
                      fontSize="small"
                      sx={{ fontSize: "1rem" }}
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "1rem" }}>Admin</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  sx={{
                    color: "#54595f",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: "1rem" }}>Category</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Blog Details */}
          <Grid
            item
            sx={{ fontFamily: "inherit" }}
            xs={12}
            dangerouslySetInnerHTML={{ __html: singleCareerData?.richText }}
          ></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BlogDetails;
