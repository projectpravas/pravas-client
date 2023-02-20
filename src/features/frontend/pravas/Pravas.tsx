import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import PravasPackageCard from "./PravasPackageCard";
import { Helmet } from "react-helmet";
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
  const [allPackage, setAllPackage] = React.useState<Array<any>>([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  let paramValue = searchParams.toString();
  const loadPackages = (paramValue = "") => {
    TourService.fetchAllTours(`?category=package&${paramValue}`)
      .then((response) => {
        setAllPackage(response?.data?.data);
        console.log("Sudhir res", response?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    loadPackages(paramValue);
  }, [searchParams]);

  const handleClick = () => {
    navigate("custom-tour-form");
  };

  console.log("sP", searchParams.toString());

  return (
    <>
      {/* <Container
        sx={{
          marginTop: "3%",
        }}
      >
        <SearchBar />
      </Container> */}

      <Helmet>
        <title>Pravas Tours</title>
        <meta name="description" content="Pravas Tourism" />
        <meta name="keywords" content="Pravas Tourism" />
      </Helmet>
      <Container>
        <Grid container marginY={10}>
          {Array.isArray(allPackage) &&
            allPackage.map((packageCardDetials, i) => (
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
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. text of the printing and typesetting industry. text of
                the printing and typesetting industry.
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
