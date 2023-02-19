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

const ExploreGrid = styled(Grid)({
  transition: "0.7s ease-in-out",
  "&:hover": {
    transform: "translate(15px)",
  },
});

interface IBlogPostProps {
  image: string;
  title: string;
  desc: string;
  id: number | any;
}
const BlogPost: React.FunctionComponent<IBlogPostProps> = ({
  image,
  title,
  desc,
  id,
}) => {
  // console.log(desc.slice(desc.indexOf("<p"), desc.indexOf("p>")));

  // console.log(desc.indexOf("<p"));
  // console.log(desc.indexOf("p>"));

  return (
    <>
      <Container>
        <Grid container sx={{ pt: 2 }}>
          <Paper
            elevation={1}
            sx={{
              borderRadius: 5,
              backgroundColor: "white",
              "&:hover": { boxShadow: "0px 0px 30px -5px rgb(0 0 0 / 50%)" },
            }}
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
                      02 <b>Jan</b>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          Category
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                {/* -----------------Title & Description-------------------- */}
                <Grid sx={{ p: 1 }}>
                  <Typography
                    sx={{
                      color: "#005d9d",
                      fontSize: 19,
                      fontWeight: 600,
                      pb: 1,
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#7a7a7a",
                      fontSize: 16,
                      fontWeight: 400,
                      fontFamily: "inherit",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: desc.slice(
                        desc.indexOf("<p"),
                        desc.indexOf("</p>")
                      ),
                    }}
                  ></Typography>
                </Grid>
                {/* ---------------------Divider-------------------- */}
                <Divider />
                {/* -------------------Read More----------------------- */}

                <NavLink
                  to={`${id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
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
                </NavLink>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default BlogPost;
