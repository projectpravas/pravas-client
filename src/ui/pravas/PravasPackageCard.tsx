import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";

import { styled } from "@mui/system";

const NLink = styled(Grid)({
  "&:hover": {
    transform: "translate(10px) ",
    color: "red",
  },
});

interface IPravasPackageCardProps {}

const PravasPackageCard: React.FunctionComponent<IPravasPackageCardProps> = (
  props
) => {
  const typoHead = {
    fontWeight: "bold",
    color: "#2c5799",
    margin: "20px 0px 0px 20px",
    fontSize: {
      xs: "0.8rem",
      md: "0.9rem",
      lg: "1rem",
      xl: "1.4rem",
    },
    marginLeft: {
      xs: "0",
      md: "0.9rem",
      lg: "1rem",
      xl: "1.4rem",
    },
  };

  return (
    <Container>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "space-evenly", flexWrap: "wrap" }}
      >
        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              padding: "15px 0px 15px 0px",
              borderRadius: "20px",
              position: "relative",
              backgroundColor: "#ffffff",

              ":hover": { boxShadow: "1px 1px 10px grey" },
            }}
          >
            <CardActionArea sx={{ width: "90%", margin: "auto" }}>
              <CardMedia
                component="img"
                height="100%"
                sx={{ borderRadius: "20px" }}
                src="https://pravasthejourney.com/wp-content/uploads/2021/09/kashmir.jpg"
                alt="Kashmir 5N6D"
              />
            </CardActionArea>
            <Grid container>
              <Grid item xs={8}>
                <Typography variant="h5" sx={typoHead}>
                  Kashmir 5N6D
                </Typography>

                <Typography sx={{ display: "flex", p: 2 }}>
                  <span
                    style={{
                      marginLeft: "2px",
                      color: "#97978F",
                      fontWeight: "bold",
                    }}
                  >
                    From
                  </span>
                  <span style={{ marginLeft: "5px", color: "#41257b" }}>
                    ₹15800 / P
                  </span>
                </Typography>
              </Grid>
              <Grid
                item
                xs={3.4}
                sx={{
                  color: "#005792",

                  width: "80%",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <Typography sx={{ color: "#673ab9", mt: 3 }}>
                  <AddAPhotoOutlinedIcon />
                </Typography>
              </Grid>
            </Grid>
            <Card
              sx={{
                width: "90%",
                margin: "auto",
                backgroundColor: "#ece5ff",

                borderRadius: "10px",
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  marginTop: "2%",
                  padding: "10px 0px 10px 0px",
                  justifyContent: "space-evenly",
                }}
              >
                <Grid item sx={{ display: "flex" }}>
                  <Typography sx={{ alignSelf: "center" }}>
                    <CalendarMonthIcon
                      sx={{ color: "#005792", fontSize: "130%" }}
                    />
                  </Typography>
                  <Typography
                    sx={{
                      color: "#97978F",
                      fontWeight: "bold",
                      paddingLeft: "5px",
                    }}
                  >
                    5days
                  </Typography>
                </Grid>
                <Grid item sx={{ display: "flex" }}>
                  <Typography sx={{ alignSelf: "center" }}>
                    <PeopleOutlineIcon
                      sx={{ color: "#005792", fontSize: "150%" }}
                    />
                  </Typography>
                  <Typography
                    sx={{
                      color: "#97978F",
                      fontWeight: "bold",
                      paddingLeft: "5px",
                    }}
                  >
                    15Seat
                  </Typography>
                </Grid>
                <NLink item sx={{ display: "flex" }}>
                  <Typography>
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "#2c5799",
                        fontWeight: "bold",
                      }}
                    >
                      Explore
                    </Link>
                  </Typography>
                  <Typography>
                    <ArrowRightAltIcon />
                  </Typography>
                </NLink>
              </Grid>
            </Card>
            <Grid sx={{ position: "absolute", top: "8%", right: "10%" }}>
              <Link to="">
                <FavoriteBorderOutlinedIcon
                  sx={{
                    color: "#ffffff",
                    bgcolor: "black",
                    opacity: 0.5,
                    borderRadius: "5px",
                  }}
                />
              </Link>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              padding: "15px 0px 15px 0px",
              borderRadius: "20px",
              position: "relative",
              backgroundColor: "#ffffff",
              ":hover": { boxShadow: "1px 1px 10px grey" },
            }}
          >
            <CardActionArea sx={{ width: "90%", margin: "auto" }}>
              <CardMedia
                component="img"
                height="100%"
                sx={{ borderRadius: "20px" }}
                src="https://pravasthejourney.com/wp-content/uploads/2021/09/kashmir.jpg"
                alt="Kashmir 5N6D"
              />
            </CardActionArea>
            <Grid container>
              <Grid item xs={8}>
                <Typography gutterBottom variant="h5" sx={typoHead}>
                  Kashmir 5N6D
                </Typography>

                <Typography sx={{ display: "flex", p: 2 }}>
                  <span
                    style={{
                      marginLeft: "2px",
                      color: "#97978F",
                      fontWeight: "bold",
                    }}
                  >
                    From
                  </span>
                  <span style={{ marginLeft: "5px", color: "#41257b" }}>
                    ₹15800 / P
                  </span>
                </Typography>
              </Grid>
              <Grid
                item
                xs={3.4}
                sx={{
                  color: "#005792",

                  width: "80%",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <Typography sx={{ color: "#673ab9", mt: 3 }}>
                  <AddAPhotoOutlinedIcon />
                </Typography>
              </Grid>
            </Grid>
            <Card
              sx={{
                width: "90%",
                margin: "auto",
                backgroundColor: "#ece5ff",

                borderRadius: "10px",
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  marginTop: "2%",
                  padding: "10px 0px 10px 0px",
                  justifyContent: "space-evenly",
                }}
              >
                <Grid item sx={{ display: "flex" }}>
                  <Typography sx={{ alignSelf: "center" }}>
                    <CalendarMonthIcon
                      sx={{ color: "#005792", fontSize: "130%" }}
                    />
                  </Typography>
                  <Typography
                    sx={{
                      color: "#97978F",
                      fontWeight: "bold",
                      paddingLeft: "5px",
                    }}
                  >
                    5days
                  </Typography>
                </Grid>
                <Grid item sx={{ display: "flex" }}>
                  <Typography sx={{ alignSelf: "center" }}>
                    <PeopleOutlineIcon
                      sx={{ color: "#005792", fontSize: "150%" }}
                    />
                  </Typography>
                  <Typography
                    sx={{
                      color: "#97978F",
                      fontWeight: "bold",
                      paddingLeft: "5px",
                    }}
                  >
                    15Seat
                  </Typography>
                </Grid>
                <NLink item sx={{ display: "flex" }}>
                  <Typography>
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "#2c5799",
                        fontWeight: "bold",
                      }}
                    >
                      Explore
                    </Link>
                  </Typography>
                  <Typography>
                    <ArrowRightAltIcon />
                  </Typography>
                </NLink>
              </Grid>
            </Card>
            <Grid sx={{ position: "absolute", top: "8%", right: "10%" }}>
              <Link to="">
                <FavoriteBorderOutlinedIcon
                  sx={{
                    color: "#ffffff",
                    bgcolor: "black",
                    opacity: 0.5,
                    borderRadius: "5px",
                  }}
                />
              </Link>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              padding: "15px 0px 15px 0px",
              borderRadius: "20px",
              position: "relative",
              backgroundColor: "#ffffff",
              ":hover": { boxShadow: "1px 1px 10px grey" },
            }}
          >
            <CardActionArea sx={{ width: "90%", margin: "auto" }}>
              <CardMedia
                component="img"
                height="100%"
                sx={{ borderRadius: "20px" }}
                src="https://pravasthejourney.com/wp-content/uploads/2021/09/kashmir.jpg"
                alt="Kashmir 5N6D"
              />
            </CardActionArea>
            <Grid container>
              <Grid item xs={8}>
                <Typography gutterBottom variant="h5" sx={typoHead}>
                  Kashmir 5N6D
                </Typography>

                <Typography sx={{ display: "flex", p: 2 }}>
                  <span
                    style={{
                      marginLeft: "2px",
                      color: "#97978F",
                      fontWeight: "bold",
                    }}
                  >
                    From
                  </span>
                  <span style={{ marginLeft: "5px", color: "#41257b" }}>
                    ₹15800 / P
                  </span>
                </Typography>
              </Grid>
              <Grid
                item
                xs={3.4}
                sx={{
                  color: "#005792",

                  width: "80%",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <Typography sx={{ color: "#673ab9", mt: 3 }}>
                  <AddAPhotoOutlinedIcon />
                </Typography>
              </Grid>
            </Grid>
            <Card
              sx={{
                width: "90%",
                margin: "auto",
                backgroundColor: "#ece5ff",

                borderRadius: "10px",
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  marginTop: "2%",
                  padding: "10px 0px 10px 0px",
                  justifyContent: "space-evenly",
                }}
              >
                <Grid item sx={{ display: "flex" }}>
                  <Typography sx={{ alignSelf: "center" }}>
                    <CalendarMonthIcon
                      sx={{ color: "#005792", fontSize: "130%" }}
                    />
                  </Typography>
                  <Typography
                    sx={{
                      color: "#97978F",
                      fontWeight: "bold",
                      paddingLeft: "5px",
                    }}
                  >
                    5days
                  </Typography>
                </Grid>
                <Grid item sx={{ display: "flex" }}>
                  <Typography sx={{ alignSelf: "center" }}>
                    <PeopleOutlineIcon
                      sx={{ color: "#005792", fontSize: "150%" }}
                    />
                  </Typography>
                  <Typography
                    sx={{
                      color: "#97978F",
                      fontWeight: "bold",
                      paddingLeft: "5px",
                    }}
                  >
                    15Seat
                  </Typography>
                </Grid>
                <NLink item sx={{ display: "flex" }}>
                  <Typography>
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "#2c5799",
                        fontWeight: "bold",
                      }}
                    >
                      Explore
                    </Link>
                  </Typography>
                  <Typography>
                    <ArrowRightAltIcon />
                  </Typography>
                </NLink>
              </Grid>
            </Card>
            <Grid sx={{ position: "absolute", top: "8%", right: "10%" }}>
              <Link to="">
                <FavoriteBorderOutlinedIcon
                  sx={{
                    color: "#ffffff",
                    bgcolor: "black",
                    opacity: 0.5,
                    borderRadius: "5px",
                  }}
                />
              </Link>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              padding: "15px 0px 15px 0px",
              borderRadius: "20px",
              position: "relative",
              backgroundColor: "#ffffff",
              ":hover": { boxShadow: "1px 1px 10px grey" },
            }}
          >
            <CardActionArea sx={{ width: "90%", margin: "auto" }}>
              <CardMedia
                component="img"
                height="100%"
                sx={{ borderRadius: "20px" }}
                src="https://pravasthejourney.com/wp-content/uploads/2021/09/kashmir.jpg"
                alt="Kashmir 5N6D"
              />
            </CardActionArea>
            <Grid container>
              <Grid item xs={8}>
                <Typography gutterBottom variant="h5" sx={typoHead}>
                  Kashmir 5N6D
                </Typography>

                <Typography sx={{ display: "flex", p: 2 }}>
                  <span
                    style={{
                      marginLeft: "2px",
                      color: "#97978F",
                      fontWeight: "bold",
                    }}
                  >
                    From
                  </span>
                  <span style={{ marginLeft: "5px", color: "#41257b" }}>
                    ₹15800 / P
                  </span>
                </Typography>
              </Grid>
              <Grid
                item
                xs={3.4}
                sx={{
                  color: "#005792",

                  width: "80%",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <Typography sx={{ color: "#673ab9", mt: 3 }}>
                  <AddAPhotoOutlinedIcon />
                </Typography>
              </Grid>
            </Grid>
            <Card
              sx={{
                width: "90%",
                margin: "auto",
                backgroundColor: "#ece5ff",

                borderRadius: "10px",
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  marginTop: "2%",
                  padding: "10px 0px 10px 0px",
                  justifyContent: "space-evenly",
                }}
              >
                <Grid item sx={{ display: "flex" }}>
                  <Typography sx={{ alignSelf: "center" }}>
                    <CalendarMonthIcon
                      sx={{ color: "#005792", fontSize: "130%" }}
                    />
                  </Typography>
                  <Typography
                    sx={{
                      color: "#97978F",
                      fontWeight: "bold",
                      paddingLeft: "5px",
                    }}
                  >
                    5days
                  </Typography>
                </Grid>
                <Grid item sx={{ display: "flex" }}>
                  <Typography sx={{ alignSelf: "center" }}>
                    <PeopleOutlineIcon
                      sx={{ color: "#005792", fontSize: "150%" }}
                    />
                  </Typography>
                  <Typography
                    sx={{
                      color: "#97978F",
                      fontWeight: "bold",
                      paddingLeft: "5px",
                    }}
                  >
                    15Seat
                  </Typography>
                </Grid>
                <NLink item sx={{ display: "flex" }}>
                  <Typography>
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "#2c5799",
                        fontWeight: "bold",
                      }}
                    >
                      Explore
                    </Link>
                  </Typography>
                  <Typography>
                    <ArrowRightAltIcon />
                  </Typography>
                </NLink>
              </Grid>
            </Card>
            <Grid sx={{ position: "absolute", top: "8%", right: "10%" }}>
              <Link to="">
                <FavoriteBorderOutlinedIcon
                  sx={{
                    color: "#ffffff",
                    bgcolor: "black",
                    opacity: 0.5,
                    borderRadius: "5px",
                  }}
                />
              </Link>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              padding: "15px 0px 15px 0px",
              borderRadius: "20px",
              position: "relative",
              backgroundColor: "#ffffff",
              ":hover": { boxShadow: "1px 1px 10px grey" },
            }}
          >
            <CardActionArea sx={{ width: "90%", margin: "auto" }}>
              <CardMedia
                component="img"
                height="100%"
                sx={{ borderRadius: "20px" }}
                src="https://pravasthejourney.com/wp-content/uploads/2021/09/kashmir.jpg"
                alt="Kashmir 5N6D"
              />
            </CardActionArea>
            <Grid container>
              <Grid item xs={8}>
                <Typography gutterBottom variant="h5" sx={typoHead}>
                  Kashmir 5N6D
                </Typography>

                <Typography sx={{ display: "flex", p: 2 }}>
                  <span
                    style={{
                      marginLeft: "2px",
                      color: "#97978F",
                      fontWeight: "bold",
                    }}
                  >
                    From
                  </span>
                  <span style={{ marginLeft: "5px", color: "#41257b" }}>
                    ₹15800 / P
                  </span>
                </Typography>
              </Grid>
              <Grid
                item
                xs={3.4}
                sx={{
                  color: "#005792",

                  width: "80%",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <Typography sx={{ color: "#673ab9", mt: 3 }}>
                  <AddAPhotoOutlinedIcon />
                </Typography>
              </Grid>
            </Grid>
            <Card
              sx={{
                width: "90%",
                margin: "auto",
                backgroundColor: "#ece5ff",

                borderRadius: "10px",
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  marginTop: "2%",
                  padding: "10px 0px 10px 0px",
                  justifyContent: "space-evenly",
                }}
              >
                <Grid item sx={{ display: "flex" }}>
                  <Typography sx={{ alignSelf: "center" }}>
                    <CalendarMonthIcon
                      sx={{ color: "#005792", fontSize: "130%" }}
                    />
                  </Typography>
                  <Typography
                    sx={{
                      color: "#97978F",
                      fontWeight: "bold",
                      paddingLeft: "5px",
                    }}
                  >
                    5days
                  </Typography>
                </Grid>
                <Grid item sx={{ display: "flex" }}>
                  <Typography sx={{ alignSelf: "center" }}>
                    <PeopleOutlineIcon
                      sx={{ color: "#005792", fontSize: "150%" }}
                    />
                  </Typography>
                  <Typography
                    sx={{
                      color: "#97978F",
                      fontWeight: "bold",
                      paddingLeft: "5px",
                    }}
                  >
                    15Seat
                  </Typography>
                </Grid>
                <NLink item sx={{ display: "flex" }}>
                  <Typography>
                    <Link
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "#2c5799",
                        fontWeight: "bold",
                      }}
                    >
                      Explore
                    </Link>
                  </Typography>
                  <Typography>
                    <ArrowRightAltIcon />
                  </Typography>
                </NLink>
              </Grid>
            </Card>
            <Grid sx={{ position: "absolute", top: "8%", right: "10%" }}>
              <Link to="">
                <FavoriteBorderOutlinedIcon
                  sx={{
                    color: "#ffffff",
                    bgcolor: "black",
                    opacity: 0.5,
                    borderRadius: "5px",
                  }}
                />
              </Link>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PravasPackageCard;
