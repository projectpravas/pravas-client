import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import PravasPackageCard from "./PravasPackageCard";
import { Helmet } from "react-helmet-async";
import TourService from "../../../services/TourService";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import StartFromTop from "../../../ui/GoToTop/StartFromTop";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Typography from "@mui/material/Typography";
import SearchBar from "../home/SearchBar";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAllTours, selectAllTours } from "../../../app/slices/TourSlice";
import TourModel from "../../../shared/models/tourModel";
import PravasCardList from "./PravasCardList";
import CustomiseTourPackage from "./CustomiseTourPackage";

interface IPravasProps {}

const Pravas: React.FunctionComponent<IPravasProps> = (props) => {
  //---------------- AllDatafetch -------------
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  let paramValue = searchParams.toString();

  paramValue = paramValue?.replaceAll("=all", "=");

  const showPravas =
    pathname.split("/")[pathname.split("/").length - 1] == "pravas";

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

      {showPravas && (
        <>
          <Container sx={{ marginTop: "40px" }}>
            <SearchBar />
          </Container>
          <Container>
            <Grid container marginY={5}>
              <PravasCardList />
            </Grid>
          </Container>

          <StartFromTop />

          {/* *******************customize tour***************** */}
          <Grid sx={{ marginBottom: "10px" }}>
            <CustomiseTourPackage />
          </Grid>
        </>
      )}
    </>
  );
};

export default Pravas;
