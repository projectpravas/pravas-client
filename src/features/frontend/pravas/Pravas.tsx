import React, { useState } from "react";
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
import SearchBar from "../home/SearchBar";
import { useSearchParams } from "react-router-dom";
interface IPravasProps {}

const Pravas: React.FunctionComponent<IPravasProps> = (props) => {
  //---------------- AllDatafetch -------------
  const [allPackage, setAllPackage] = React.useState<any[]>([]);
  const [loadState, setLoadState] = React.useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  let paramValue = searchParams.toString();

  const loadPackages = (paramValue = "") => {
    TourService.fetchAllTours(`?category=package&${paramValue}`)
      .then((response) => {
        setAllPackage(response?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  paramValue = paramValue?.replaceAll("=all", "=");

  React.useEffect(() => {
    loadPackages(paramValue);
  }, [searchParams]);

  const handleClick = () => {
    navigate("custom-tour-form");
  };

  React.useEffect(() => {
    if (allPackage.length === 0) {
      setTimeout(() => {
        setLoadState(true);
      }, 2000);
    } else {
      setLoadState(false);
    }
  }, [allPackage]);

  return (
    <>
      <Grid container>
        <Container
          sx={{
            marginTop: { xs: "0%", md: "3%" },
            marginBottom: { xs: "15%", md: "0" },
            order: { xs: 2, md: 0 },
          }}
        >
          <SearchBar />
        </Container>

        {loadState && allPackage.length === 0 ? (
          <h1 style={{ textAlign: "center" }}>Not Available</h1>
        ) : (
          <Grid container sx={{ order: { xs: 1, md: 0 } }}>
            <Helmet>
              <title>Pravas Tours</title>
              <meta name="description" content="Pravas Tourism" />
              <meta name="keywords" content="Pravas Tourism" />
            </Helmet>
            <Container>
              <Grid
                container
                marginY={10}
                sx={{ justifyContent: { xs: "center" } }}
              >
                {Array.isArray(allPackage) &&
                  allPackage
                    .filter(
                      (v, i) =>
                        v.category === "package" && v.packageStatus === "active"
                    )
                    .map((packageCardDetials, i) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        sx={{
                          marginTop: "15px",
                          marginBottom: "15px",
                        }}
                        key={packageCardDetials?._id}
                      >
                        <PravasPackageCard {...packageCardDetials} />
                      </Grid>
                    ))}
              </Grid>
            </Container>
          </Grid>
        )}
        {/* *******************customize tour***************** */}
        <Outlet />
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            order: { xs: 3, md: 0 },
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
                  Customize Your
                  <span style={{ color: "#09b2a0" }}> Tour</span>
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
        <StartFromTop />
      </Grid>
    </>
  );
};

export default Pravas;
