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
import CustomiseTourPackage from "./CustomiseTourPackage";
import SharePravasCard from "./SharePravasCard";

interface IPravasProps {}

const Pravas: React.FunctionComponent<IPravasProps> = (props) => {
  //---------------- AllDatafetch -------------
  const [allPackage, setAllPackage] = React.useState<Array<any>>([]);
  const navigate = useNavigate();

  const loadPackages = () => {
    TourService.fetchAllTours(`?category=package`)
      .then((response) => {
        setAllPackage(response?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    loadPackages();
  }, []);

  const handleClick = () => {
    navigate("custom-tour-form");
  };

  return (
    <>
      <Helmet>
        <title>Pravas Tours</title>
        <meta name="description" content="Pravas Tourism" />
        <meta name="keywords" content="Pravas Tourism" />
      </Helmet>
      <Container>
        <Grid container marginY={10}>
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
      <StartFromTop />
      {/* *******************customize tour***************** */}
      <Outlet />
      <CustomiseTourPackage />
    </>
  );
};

export default Pravas;
