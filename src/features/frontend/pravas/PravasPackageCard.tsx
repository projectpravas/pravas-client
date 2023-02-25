import React, { useEffect, useState } from "react";
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
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  Link,
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LocationClick from "./LocationClick";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { endPoints } from "../../../api";
import { duration } from "@mui/material";
import { number } from "yup";
import { SrvRecord } from "dns";

import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import LoginWindow from "../../../ui/loginwindow/LoginWindow";
import UserModel from "../../../shared/models/userModel";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../../app/slices/AuthSlice";
import TourService from "../../../services/TourService";
import { errorToast, successToast } from "../../../ui/toast/Toast";
import TourModel from "../../../shared/models/tourModel";
import { selectAllTours } from "../../../app/slices/TourSlice";
import data from "./data";
import zIndex from "@mui/material/styles/zIndex";
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 6,
    top: 12,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const NLink = styled(Grid)({
  transition: "0.7s ease-in-out",
  "&:hover": {
    transform: "translate(10px) ",
    color: "blue",
  },
});

interface IPravasPackageCardProps {
  data: TourModel;
  loadData: Function;
}

const PravasPackageCard: React.FunctionComponent<IPravasPackageCardProps> = ({
  data,
  loadData,
}) => {
  const typoHead = {
    fontWeight: "700",
    color: "#27488d",
    marginTop: "20px ",
    fontFamily: "Poppins",
    fontSize: {
      xs: "1rem",
      md: "0.9rem",
      lg: "20px",
      xl: "1.4rem",
    },
    marginLeft: {
      xs: "20px",
      md: "0.9rem",
      lg: "1rem",
      xl: "1.4rem",
    },
  };
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let navPath = pathname.split("/").includes("home");
  // const returnNavpath = (id: string | number) => {
  //   navPath = pathname.split("/").includes("home")
  //     ? `/pravas/explore/${id}` : `/explore/${id}`;
  //   return navPath;
  // };
  // Dialog open
  const loggedUser: UserModel = useSelector(selectLoggedUser);
  const singleObj = data?.feedbacks?.find(
    (v: any, i: number) => loggedUser?._id == v?.pravasiId
  );
  // console.log(singleObj);

  const [liked, setLiked] = useState({
    pravasiId: loggedUser._id,
    liked: singleObj?.liked,
  });

  const [openDialog, setOpenDialog] = React.useState(false);

  const [openLoginWindow, setOpenLoginWindow] = React.useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleLoginOpen = () => {
    setOpenLoginWindow(true);
  };

  const handleLoginClose = () => {
    setOpenLoginWindow(false);
  };

  const handleLike = (value: any, tourId: string) => {
    loggedUser?._id && setLiked({ ...liked, liked: !value });
    loggedUser?._id
      ? tourId &&
        TourService.updateReview(tourId, {
          pravasiId: loggedUser._id,
          liked: !value,
        })
          .then((res) => {
            console.log(res);

            successToast("Like submitted..", 2000);
            loadData();
          })
          .catch((err) => {
            console.log(err);
            errorToast("could not Like..", 2000);
          })
      : setOpenLoginWindow(!openLoginWindow);
  };

  useEffect(() => {
    setLiked({ ...liked, pravasiId: loggedUser._id, liked: singleObj?.liked });
  }, [singleObj]);

  return (
    <Container>
      {/* <NavLink
        to={
          navPath
            ? `/pravas/explore/${data?._id}`
            : `/pravas/explore/${data?._id}`
        }
        style={{
          textDecoration: "none",
          color: "#2c5799",
          fontWeight: "bold",
        }}
      > */}
      {/* <div
        onClick={() =>
          navigate(
            navPath
              ? `/pravas/explore/${data?._id}`
              : `/pravas/explore/${data?._id}`
          )
        }
      > */}
      <Grid container sx={{ fontFamily: "Poppins" }}></Grid>
      <Grid container sx={{ fontFamily: "Poppins" }}>
        <Card
          sx={{
            padding: "15px 0px 15px 0px",
            borderRadius: "20px",
            position: "relative",
            backgroundColor: "#ffffff",
            marginX: "-8px",

            ":hover": { boxShadow: "1px 1px 10px grey" },
          }}
        >
          {/* / ------------------image -area----- / */}
          <Grid item>
            <CardActionArea sx={{ width: "90%", margin: "auto" }}>
              <CardMedia
                sx={{ borderRadius: "15px" }}
                component="img"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "placeholder-blogs.png";
                }}
                src={
                  data?.images?.length !== 0
                    ? `${endPoints?.serverBaseURL}/${
                        data?.images && data?.images[0]
                      }`
                    : `/placeholder-blogs.png`
                }
                alt={data?.title}
              />
            </CardActionArea>
          </Grid>
          {/*----------- heading----------- */}
          <Grid item>
            <Grid container>
              <Grid item xs={8}>
                <NavLink
                  to={`explore/${data?._id}`}
                  style={{
                    textDecoration: "none",
                    color: "#2c5799",
                    fontWeight: "bold",
                  }}
                >
                  <Typography variant="h5" sx={typoHead}>
                    {data?.title}
                  </Typography>
                </NavLink>

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
                    ₹{data?.price}
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
                  <StyledBadge
                    badgeContent={data?.images?.length}
                    color="primary"
                  >
                    <IconButton onClick={handleDialogOpen}>
                      <CameraAltOutlinedIcon />
                    </IconButton>
                  </StyledBadge>
                  <Dialog open={openDialog} onClose={handleDialogClose}>
                    <LocationClick items={data?.images ? data?.images : []} />
                  </Dialog>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* / ----------------days seat explorer---- / */}
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
                    {data?.duration?.days}
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
                    {data?.maxPersons}
                  </Typography>
                </Grid>
                <NLink item sx={{ display: "flex" }}>
                  <Typography>
                    <NavLink
                      to={`explore/${data?._id}`}
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
                    <ArrowRightAltIcon
                      sx={{
                        "&:hover": { color: "#2c5799" },
                        color: "#2c5799",
                      }}
                    />
                  </Typography>
                </NLink>
              </Grid>
            </Card>
          </Grid>
          <Grid item sx={{ position: "absolute", top: "8%", right: "10%" }}>
            <IconButton
              onClick={(e: any) => {
                handleLike(liked.liked, data?._id as string);
              }}
            >
              <FavoriteBorderOutlinedIcon
                sx={{
                  color: `${liked.liked ? "red" : "#ffffff"}`,
                  bgcolor: "#0000008a",
                  opacity: 0.5,
                  borderRadius: "5px",
                  padding: "2px",
                  zIndex: 100,
                }}
              />
            </IconButton>
          </Grid>
        </Card>
      </Grid>
      {/* </div> */}
      {/* </NavLink> */}
      <LoginWindow
        handleOpen={handleLoginOpen}
        handleClose={handleLoginClose}
        open={openLoginWindow}
      />
    </Container>
  );
};

export default PravasPackageCard;
