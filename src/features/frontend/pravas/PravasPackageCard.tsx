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
  const typoHead = {
    fontWeight: "bold",
    color: "#2c5799",
    margin: "20px 20px 20px 20px",
    fontSize: {
      xs: "1rem",
      md: "0.9rem",
      lg: "1rem",
      xl: "1.4rem",
    },
    marginLeft: {
      xs: "20px",
      md: "0.9rem",
      lg: "1rem",
      xl: "1.4rem",
    },
  };

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
      <Grid container spacing={2} sx={{ d: "flex", flexDirection: "coloumn" }}>
        <Grid item>
          <Card
            sx={{
              padding: "15px 0px 15px 0px",
              borderRadius: "20px",
              position: "relative",
              backgroundColor: "#ffffff",

              ":hover": { boxShadow: "1px 1px 10px grey" },
            }}
          >
            {/* ------------------image -area----- */}
            <Grid item>
              <CardActionArea sx={{ width: "90%", margin: "auto" }}>
                <CardMedia
                  sx={{ borderRadius: "15px" }}
                  component="img"
                  src={image[0]}
                />
              </CardActionArea>
            </Grid>
            {/*----------- heading----------- */}
            <Grid item>
              <Grid container>
                <Grid item xs={8}>
                  <Typography variant="h5" sx={typoHead}>
                    {heading}
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
                      {price}
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
                  <Typography sx={{ color: "#673ab9", mt: 1.5 }}>
                    <IconButton onClick={handleClickOpen}>
                      <CameraAltOutlinedIcon />
                    </IconButton>
                    <Dialog open={open} onClose={handleClose}>
                      {/* //// */}
                      <LocationClick items={items} />
                    </Dialog>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* ----------------days seat explorer---- */}
            <Grid item>
              <Card
                elevation={0}
                sx={{
                  width: "90%",
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
            <Grid item sx={{ position: "absolute", top: "8%", right: "10%" }}>
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
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PravasPackageCard;