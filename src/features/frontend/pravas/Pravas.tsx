import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import PravasPackageCard from "./PravasPackageCard";
import { Helmet } from "react-helmet-async";
import TourService from "../../../services/TourService";
import { Outlet, useNavigate } from "react-router-dom";
import StartFromTop from "../../../ui/GoToTop/StartFromTop";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { addAllTours, selectAllTours } from "../../../app/slices/TourSlice";
import TourModel from "../../../shared/models/tourModel";
import PravasCardList from "./PravasCardList";

interface IPravasProps {}

const Pravas: React.FunctionComponent<IPravasProps> = (props) => {
  //---------------- AllDatafetch -------------

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("custom-tour-form");
  };

  return (
    <>
      <Outlet />
      <Helmet>
        <title>Pravas Tours</title>
        <meta name="description" content="Pravas Tourism" />
        <meta name="keywords" content="Pravas Tourism" />
        <link rel="canonical" href="/pravas" />
      </Helmet>
      <Container>
        <Grid container marginY={10}>
          <PravasCardList />
        </Grid>
      </Container>
      <StartFromTop />

      {/* *******************customize tour***************** */}
      <Outlet />
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Container
          sx={{
            padding: "60px",

            borderRadius: "20px",
            boxShadow: "3px 3px 17px 0px rgba(0,0,0,0.2)",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItem: "center",
              alignContent: "center",
            }}
          >
            <Grid item xs={12} md={6} lg={8}>
              <Typography
                sx={{
                  fontFamily: "Lato",
                  fontSize: "36px",
                  fontWeight: 700,
                  paddingBottom: "10px",
                }}
              >
                Customize Your<span style={{ color: "#09b2a0" }}> Tour</span>
              </Typography>
              <Typography sx={{ lineHeight: "24px" }}>
                You can plan your customized tour as well!. fill the form, we
                will get back to you!
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>
                <Button
                  sx={{
                    color: "white",
                    padding: "15px 50px",
                    fontWeight: "700",
                    backgroundColor: "#005D9D",
                    fontFamily: "poppins",
                    "&:hover": {
                      bgcolor: "#27488d",
                      color: "white",
                    },
                  }}
                  onClick={handleClick}
                >
                  CUSTOMIZE
                  <ArrowRightAltIcon
                    sx={{ "&:hover": { color: "white" }, color: "white" }}
                  />
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </>
  );
};

export default Pravas;
