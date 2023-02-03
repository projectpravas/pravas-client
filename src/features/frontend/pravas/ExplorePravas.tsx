import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocalCarWashOutlinedIcon from "@mui/icons-material/LocalCarWashOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import Button from "@mui/material/Button";
import MUIDataTable from "mui-datatables";
import { styled } from "@mui/system";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

import { NavLink } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import packageCard from "./data";

// -----tableCellstyles---
const DattaTab = styled(TableCell)({
  color: "#5c5e64",

  letterSpacing: "-.2px",
  fontSize: "16px",
});

// ---ListItems styles=---
const ItemList = styled(ListItem)({
  display: "list-item",
  color: "#5c5e64",
  fontWeight: "500",
  letterSpacing: "-.2px",
  fontSize: "16px",
});

// ----Accordi0n typography style----
const TypoAccordion = styled(ListItem)({
  width: "33%",
  height: "3rem",
  flexShrink: 0,
  fontWeight: "800",
  paddingTop: "15px",
  color: "#555",
});
// ---TourInfoStyle----
const TypoTourInfo = styled(Typography)({
  color: "#757783",
  fontSize: "15px",
  fontWeight: "bold",
});

const CarouselStyle = styled(Carousel)({
  width: "90%",
  margin: "auto",
});

interface IExplorePravasProps {}

interface TourDetails {
  id?: number;
  heading?: string;
  image?: string[];
  price?: string;
  duration?: string;
  tourType?: string;
  seatAvability?: string;
  desc?: string;
  tour_plan?: [
    {
      day?: string;
      tPlanDesc?: string;
    }
  ];
  includes?: [
    {
      includeTour?: string;
    }
  ];
  exclude?: [
    {
      excludeTour?: string;
    }
  ];
}

const ExplorePravas: React.FunctionComponent<IExplorePravasProps> = ({}) => {
  const { id } = useParams();

  //    -----share button state-------
  const [visible, setVisible] = useState(false);
  // -----Accordion ------
  const [expanded, setExpanded] = useState<string | false>(false);
  const [tourDetails, setTourDetails] = useState<TourDetails>({
    id: NaN,
    image: [""],
    price: "",
    duration: "",
    heading: "",
    tourType: "",
    seatAvability: "",
    desc: "",
    tour_plan: [
      {
        day: "",
        tPlanDesc: "",
      },
    ],
    includes: [
      {
        includeTour: "",
      },
    ],
    exclude: [
      {
        excludeTour: "",
      },
    ],
  });

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // -------upcoming tour  info-----

  const columns = [
    {
      name: "tourDates",
      label: "Tour Dates",
    },
    {
      name: "seats",
      label: "Seats",
    },
  ];

  const data = [{ tourDates: "26 to 30 Dec 2022", seats: "Full" }];

  useEffect(() => {
    const tourObj = packageCard.find(
      (obj) => Number(obj?.id) == Number(id)
    ) as TourDetails;
    setTourDetails(tourObj);
  }, [id]);

  return (
    <Grid>
      {/* slides of karshmir image */}
      <Grid style={{ backgroundColor: "#eee" }}>
        <CarouselStyle autoPlay>
          <div style={{ height: "500px" }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src="https://cdn.wallpapersafari.com/6/59/Lqkei8.jpg"
            />
          </div>
          <div style={{ height: "500px" }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src="https://pravasthejourney.com/wp-content/uploads/2021/09/KASHMIR4.jpg"
            />
          </div>

          <div style={{ height: "500px" }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src="https://media.istockphoto.com/id/485422676/photo/shikara-boats-on-dal-lake-srinagar.jpg?s=612x612&w=0&k=20&c=AnenqHTLf68PPJVtke7MoktZoQ4tLs8mXTvedeTSPOk="
            />
          </div>
          <div style={{ height: "500px" }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src="https://pravasthejourney.com/wp-content/uploads/2021/09/KASHMIR4.jpg"
            />
          </div>
        </CarouselStyle>
      </Grid>
      {/* Heading of Tour   */}
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: "#FBF6D9",
          borderTopBottom: { xs: "1px solid gray" },
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            height: "100px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              margin: "auto",
            }}
          >
            {tourDetails?.heading}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            sx={{
              height: "100px",
              display: "flex",
              alignItems: "center",
              padding: "25px",
            }}
          >
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                display: "flex",
              }}
            >
              <AccountBalanceWalletOutlinedIcon
                sx={{ color: "#357EC7", fontSize: "200%" }}
              />

              <Box>
                <Typography sx={{ color: "gray", fontWeight: "bold" }}>
                  Total Cost
                </Typography>
                <Typography sx={{ color: "#0d6efd" }}>
                  {`₹${tourDetails?.price}`}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                display: "flex",
              }}
            >
              <AccessTimeOutlinedIcon
                sx={{ color: "#357EC7", fontSize: "200%" }}
              />

              <Box>
                <Typography sx={{ color: "gray", fontWeight: "bold" }}>
                  Duration
                </Typography>
                <Typography> {tourDetails?.duration}</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                display: "flex",
              }}
            >
              <LocalCarWashOutlinedIcon
                sx={{ color: "#357EC7", fontSize: "200%" }}
              />

              <Box>
                <Typography sx={{ color: "gray", fontWeight: "bold" }}>
                  TourType
                </Typography>
                <NavLink
                  to=""
                  style={{ textDecoration: "none", fontWeight: "bold" }}
                >
                  {tourDetails?.tourType}
                </NavLink>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* ----------------------share and review----------------------------- */}

      {/* ------share and review----------- */}
      <Grid sx={{ backgroundColor: "#00000021" }}>
        <Container
          sx={{
            height: "100px",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <Grid
            item
            sx={{ position: "relative", height: "35px", alignItems: "center" }}
          >
            <Button variant="contained" onClick={() => setVisible(!visible)}>
              <NearMeOutlinedIcon />
              {visible ? "Share" : "  Share"}
            </Button>

            {visible && (
              <Grid
                sx={{
                  backgroundColor: "#fff",
                  height: "200%",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "10px",
                  marginLeft: 2,
                  position: "absolute",
                  top: "-19px",
                  right: {
                    lg: "px",
                    xs: "110px",
                  },
                }}
              >
                <Link
                  sx={{ padding: "10px" }}
                  href="http://twitter.com/share?text=Kashmir+4N5D&amp;url=https%3A%2F%2Fpravasthejourney.com%2Fbooking%2Fkashmir-4n5d%2F"
                  target="_blank"
                >
                  <TwitterIcon sx={{ fontSize: "200%" }} />
                </Link>
                <Link
                  sx={{ padding: "10px" }}
                  href="http://www.facebook.com/sharer.php?s=100&amp;p[url]=https%3A%2F%2Fpravasthejourney.com%2Fbooking%2Fkashmir-4n5d%2F&amp;p[title]=Kashmir+4N5D"
                  target="_blank"
                >
                  <FacebookIcon sx={{ fontSize: "200%" }} />
                </Link>
                <Link
                  sx={{ padding: "10px", fontWeight: "200" }}
                  href="http://www.facebook.com/sharer.php?s=100&amp;p[url]=https%3A%2F%2Fpravasthejourney.com%2Fbooking%2Fkashmir-4n5d%2F&amp;p[title]=Kashmir+4N5D"
                  target="_blank"
                >
                  {"t"}
                  {/* <ImTumblr style={{ fontSize: "200%" }} /> */}
                </Link>
                <Link
                  sx={{ padding: "10px" }}
                  href="http://linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fpravasthejourney.com%2Fbooking%2Fkashmir-4n5d%2F&amp;title=Kashmir+4N5D"
                  target="_blank"
                >
                  <LinkedInIcon style={{ fontSize: "200%" }} />
                </Link>
              </Grid>
            )}
          </Grid>
          <Grid item>
            <Button variant="contained" sx={{ m: 2 }}>
              <NearMeOutlinedIcon />
              Review
            </Button>
          </Grid>
        </Container>
      </Grid>

      {/*--- kashmir description------ */}
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={8}>
            <Typography variant="h5" sx={{ fontWeight: "800", p: 2 }}>
              {tourDetails?.heading}
            </Typography>
            <Typography
              sx={{
                color: "gray",
                lineHeight: "1.86em",
                letterSpacing: "-.2px",
                fontSize: "16px",
              }}
            >
              {tourDetails?.desc}
            </Typography>
            <Divider sx={{ p: 3 }} />
            <Typography variant="h5" sx={{ fontWeight: "800", p: 2 }}>
              Tour Plan
            </Typography>

            <Box sx={{ border: "1px solid #00000021", borderRadious: "5px" }}>
              <Grid
                style={{ padding: "10px", fontWeight: "800", color: "#555" }}
              >
                <span>Year</span>-{new Date().getFullYear()}
              </Grid>

              {/* --------Accordian  of tour plan------------ */}

              <div>
                {/*----- Upcoming tours---- */}
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                  style={{ margin: " 30px 0px " }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{ backgroundColor: "#faf5ee" }}
                  >
                    <TypoAccordion
                      sx={{
                        width: "33%",
                        flexShrink: 0,
                        fontWeight: "800",
                        height: "3rem",
                        paddingTop: "15px",
                        color: "#555",
                      }}
                    >
                      Upcoming Tours Dates
                    </TypoAccordion>
                  </AccordionSummary>
                  <AccordionDetails sx={{ color: "#5c5e64" }}>
                    <MUIDataTable
                      title={"UpComing-Tours"}
                      columns={columns}
                      data={data}
                    />
                  </AccordionDetails>
                </Accordion>

                {/* ----TourPlan-- */}
                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                  style={{ margin: " 30px 0px " }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                    sx={{ backgroundColor: "#faf5ee" }}
                  >
                    <TypoAccordion>Tour Plan</TypoAccordion>
                  </AccordionSummary>

                  <AccordionDetails>
                    {Array.isArray(packageCard) &&
                      packageCard.map((pack) => (
                        <>
                          {Array.isArray(pack?.tour_plan) &&
                            pack?.tour_plan.map((tour, i) => (
                              <>
                                <Typography
                                  sx={{
                                    color: "#5c5e64",
                                    lineHeight: "1.86em",
                                    letterSpacing: "-.2px",
                                    fontSize: "16px",
                                    margin: "10px",
                                  }}
                                >
                                  <b>{tour?.day}</b>
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "#5c5e64",
                                    lineHeight: "1.86em",
                                    letterSpacing: "-.2px",
                                    fontSize: "16px",
                                    margin: "10px",
                                  }}
                                >
                                  {tour?.tPlanDesc}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "#5c5e64",
                                    lineHeight: "1.86em",
                                    letterSpacing: "-.2px",
                                    fontSize: "16px",
                                    margin: "10px",
                                  }}
                                >
                                  <b> Meals:</b> Dinner
                                </Typography>
                              </>
                            ))}
                        </>
                      ))}
                  </AccordionDetails>
                </Accordion>
                {/* ----Hotels-- */}
                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                  style={{ margin: " 30px 0px " }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                    sx={{ backgroundColor: "#faf5ee" }}
                  >
                    <TypoAccordion>Hotels</TypoAccordion>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Paper>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <DattaTab sx={{ fontWeight: "800" }}>
                                City
                              </DattaTab>
                              <DattaTab sx={{ fontWeight: "800" }}>
                                Hotels
                              </DattaTab>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <DattaTab>Srinagar</DattaTab>
                              <DattaTab>
                                Hotel grand Kaiser / Palm Spring / Similar
                              </DattaTab>
                            </TableRow>
                            <TableRow>
                              <DattaTab>Pahalgam</DattaTab>
                              <DattaTab>
                                Green Heights / Pahalgam Retreat / Similar
                              </DattaTab>
                            </TableRow>
                            <TableRow>
                              <DattaTab>Srinagar House Boat</DattaTab>
                              <DattaTab>
                                Dawn Group of Houseboats / Similar
                              </DattaTab>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </AccordionDetails>
                </Accordion>
                {/* ----Include-- */}
                <Accordion
                  expanded={expanded === "panel4"}
                  onChange={handleChange("panel4")}
                  style={{ margin: " 30px 0px " }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel3bh-header"
                    sx={{ backgroundColor: "#faf5ee" }}
                  >
                    <TypoAccordion>Includes</TypoAccordion>
                  </AccordionSummary>
                  <AccordionDetails>
                    {Array.isArray(packageCard) &&
                      packageCard.map((inc) => (
                        <>
                          {Array.isArray(inc?.includes) &&
                            inc?.includes.map((incList, i) => (
                              <List
                                key={i}
                                sx={{ listStyleType: "disc", pl: 2 }}
                              >
                                <ItemList>{incList?.includeTour}</ItemList>
                              </List>
                            ))}
                        </>
                      ))}
                  </AccordionDetails>
                </Accordion>
                {/* ----Exclude-- */}
                <Accordion
                  expanded={expanded === "panel5"}
                  onChange={handleChange("panel5")}
                  style={{ margin: " 30px 0px " }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5bh-content"
                    id="panel3bh-header"
                    sx={{ backgroundColor: "#faf5ee" }}
                  >
                    <TypoAccordion>Excludes</TypoAccordion>
                  </AccordionSummary>
                  <AccordionDetails>
                    {Array.isArray(packageCard) &&
                      packageCard.map((exc) => (
                        <>
                          {Array.isArray(exc?.exclude) &&
                            exc?.exclude.map((excList, i) => (
                              <List
                                key={i}
                                sx={{ listStyleType: "disc", pl: 2 }}
                              >
                                <ItemList>{excList?.excludeTour}</ItemList>
                              </List>
                            ))}
                        </>
                      ))}
                  </AccordionDetails>
                </Accordion>
                {/* ----Notes-- */}
                <Accordion
                  expanded={expanded === "panel6"}
                  onChange={handleChange("panel6")}
                  style={{ margin: " 30px 0px " }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel6bh-content"
                    id="panel3bh-header"
                    sx={{ backgroundColor: "#faf5ee" }}
                  >
                    <TypoAccordion>Note</TypoAccordion>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List sx={{ listStyleType: "disc", pl: 2 }}>
                      <ItemList>
                        Due to
                        <b> Local Taxi Operators/Pony Walas Union Rules</b> at
                        Hill stations like Sonmarg, Gulmarg & Pahalgam a tourist
                        is bound to use local cab or pony service to access and
                        explore local points of interest that are mentioned in
                        our detailed itinerates..
                      </ItemList>
                      <ItemList>
                        <b> Gondola (Cable Car )</b> at Gulmarg has two phases,
                        Phase I - Gulmarg to Kongdori 3500 ft & Phase II -
                        Kongdori – Affarwat Peak 14000ft above the sea level.
                        <Typography>
                          <b>Ticket bookings</b> can be done at -
                          <Link
                            href="https://jkcablecar.payu.in/"
                            target="_blank"
                          >
                            https://jkcablecar.payu.in/
                          </Link>
                        </Typography>
                      </ItemList>

                      <ItemList>
                        Carry Original ID Proof (Aadhar Card/ Driving License/
                        Voter ID) & Xerox copy of same.
                      </ItemList>
                      <ItemList>
                        Above mentioned Itinerary is subject to change without
                        any prior notice.
                      </ItemList>
                      <ItemList>
                        In case of non-availability of Rooms similar Category
                        Hotels will be provided.
                      </ItemList>
                      <ItemList>
                        Any expenses incurred due to weather problems, pandemic
                        outbreak, technical issues, forced instances, natural
                        calamities, political disturbances, strikes that cause
                        delays the will be charged extra, and directly payable
                        by Guest.
                      </ItemList>
                      <ItemList>
                        Company’s Terms and Conditions applicable. (
                        <Link
                          href="https://pravasthejourney.com/terms-and-conditions/"
                          target="_blank"
                        >
                          https://pravasthejourney.com/terms-and-conditions/
                        </Link>
                        )
                      </ItemList>
                      <ItemList>
                        Cancelation policy mentioned on our website is
                        applicable. (
                        <Link
                          href="https://pravasthejourney.com/cancellation-refund/ "
                          target="_blank"
                        >
                          https://pravasthejourney.com/cancellation-refund/
                        </Link>
                        )
                      </ItemList>
                      <ItemList>
                        Consumption of tobacco products and alcohol is strictly
                        prohibited.
                      </ItemList>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </div>
            </Box>
          </Grid>
          {/*---------- ---Tour Information--------------- */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper sx={{ p: 4, borderRadious: "10px", mt: 5 }}>
              <Typography variant="h5" sx={{ fontWeight: "800", p: 2 }}>
                Tour Information
              </Typography>
              <Box sx={{ padding: "0px 0px 10px 10px" }}>
                <Grid sx={{ display: "flex", padding: "10px 10px 10px 0" }}>
                  <Box>
                    <Typography>
                      <PeopleAltOutlinedIcon sx={{ color: "#2c5799" }} />
                    </Typography>
                  </Box>
                  <Box sx={{ marginLeft: "10px" }}>
                    <TypoTourInfo>Max Gauests</TypoTourInfo>
                    <TypoTourInfo>15</TypoTourInfo>
                  </Box>
                </Grid>
                <Grid sx={{ display: "flex" }}>
                  <Box>
                    <Typography>
                      <DirectionsCarIcon sx={{ color: "#2c5799" }} />
                    </Typography>
                  </Box>
                  <Box sx={{ marginLeft: "10px" }}>
                    <TypoTourInfo>your Location</TypoTourInfo>
                    <Typography>
                      <Link
                        sx={{
                          textDecoration: "none",
                          color: "#2c5799",
                          fontWeight: "bolder",
                        }}
                        href="https://pravasthejourney.com/ba_location/kashmir/"
                      >
                        Kashmir
                      </Link>
                    </Typography>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default ExplorePravas;