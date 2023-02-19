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

const ReviewSection = () => {
  const [singleReview, setSingleReview] = React.useState<any>([""]);

  const handleChange = (e: any) => {
    const { name, value } = e?.target;
    setSingleReview({ ...singleReview, [name]: value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log("singleReview:", singleReview);
    // console.log("user:", user);
  };

  return (
    <>
      <Container sx={{ margin: "auto", my: 5 }}>
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
              Add a Comment
            </Typography>
          </Grid>
          <Grid item sx={{ marginTop: "20px" }}>
            <Stack spacing={1}>
              <Rating
                name="feedback"
                defaultValue={2.5}
                precision={0.5}
                value={singleReview?.rating}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

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
            name="fullName"
            value={singleReview?.fillName}
            onChange={handleChange}
          />

          <Textarea
            style={{
              backgroundColor: "#faf5ee",
              width: "99.5%",
              borderRadius: "5px",

              fontSize: "17px",
              minHeight: "100px",
              fontFamily: "poppins",
              paddingTop: "10px",
            }}
            placeholder="  Write Your Comment *"
            name="message"
            value={singleReview?.message}
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
      </Container>
    </>
  );
};

export default ReviewSection;
