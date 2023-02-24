import * as React from "react";
import { styled } from "@mui/material/styles";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

import Textarea from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import TourService from "../../../services/TourService";
import { useLocation, useParams } from "react-router";
import { selectLoggedUser } from "../../../app/slices/AuthSlice";
import { useSelector } from "react-redux";
import UserModel from "../../../shared/models/userModel";
import TourModel from "../../../shared/models/tourModel";
import { errorToast, successToast } from "../../../ui/toast/Toast";
import LoginWindow from "../../../ui/loginwindow/LoginWindow";

interface IReviewSectionProps {}

const ReviewSection: React.FC<IReviewSectionProps> = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const loggedUser: UserModel = useSelector(selectLoggedUser);
  const { id } = useParams();

  // console.log(loggedUser);

  const [singleReview, setSingleReview] = React.useState({
    pravasiId: loggedUser._id,
    name: `${loggedUser?.name?.first} ${loggedUser?.name?.last}`,
    rating: 0,
    liked: false,
    comment: "",
    date: new Date(),
  });

  const handleChange = (e: any) => {
    const { name, value } = e?.target;
    setSingleReview({ ...singleReview, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log("singleReview:", singleReview);
    // console.log("user:", user);

    loggedUser?._id
      ? id &&
        TourService.updateReview(id, singleReview)
          .then((res) => {
            successToast("review submitted..", 2000);
          })
          .catch((err) => {
            console.log(err);
            errorToast("could not add review..", 2000);
          })
      : setOpen(true);
  };

  return (
    <>
      <Container sx={{ margin: "auto", my: 5 }}>
        <Grid container>
          <Grid item lg={8}>
            <form onSubmit={handleSubmit} style={{ margin: "15px 0 15px 0" }}>
              <Grid item>
                <Typography
                  sx={{
                    fontSize: "22px",
                    color: "#27488d",
                    fontWeight: "800",
                    fontFamily: "poppins",
                  }}
                >
                  Add Tour Review or Feedback if any
                </Typography>
              </Grid>
              <Grid item sx={{ marginTop: "20px" }}>
                <Stack spacing={1}>
                  <Rating
                    name="rating"
                    defaultValue={0}
                    precision={1}
                    // value={singleReview?.rating}
                    onChange={handleChange}
                  />
                </Stack>
              </Grid>

              {!loggedUser._id && (
                <TextField
                  sx={{
                    backgroundColor: "#faf5ee",
                    color: "#c4c0ba ",
                    width: "100%",
                    fontSize: "16px",
                    fontFamily: "poppins",
                    my: 2,
                  }}
                  placeholder="Your Name * "
                  name="name"
                  size="small"
                  // value={setSingleReview.}
                  onChange={handleChange}
                />
              )}

              <TextField
                multiline
                minRows={4}
                style={{
                  backgroundColor: "#faf5ee",
                  width: "100%",
                  borderRadius: "5px",

                  fontSize: "17px",
                  minHeight: "100px",
                  fontFamily: "poppins",
                }}
                placeholder="  Write Your Comment *"
                name="comment"
                // value={singleReview?.message}
                onChange={handleChange}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  display: "flex",
                  margin: "auto",
                  mb: 3,
                  mt: 1,
                  borderRadius: "20px",
                  bgcolor: "#27488d",
                }}
              >
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
        <LoginWindow
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
        />
      </Container>
    </>
  );
};

export default ReviewSection;
