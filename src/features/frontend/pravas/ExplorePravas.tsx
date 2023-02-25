import React, { useState, useEffect, useRef } from "react";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LocalCarWashOutlinedIcon from "@mui/icons-material/LocalCarWashOutlined";

import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Carousel from "react-material-ui-carousel";
import { styled } from "@mui/system";

import {
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { endPoints } from "../../../api";
import TourService from "../../../services/TourService";
import { useParams } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import handlePayment from "../../../shared/razor-pay/razorPay-payment";
import UserModel from "../../../shared/models/userModel";

import {
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableBody,
  TableCell,
} from "@mui/material";
import PravasHomeCarousel from "../home/PravasHomeCarousel";
import StartFromTop from "../../../ui/GoToTop/StartFromTop";
import OwlCarousel from "react-owl-carousel";

import MustWatchcard from "./MustWatchCard";
import ReviewSection from "./ReviewSection";
import TourModel from "../../../shared/models/tourModel";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../../app/slices/AuthSlice";
import { errorToast } from "../../../ui/toast/Toast";

import LoginWindow from "../../../ui/loginwindow/LoginWindow";

import ShareButtonBooking from "./ShareButtonBooking";
import ReviewCarousel from "../home/ReviewCarousel";
import ExploreReviewCarousal from "./Review-carousal/ExploreReviewCarousal";

const options = {
  lazyLoad: true,
  loop: true,
  autoplay: true,
  autoplayHoverPause: true,
  margin: 0,
  responsiveClass: true,
  nav: true,
  dots: false,
  smartSpeed: 1000,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 1,
    },
    600: {
      items: 2,
    },
    700: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
};

// -----tableCellstyles---
const DataTab = styled(TableCell)({
  color: "#5c5e64",
  border: "1px solid gray ",
  letterSpacing: "-.2px",
  fontSize: "16px",
  textAlign: "center",
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
interface Iitinerary {
  day: number | string;
  planTitle: string;
  planDesc: string;
  meals: {
    breakfast: boolean;
    dinner: boolean;
    lunch: boolean;
  };
}
interface Ihotel {
  city?: any | undefined;
  hotelNames?: any | undefined;
}
interface IInclude {
  include: string;
}
interface Iexclude {
  exclude: string;
}
interface Inote {
  note: string;
}
interface TourDetails {
  images: string[] | any;
  _id: string;
  title: string;
  tourDesc: string;
  price: string | number;
  duration: any;
  maxPersons: number | string;
  tourType: string[];
  feedbacks: string[];
  tourPlan?: {
    itinerary: Iitinerary[];
    hotels?: Ihotel[] | any;
    includes: IInclude[];
    excludes: Iexclude[];
    tourNotes: Inote[];
    scheduleDate?: string[] | any[];
  };
}
const ExplorePravas: React.FunctionComponent<IExplorePravasProps> = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentLoggedUser: UserModel = useSelector(
    selectLoggedUser
  ) as UserModel;

  //    -----share button state-------
  const [visible, setVisible] = useState(false);
  // -----Accordion ------
  const [expanded, setExpanded] = useState<string | false>(false);
  const [tourDetails, setTourDetails] = useState<TourDetails>();

  const [allPackageWatch, setAllPackageWatch] = useState<TourDetails>();
  const [bookingDates, setBookingDates] = useState<TourModel[]>([]);
  const [openLoginWindowStatus, setOpenLoginWindowStatus] = useState(false);

  console.log("tourDetails: ", tourDetails);

  const handleClickChange = () => {
    setExpanded("panel1");
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleClick = () => {
    navigate("/pravas/explore/custom-tour-form");
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
  //*************tour location table******************** */
  const tableData = tourDetails?.tourPlan?.hotels;

  //**************must watch filter***************

  const loadExplore = () => {
    TourService.fetchOneTour(id as string)

      .then((response) => {
        setTourDetails(response?.data?.data);
        setAllPackageWatch(response?.data?.data);
        // const tourObj = result.find((obj) => obj?._id == id);
        // if (tourObj) setTourDetails(tourObj);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLoginOpen = () => {
    setOpenLoginWindowStatus(true);
  };

  const handleLoginClose = () => {
    setOpenLoginWindowStatus(false);
  };

  const handleBooking = (price: string, customerId: string, tourId: string) => {
    if (!price || !tourId) return errorToast("Failed... Try Again...", 3000);
    if (!customerId) {
      handleLoginOpen();
      return;
    }

    price && customerId && tourId && handlePayment(price, customerId, tourId);
  };

  const fetchUpcomingTours = () => {
    TourService.fetchUpcomingTours(id)
      .then((res) => {
        const result: TourModel[] = res?.data?.data ? res?.data?.data : [];
        Array.isArray(result) &&
          result.sort((p1: TourModel, p2: TourModel) =>
            new Date(p1?.tourDate as string) < new Date(p2?.tourDate as string)
              ? -1
              : new Date(p1?.tourDate as string) >
                new Date(p2?.tourDate as string)
              ? 1
              : 0
          );

        setBookingDates(result);
      })
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    loadExplore();
    fetchUpcomingTours();
  }, [id]);

  return (
    <Grid>
      <Outlet />
      <Helmet>
        <title>{tourDetails?.title}</title>
        <meta name="description" content={tourDetails?.tourDesc} />
        <meta name="keywords" content={tourDetails?.tourDesc} />
      </Helmet>
      <LoginWindow
        open={openLoginWindowStatus}
        handleOpen={handleLoginOpen}
        handleClose={handleLoginClose}
      />

      {/* *******************slides of karshmir image ********************/}
      <OwlCarousel className=" owl-nav-explore" {...options}>
        <Grid item>
          <img
            style={{ height: "275px" }}
            src={`${endPoints?.serverBaseURL}/${tourDetails?.images[0]}`}
          />
        </Grid>
        <Grid item>
          <img
            style={{ height: "275px" }}
            src={`${endPoints?.serverBaseURL}/${tourDetails?.images[1]}`}
          />
        </Grid>
        <Grid item>
          <img
            style={{ height: "275px" }}
            src={`${endPoints?.serverBaseURL}/${tourDetails?.images[2]}`}
          />
        </Grid>
      </OwlCarousel>
      {/* ************** Heading of Tour *******************    */}
      <Grid sx={{ backgroundColor: "#faf5ee" }}>
        <Container>
          <Grid
            container
            spacing={2}
            sx={{
              backgroundColor: "#faf5ee",
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
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                {tourDetails?.title}
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
                    sx={{
                      color: "#357EC7",
                      fontSize: "1.5rem",
                    }}
                  />

                  <Box sx={{ marginLeft: "8px" }}>
                    <Typography
                      sx={{
                        color: " #3e3d3d",
                        fontWeight: "300",
                        fontSize: "14px",
                        fontFamily: "poppins",
                      }}
                    >
                      Total Cost
                    </Typography>
                    <Typography
                      sx={{
                        color: "#000000",
                        fontFamily: "poppins",
                        fontSize: "1rem",
                        fontWeight: "600",
                      }}
                    >
                      {`₹ ${tourDetails?.price}`}
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
                    sx={{
                      color: "#357EC7",
                      fontSize: "1.5rem",
                    }}
                  />

                  <Box sx={{ marginLeft: "8px" }}>
                    <Typography
                      sx={{
                        color: " #3e3d3d",
                        fontWeight: "300",
                        fontSize: "14px",
                        fontFamily: "poppins",
                      }}
                    >
                      Duration
                    </Typography>
                    <Typography
                      sx={{
                        color: "#000000",
                        fontSize: "1rem",
                        fontWeight: "700",
                        fontFamily: "poppins",
                      }}
                    >
                      {tourDetails?.duration?.days} days
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
                  <LocalCarWashOutlinedIcon
                    sx={{ color: "#357EC7", fontSize: "1.5rem" }}
                  />

                  <Box sx={{ marginLeft: "8px" }}>
                    <Typography
                      sx={{
                        color: " #3e3d3d",
                        fontWeight: "300",
                        fontSize: "14px",
                        fontFamily: "poppins",
                      }}
                    >
                      TourType
                    </Typography>
                    <NavLink
                      to=""
                      style={{
                        textDecoration: "none",
                        color: "#000000",
                        fontFamily: "poppins",
                        fontSize: "1rem",
                        fontWeight: "700",
                      }}
                      key={tourDetails?._id}
                    >
                      {tourDetails?.tourType.join(" ")}
                    </NavLink>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
      {/* ----**************--share and review-------****************---- */}
      <Grid
        sx={{ backgroundColor: "white", borderBottom: "1px solid #faf5ee" }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            height: "100px",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            marginRight: "10px",
            width: "100%",
          }}
        >
          <Grid item>
            <a href="#booking-table" style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  // bgcolor: "#f0f3f6",
                  color: "white",
                  fontWeight: "700",
                  backgroundColor: "#27488d",
                  fontFamily: "poppins",
                  "&:hover": {
                    bgcolor: "#27488d",
                    color: "white",
                  },
                }}
                onClick={() => {
                  handleClickChange();
                }}
              >
                Booking
              </Button>
            </a>
          </Grid>
          {/* *******************share button******************** */}

          <Grid item sx={{ position: "relative" }}>
            <ShareButtonBooking />
          </Grid>

          {/* *************review button*************************/}
          <Grid item>
            <Button
              sx={{
                marginLeft: "10px",
                bgcolor: "#f0f3f6",
                color: "#838590",
                fontWeight: "700",
                fontFamily: "poppins",
                "&:hover": {
                  bgcolor: "#27488d",
                  color: "white",
                },
              }}
            >
              <NearMeOutlinedIcon />
              Review
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {/*-*****************-- kashmir description---*************--- */}
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} lg={8}>
            <Typography variant="h5" sx={{ fontWeight: "800", py: 2 }}>
              {tourDetails?.title}
            </Typography>
            <Typography
              sx={{
                color: "gray",
                lineHeight: "1.86em",
                letterSpacing: "-.2px",
                fontSize: "16px",
              }}
            >
              {tourDetails?.tourDesc}
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: "800", my: "20px" }}>
              Tour Plan
            </Typography>

            <Box sx={{ borderRadious: "5px" }}>
              {/* ---*****************-----Accordian  of tour plan------*******------ */}

              <div>
                {/*----*******************- Upcoming tours---*********************- */}

                <Accordion
                  elevation={0}
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                  style={{
                    backgroundColor: "#faf5ee",
                    borderRadius: "8px",
                    margin: " 30px 0px ",
                  }}
                  sx={{
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{ borderRadius: "10px", backgroundColor: "#faf5ee" }}
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
                  <AccordionDetails
                    sx={{
                      color: "#5c5e64",
                      backgroundColor: "white",
                      border: "1px  solid #faf5ee",
                      borderTop: "none",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                  >
                    <TableContainer id="booking-table">
                      <Table sx={{ border: "1px solid gray" }}>
                        <TableHead>
                          <TableRow>
                            <DataTab rowSpan={2} sx={{ width: "10%" }}>
                              Sr No
                            </DataTab>
                            <DataTab rowSpan={2} sx={{ width: "30%" }}>
                              TourName
                            </DataTab>
                            <DataTab rowSpan={1} colSpan={2}>
                              Tour Dates
                            </DataTab>
                            <DataTab rowSpan={2} sx={{ width: "15%" }}>
                              Booking
                            </DataTab>
                          </TableRow>
                          <TableRow>
                            <DataTab
                              sx={{ width: "30%" }}
                              rowSpan={1}
                              colSpan={1}
                            >
                              To
                            </DataTab>
                            <DataTab
                              sx={{ width: "30%" }}
                              rowSpan={1}
                              colSpan={1}
                            >
                              From
                            </DataTab>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Array.isArray(bookingDates) &&
                          bookingDates?.length > 0 ? (
                            bookingDates.map((obj: string | any, i: number) => (
                              <TableRow
                                key={obj._id + i}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <DataTab component="th" scope="row">
                                  {i + 1}
                                </DataTab>
                                <DataTab align="right">{obj?.title}</DataTab>
                                <DataTab align="right">
                                  {new Intl.DateTimeFormat("en-IN").format(
                                    new Date(
                                      new Date(`${obj?.tourDate}`).setDate(
                                        new Date(`${obj?.tourDate}`).getDate()
                                      )
                                    )
                                  )}
                                </DataTab>
                                <DataTab align="right">
                                  {new Intl.DateTimeFormat("en-IN").format(
                                    new Date(
                                      new Date(`${obj?.tourDate}`).setDate(
                                        new Date(`${obj?.tourDate}`).getDate() +
                                          Number(`${obj?.duration?.days}`)
                                      )
                                    )
                                  )}
                                </DataTab>
                                <DataTab
                                  align="right"
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    // disabled={
                                    //   currentLoggedUser?._id ? false : true
                                    // }
                                    sx={{
                                      bgcolor: "#2c5799",
                                      color: "white",
                                      borderRadius: "15px",
                                      fontSize: "12px",
                                    }}
                                    onClick={() =>
                                      handleBooking(
                                        obj?.price,
                                        currentLoggedUser?._id as string,
                                        obj?._id
                                      )
                                    }
                                  >
                                    Booking
                                  </Button>
                                </DataTab>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              <DataTab
                                colSpan={5}
                                sx={{
                                  textAlign: "center",
                                  fontSize: "16px",
                                  fontFamily: "poppins",
                                }}
                              >
                                {"Currently no Tour sheduled for this package"}
                              </DataTab>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>

                {/* --***********************--TourPlan-******************- */}
                <Accordion
                  elevation={0}
                  expanded={expanded === "panel2"}
                  onChange={handleChange("panel2")}
                  style={{
                    margin: " 30px 0px ",
                    backgroundColor: "#faf5ee",
                    borderRadius: "8px",
                  }}
                  sx={{
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                    sx={{ borderRadius: "10px", backgroundColor: "#faf5ee" }}
                  >
                    <TypoAccordion>iternary/Tour Plan</TypoAccordion>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                      backgroundColor: "white",

                      border: "1px  solid #faf5ee",
                      borderTop: "none",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                  >
                    {Array.isArray(tourDetails?.tourPlan?.itinerary) &&
                      tourDetails?.tourPlan?.itinerary.map((dayPlan, i) => (
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
                            <b>
                              Day: {dayPlan?.day} {dayPlan?.planTitle}
                            </b>
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
                            {dayPlan?.planDesc}
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
                            <b> Meals:</b>
                            {Object.entries(dayPlan?.meals)
                              .map((obj) => {
                                if (obj[1]) return obj[0];
                              })
                              .filter((v) => v)
                              .join(" ")}
                          </Typography>
                        </>
                      ))}
                  </AccordionDetails>
                </Accordion>
                {/* --********************--Hotels--************************* */}
                <Accordion
                  elevation={0}
                  expanded={expanded === "panel3"}
                  onChange={handleChange("panel3")}
                  style={{
                    margin: " 30px 0px ",
                    borderRadius: "10px",
                  }}
                  sx={{
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                    sx={{
                      borderRadius: "10px",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      backgroundColor: "#faf5ee",
                    }}
                  >
                    <TypoAccordion sx={{ backgroundColor: "#faf5ee" }}>
                      Hotels
                    </TypoAccordion>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      color: "#5c5e64",
                      backgroundColor: "white",

                      border: "1px  solid #faf5ee",
                      borderTop: "none",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                  >
                    <table
                      style={{
                        borderSpacing: "0px",
                        margin: "0px 5px 0px 5px",
                      }}
                    >
                      <tr>
                        <th
                          style={{
                            border: "1px solid gray",
                            padding: "10px 0 10px 0",
                          }}
                        >
                          City
                        </th>
                        <th
                          style={{
                            border: "1px solid gray",
                            padding: "10px 0 10px 0",
                            width: "100%",
                          }}
                        >
                          Hotel
                        </th>
                      </tr>
                      {Array.isArray(tableData) &&
                        tableData.map((ele: any, i: number) => {
                          return (
                            <tr
                              key={i}
                              style={{
                                border: "1px solid gray",
                                padding: "5px",
                              }}
                            >
                              <td
                                style={{
                                  border: "1px solid gray",
                                  padding: "5px 15px 5px 15px",
                                  fontSize: "14px",
                                }}
                              >
                                {ele?.city}
                              </td>
                              <td
                                style={{
                                  border: "1px solid gray",
                                  padding: "5px 15px 5px 15px",
                                  fontSize: "14px",
                                }}
                              >
                                {ele?.hotelNames}
                              </td>
                            </tr>
                          );
                        })}
                    </table>
                  </AccordionDetails>
                </Accordion>

                {/* -****************---Include-- ****************/}
                <Accordion
                  elevation={0}
                  expanded={expanded === "panel4"}
                  onChange={handleChange("panel4")}
                  style={{
                    margin: " 30px 0px ",
                    backgroundColor: "#faf5ee",
                    borderRadius: "8px",
                  }}
                  sx={{
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel3bh-header"
                    sx={{ borderRadius: "10px", backgroundColor: "#faf5ee" }}
                  >
                    <TypoAccordion>Includes</TypoAccordion>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      color: "#5c5e64",
                      backgroundColor: "white",

                      border: "1px  solid #faf5ee",
                      borderTop: "none",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                  >
                    {Array.isArray(tourDetails?.tourPlan?.includes) &&
                      tourDetails?.tourPlan?.includes.map(
                        (incList: any, i: number) => (
                          <>
                            <List
                              key={incList?._id + i}
                              sx={{
                                listStyleType: "disc",
                                pl: 2,
                              }}
                            >
                              <ItemList sx={{ marginBottom: "-25px" }}>
                                {incList?.include}
                              </ItemList>
                            </List>
                          </>
                        )
                      )}
                  </AccordionDetails>
                </Accordion>

                {/* ---********************-Exclude--*********************** */}
                <Accordion
                  elevation={0}
                  expanded={expanded === "panel5"}
                  onChange={handleChange("panel5")}
                  style={{
                    margin: " 30px 0px ",
                    backgroundColor: "#faf5ee",
                    borderRadius: "8px",
                  }}
                  sx={{
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5bh-content"
                    id="panel3bh-header"
                    sx={{ borderRadius: "10px", backgroundColor: "#faf5ee" }}
                  >
                    <TypoAccordion>Excludes</TypoAccordion>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      color: "#5c5e64",
                      backgroundColor: "white",
                      border: "1px  solid #faf5ee",
                      borderTop: "none",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                  >
                    {Array.isArray(tourDetails?.tourPlan?.excludes) &&
                      tourDetails?.tourPlan?.excludes.map(
                        (excList: any, i: number) => (
                          <>
                            <List
                              key={excList.exclude + i}
                              sx={{
                                listStyleType: "disc",
                                pl: 2,
                              }}
                            >
                              <ItemList sx={{ marginBottom: "-25px" }}>
                                {excList?.exclude}
                              </ItemList>
                            </List>
                          </>
                        )
                      )}
                  </AccordionDetails>
                </Accordion>
                {/* --***************--Notes--**************************** */}
                <Accordion
                  elevation={0}
                  expanded={expanded === "panel6"}
                  onChange={handleChange("panel6")}
                  style={{
                    margin: " 30px 0px ",
                    backgroundColor: "#faf5ee",
                    borderRadius: "8px",
                  }}
                  sx={{
                    "&:before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel6bh-content"
                    id="panel3bh-header"
                    sx={{ borderRadius: "10px", backgroundColor: "#faf5ee" }}
                  >
                    <TypoAccordion>Note</TypoAccordion>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      color: "#5c5e64",
                      backgroundColor: "white",
                      borderBottom: "1px  solid #ddd",
                      border: "1px  solid #faf5ee",
                      borderTop: "none",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                  >
                    {Array.isArray(tourDetails?.tourPlan?.tourNotes) &&
                      tourDetails?.tourPlan?.tourNotes.map(
                        (noteList: any, i: number) => (
                          <>
                            <List
                              key={noteList?.note + i}
                              sx={{
                                listStyleType: "disc",
                                pl: 2,
                              }}
                            >
                              <ItemList sx={{ marginBottom: "-25px" }}>
                                {noteList?.note}
                              </ItemList>
                            </List>
                          </>
                        )
                      )}
                  </AccordionDetails>
                </Accordion>
                {/* reviews */}
                <ReviewSection />
              </div>
            </Box>
          </Grid>
          {/*---------- *****---Tour Information------***--------- */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              elevation={0}
              sx={{
                border: "1px solid #faf5ee ",
                p: 4,
                borderRadius: "10px",
                mt: 5,
              }}
            >
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
                    <TypoTourInfo>Max Guests</TypoTourInfo>
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
            {/*************************must Watch************************ */}

            <MustWatchcard />
          </Grid>
        </Grid>
      </Container>
      {/* Package Card Carousel  */}
      <Container>
        {/* <PravasHomeCarousel /> */}

        {/* <ReviewCarousel /> */}
      </Container>
      <StartFromTop />
      <Outlet />
      {/* ------------------------------------------------------------Reviews Carousal */}
      <Container>
        <ExploreReviewCarousal data={tourDetails?.feedbacks as any} />
      </Container>
      {/* -------------------------------------------------------------Customize Tour  */}
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          marginY: "20px",
        }}
      >
        <Container
          sx={{
            padding: "20px",
            width: "70%",

            borderRadius: "20px",
            boxShadow: "3px 3px 17px 0px rgba(0,0,0,0.2)",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",

              justifyContent: "space-evenly",
            }}
          >
            <Grid
              item
              xs={12}
              md={8}
              lg={9}
              sx={{ paddingRight: "20px", marginBottom: { xs: "20px" } }}
            >
              <Typography
                sx={{
                  fontFamily: "Lato",
                  fontSize: "2rem",
                  fontWeight: 700,
                }}
              >
                Customize Your<span style={{ color: "#27488d" }}> Tour</span>
              </Typography>
              <Typography sx={{ lineHeight: "24px" }}>
                You can plan your customized tour as well!.
              </Typography>
              <Typography sx={{ lineHeight: "24px" }}>
                fill the form, we will get back to you!
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              lg={3}
              sx={{
                display: "flex",

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
    </Grid>
  );
};

export default ExplorePravas;
