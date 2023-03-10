import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import EastIcon from "@mui/icons-material/East";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";
import endPoints from "../../../api/endpoints";
import moment from "moment";

const ExploreGrid = styled(Grid)({
  transition: "0.7s ease-in-out",
  "&:hover": {
    transform: "translate(15px)",
  },
});

const TitleArea = styled(Typography)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const DescArea = styled(Typography)({
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
});

const descAreaStyle = {
  display: "-webkit-box",
  "-webkit-line-clamp": 3,
  "-webkit-box-orient": "vertical",
  overflow: "hidden",
};

interface IBlogPostProps {
  image: string;
  title: string;
  desc: string;
  id: number | any;
  category: any;
  date?: number;
}
const BlogPost: React.FunctionComponent<IBlogPostProps> = ({
  image,
  title,
  desc,
  id,
  category,
  date,
}) => {
  let dateObj = date && new Date(Number(date));
  let month = dateObj && dateObj.getMonth() + 1;
  let day = dateObj && dateObj.getDate();

  return (
    <>
      <Grid container sx={{ pt: 2, px: 2 }}>
        <Paper
          elevation={1}
          sx={{
            borderRadius: 5,
            backgroundColor: "white",
            transition: "0.8s ease-in-out",
            "&:hover": {
              boxShadow: "0px 0px 20px -5px rgb(0 0 0 / 50%)",
              transform: "translateY(-5px)",
            },
          }}
        >
          <NavLink
            to={`/blogs/details/${id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Grid container sx={{ p: 2, pb: 1.2 }} xs={12}>
              <Grid
                item
                xs={12}
                sx={{
                  flexDirection: "column",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {/* -------------------Image Area-------------------- */}
                <Grid>
                  <Box position="relative">
                    <img
                      style={{
                        width: "100%",
                        height: 230,
                        borderRadius: 10,
                        objectFit: "cover",
                      }}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "placeholder-blogs.png";
                      }}
                      src={
                        `${endPoints?.serverBaseURL}/${image}`
                          ? `${endPoints?.serverBaseURL}/${image}`
                          : "./placeholder-blogs.png"
                      }
                      alt=""
                    />
                    <Box
                      position="absolute"
                      bottom={15}
                      right={8}
                      bgcolor="#005d9d"
                      p={1}
                      borderRadius={5}
                      width={70}
                      textAlign="center"
                      color="#fff"
                      fontSize={15}
                    >
                      <span>
                        {day} {moment(month).format("MMM")}
                      </span>
                    </Box>
                  </Box>
                </Grid>
                {/*------------------- Admin & Category ------------------------*/}
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
                          sx={{ fontSize: "0.8rem" }}
                        />
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          Admin
                        </Typography>
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
                          sx={{
                            fontSize: "0.9rem",
                            textTransform: "capitalize",
                          }}
                        >
                          {category[0]}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                {/* -----------------Title & Description-------------------- */}
                <Grid
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: 168,
                  }}
                >
                  <TitleArea
                    // className="blog-post-line-clamp-title"
                    sx={{
                      color: "#005d9d",
                      fontSize: 19,
                      fontWeight: 600,
                      pb: 1,
                    }}
                  >
                    {title}
                  </TitleArea>
                  <DescArea
                    // className="blog-post-line-clamp-p"
                    sx={{
                      color: "#7a7a7a",
                      fontSize: 16,
                      fontWeight: 400,
                      fontFamily: "inherit",
                      // overflow: "hidden",
                    }}
                    style={descAreaStyle}
                    dangerouslySetInnerHTML={{
                      __html: desc.slice(
                        desc.indexOf("<p"),
                        desc.indexOf("</p>")
                      ),
                    }}
                  ></DescArea>
                </Grid>
                {/* ---------------------Divider-------------------- */}
                <Divider />
                {/* -------------------Read More----------------------- */}

                <ExploreGrid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#005d9d",
                    pt: 1,
                    cursor: "pointer",
                  }}
                >
                  <Typography sx={{ p: 1, fontSize: 15, fontWeight: 900 }}>
                    Explore
                  </Typography>
                  <EastIcon />
                </ExploreGrid>
              </Grid>
            </Grid>
          </NavLink>
        </Paper>
      </Grid>
    </>
  );
};

export default BlogPost;
