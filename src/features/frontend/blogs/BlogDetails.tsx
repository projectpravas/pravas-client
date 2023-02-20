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
import { IconButton, Paper } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import MustWatchBlogDetails from "./MustWatchBlogDetails";

interface IBlogDetailsProps {}

const BlogDetails: React.FunctionComponent<IBlogDetailsProps> = () => {
  const [data, setData] = React.useState<any>();
  const { id } = useParams();

  const loadBlogs = () => {
    BlogService.fetchOneBlog(id as string)
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

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>{data?.title}</title>
        <meta name="description" content={data?.metaDescription} />
      </Helmet>
      {/* <IconButton
        size="small"
        style={{ color: "#000" }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIosNewIcon color="inherit" />
        Back
      </IconButton> */}
      {/* image Area  */}
      <Grid item xs={12} sx={{ height: 600 }}>
        <img
          src={`${endPoints?.serverBaseURL}/${data?.image}`}
          style={{ width: "100%", height: "100%" }}
        />
      </Grid>
      <Container sx={{ pt: 2 }}>
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
                  <Typography
                    sx={{ fontSize: "1rem", textTransform: "capitalize" }}
                  >
                    {data?.categories.toString()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={8}>
          {/* -----------------------------------------------Blog Details-------------- */}
          <Grid item xs={12} md={8}>
            <Grid
              container
              sx={{ fontFamily: "inherit" }}
              dangerouslySetInnerHTML={{ __html: data?.richText }}
            ></Grid>
          </Grid>

          {/* ---------------------------------------------------Must Watch ------------ */}
          <Grid item xs={12} md={4}>
            <Paper elevation={1}>
              <Grid sx={{ p: 2 }}>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "900",
                    textAlign: "left",
                  }}
                >
                  Must Watch
                </Typography>
                <MustWatchBlogDetails />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BlogDetails;
