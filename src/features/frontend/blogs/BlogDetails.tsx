import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BlogService from "../../../services/BlogService";
import { endPoints } from "../../../api";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import MustWatchBlogDetails from "./MustWatchBlogDetails";
import { LinearProgress } from "@mui/material";
import { indigo } from "@mui/material/colors";

interface IBlogDetailsProps {}

const BlogDetails: React.FunctionComponent<IBlogDetailsProps> = () => {
  const [data, setData] = React.useState<any>();
  const { id } = useParams();
  const [scrollBar, setScrollBar] = React.useState(0);

  const onScroll = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scroll = (winScroll / height) * 100;
    setScrollBar(scroll);
  };

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

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>{data?.seoTitle}</title>
        <meta name="description" content={data?.metaDescription} />
        <meta name="keywords" content={data?.focusKeyphrases} />
        <link rel="canonical" href={`/${data?.slug}/`} />
      </Helmet>
      <LinearProgress
        variant="determinate"
        value={scrollBar}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 22,
          color: "red",
        }}
      />

      <Grid>
        {/* image Area  */}
        <Grid item xs={12} sx={{ height: 420, backgroundColor: "blue" }}>
          <img
            src={`${endPoints?.serverBaseURL}/${data?.image}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Grid>
        <Container
          sx={{
            mt: -13,
            position: "relative",
            backgroundColor: "#fff",
            borderRadius: 3,
            zIndex: 11,
            p: 2,
          }}
        >
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
                      {/* {data?.categories.toString()} */}
                      {
                        data?.categories
                          .toString()
                          .split(",")
                          .join(", ") as string
                      }
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
      </Grid>
    </>
  );
};

export default BlogDetails;
