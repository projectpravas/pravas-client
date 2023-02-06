import * as React from "react";
import useState from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";

import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { Link, Routes, Route, NavLink } from "react-router-dom";

import { styled } from "@mui/system";
import LocationClick from "./LocationClick";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

const NLink = styled(Grid)({
  transition: "0.7s ease-in-out",
  "&:hover": {
    transform: "translate(10px) ",
    color: "blue",
  },
});

interface IPravasPackageCardProps {
  id: number;
  image: string[];
  price: string;
  duration: string;
  heading: string;
  seatAvability: string;
}

const PravasPackageCard: React.FunctionComponent<IPravasPackageCardProps> = ({
  id,
  image,
  price,
  duration,
  heading,
  seatAvability,
}) => {
  // Dialog open
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const items = [
    "https://pravasthejourney.com/wp-content/uploads/2021/09/KASHMIR4.jpg",

    "https://cdn.wallpapersafari.com/6/59/Lqkei8.jpg",

    "https://media.istockphoto.com/id/485422676/photo/shikara-boats-on-dal-lake-srinagar.jpg?s=612x612&w=0&k=20&c=AnenqHTLf68PPJVtke7MoktZoQ4tLs8mXTvedeTSPOk=",

    "https://w0.peakpx.com/wallpaper/936/401/HD-wallpaper-neelam-valley-jammu-kashmir-landscape-mountain-mountains-pak-pakistan-pakistani.jpg",
  ];
  console.log(id);

  return (
    <Container>
      <Grid
        container
        spacing={1}
        sx={{
          d: "flex",
          flexDirection: "coloumn",
          position: "relative",
        }}
      >
        <Paper sx={{ borderRadius: "25px" }}>
          <Grid item>
            <Grid container flexDirection="column" sx={{ padding: "10px" }}>
              {/* *********************image area *********************** */}
              <Grid item xs={12}>
                <CardActionArea sx={{ width: "100%", margin: "auto" }}>
                  <CardMedia
                    sx={{ borderRadius: 8 }}
                    component="img"
                    src={image[0]}
                  />
                </CardActionArea>
              </Grid>
              <Grid item sx={{ position: "absolute", top: "5%", right: "10%" }}>
                <Link to="">
                  <FavoriteBorderOutlinedIcon
                    sx={{
                      color: "#ffffff",
                      bgcolor: "#0000008a",
                      opacity: 0.5,
                      borderRadius: "5px",
                      padding: "2px",
                    }}
                  />
                </Link>
              </Grid>
              {/* *********************Heading area and  price area & photo icon *********************** */}
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                  margin: "20px 0 0 14px",
                }}
              >
                <Grid item xs={8}>
                  <Typography
                    sx={{
                      color: "#27488D",
                      fontFamily: "Sans-serif",
                      fontSize: " 22px",
                      fontWeight: "750",
                      height: "30px",
                    }}
                  >
                    {heading}
                  </Typography>
                </Grid>
                {/* *****************cameraIcon*********** */}
                <Grid
                  item
                  xs={3.4}
                  sx={{
                    color: "#005792",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row-reverse",
                  }}
                >
                  <Typography sx={{ color: "#673ab9" }}>
                    <IconButton onClick={handleClickOpen}>
                      <CameraAltOutlinedIcon />
                    </IconButton>
                    <Dialog open={open} onClose={handleClose}>
                      {/* //lphotos of locations// */}
                      <LocationClick items={items} />
                    </Dialog>
                  </Typography>
                </Grid>
              </Grid>
              {/* ***********Price dates************** */}
              <Grid item>
                <Typography
                  sx={{
                    display: "flex",
                    paddingLeft: 2,
                    color: "#7A7A7A",
                    fontWeight: 400,
                    fontSize: "20px",
                    fontFamily: "Sans-serif",

                    mb: 2,
                  }}
                >
                  From
                  <span
                    style={{
                      marginLeft: "5px",
                      color: "#27488D",
                      fontSize: "20px",
                      fontWeight: 400,
                      fontFamily: "Sans-serif",
                    }}
                  >
                    {price}
                  </span>
                </Typography>
              </Grid>
              {/* *********************Days seats and explore *********************** */}
              <Grid item xs={12}>
                <Card
                  elevation={0}
                  sx={{
                    width: "100%",
                    margin: "auto",
                    backgroundColor: "#faf8f4",
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
                        {duration}
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
                        {seatAvability}
                      </Typography>
                    </Grid>
                    <NLink item sx={{ display: "flex" }}>
                      <Typography>
                        <NavLink
                          to={`explore/${id}`}
                          style={{
                            textDecoration: "none",
                            color: "#2c5799",
                            fontWeight: "bold",
                          }}
                        >
                          {"Explore"}
                        </NavLink>
                      </Typography>
                      <Typography>
                        <ArrowRightAltIcon />
                      </Typography>
                    </NLink>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
};

export default PravasPackageCard;
