import React, { useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useDnD from "../../../shared/draganddrop/useDnD";
import defineTourYupSchema from "../../../shared/yup-validations/tour-validation/tourYupValidation";

import { Form, ErrorMessage, FieldArray, FormikProvider } from "formik";

import { Formik } from "formik";
// import defineInitialTour from "../../../shared/yup-validations/tour-validation/initialTour";
// import defineTourYupSchema from "../../../shared/yup-validations/tour-validation/tourYupValidation";
import { Button, Paper } from "@mui/material";
import TourService from "../../../services/TourService";
import Images from "./TourImages";

const tourSchema = defineTourYupSchema({
  hasTitle: true,
  hasCategory: true,
  hasPrice: true,
  hasDays: true,
  hasFeatured: true,
  hasMaxPersons: true,
  hasTourDesc: true,
  hasPlanTitle: true,
  hasPlanDesc: true,
  hasMeals: true,
  hasCity: true,
  hasHotelNames: true,
  hasIncludes: true,
  hasExcludes: true,
  hasTourNotes: true,
});

interface IPackageFormProps {}

interface TourInterface {
  title?: string;
  tourType?: string;
  price?: number;
  duration?: { days: number; nights: number };
  tourDesc?: string;
  maxPersons?: number;
  featured?: false;
  tourPlan?: TourPlanInterface;
}

interface ItineraryObj {
  day: number;
  // title?: string;
  // desc?: string;
  planTitle?: string;
  planDesc?: string;
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
}

interface ImagesInterface {
  images: any[];
}

interface hotelsInterface {
  city: string;
  hotelNames: string;
}

interface TourPlanInterface {
  scheduleDate?: Array<Date>;
  itinerary?: Array<ItineraryObj>;
  hotels?: Array<hotelsInterface>;
  includes?: Array<string>;
  excludes?: Array<string>;
  tourNotes?: Array<string>;
}

const commnObj = {
  hasTitle: true,
  hasTourDesc: true,
  hasTourType: true,
  hasPrice: true,
  hasDays: true,
  hasMaxPersons: true,
  hasFeatured: true,
};

// const initialTour = defineInitialTour({
//   ...commnObj,
//   hasDay: commnObj?.hasDays,
// });

// const tourYupSchema = defineTourYupSchema({
//   ...commnObj,
// });

const tourTypes = ["Adventure", "Group", "Honeymoon", "Trek", "Customize"];

const PackageForm: React.FunctionComponent<IPackageFormProps> = (props) => {
  const { dragEnter, dragStart, drop } = useDnD();
  const [days, setDays] = useState(0);
  const [daysArray, setDaysArray] = useState<Array<number>>([]);
  const [itinerary, setItinerary] = useState<Array<ItineraryObj>>([
    {
      day: NaN,
      planTitle: "",
      planDesc: "",
      meals: {
        breakfast: false,
        lunch: false,
        dinner: false,
      },
    },
  ]);

  const [hotels, setHotels] = useState<Array<hotelsInterface>>([
    {
      city: "",
      hotelNames: "",
    },
  ]);

  const [images, setImages] = useState<File[]>([]);

  const [includes, setIncludes] = useState([{ include: "" }]);
  const [excludes, setExcludes] = useState([{ exclude: "" }]);
  const [notes, setNotes] = useState([{ note: "" }]);

  const [tour, setTour] = useState<TourInterface>({
    title: "",
    tourType: "",
    price: NaN,
    duration: { days: NaN, nights: NaN },
    tourDesc: "",
    maxPersons: NaN,
    featured: false,
    tourPlan: {
      itinerary: [
        {
          day: NaN,
          planTitle: "",
          planDesc: "",
          meals: {
            breakfast: false,
            lunch: false,
            dinner: false,
          },
        },
      ],
    },
  });

  const setPlanDay = () => {
    const arr = [...itinerary];
    daysArray.forEach((v, i) => {
      arr[i].day = i + 1;
    });
    setItinerary([...arr]);
  };

  const daysCount = (day: number) => {
    const arr = [];
    const dataArr = [];

    for (let i = 0; i < day; i++) {
      arr.push(i + 1);
      const title = `planTitle/${i + 1}`;
      const desc = `planDesc/${i + 1}`;
      dataArr.push({
        day: i + 1,
        [title]: "",
        [desc]: "",
        meals: { breakfast: false, lunch: false, dinner: false },
      });
    }

    setDaysArray(arr);
    setItinerary(dataArr);
  };

  const handleItinerary = (
    e: React.ChangeEvent<HTMLInputElement>,
    day = NaN
  ) => {
    const { name, value, checked } = e?.target;

    const arr = [...itinerary];

    if (day) {
      if (name == "breakfast") {
        arr[day - 1].meals.breakfast = checked;
      } else if (name == "lunch") {
        arr[day - 1].meals.lunch = checked;
      } else if (name == "dinner") {
        arr[day - 1].meals.dinner = checked;
      }
      setItinerary([...arr]);
    }

    if (name?.includes("planTitle") || name?.includes("planDesc")) {
      const index = arr?.findIndex((obj) => obj?.hasOwnProperty(name));

      if (index > -1) arr.splice(index, 1, { ...arr[index], [name]: value });

      setItinerary([...arr]);
    }
  };

  const handleTour = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;

    if (name == "duration.days") {
      setTour({
        ...tour,
        duration: { days: Number(value), nights: Number(value) - 1 },
      });
    } else {
      setTour({ ...tour, [name]: value });
    }
  };

  //drag and drop

  // const dragItem: any = useRef();
  // const dragItem2: any = useRef();
  // const dragOverItem: any = useRef();
  // const dragOverItem2: any = useRef();

  // const dragStart = (e: any, position: number) => {
  //   dragItem.current = position;
  //   dragItem2.current = position;
  //   // console.log(e.target.innerHTML);
  // };

  // const dragEnter = (e: any, position: number) => {
  //   dragOverItem.current = position;
  //   dragOverItem2.current = position;
  //   // console.log(e.target.innerHTML);
  // };

  // const drop = (e: any) => {
  //   const copyListItems = [...daysArray];
  //   const dragItemContent = copyListItems[dragItem.current];
  //   copyListItems.splice(dragItem.current, 1);
  //   copyListItems.splice(dragOverItem.current, 0, dragItemContent);
  //   dragItem.current = null;
  //   dragOverItem.current = null;
  //   setDaysArray(copyListItems);

  //   const copyListItems2 = [...itinerary];
  //   const dragItemContent2 = copyListItems2[dragItem2.current];
  //   copyListItems2.splice(dragItem2.current, 1);
  //   copyListItems2.splice(dragOverItem2.current, 0, dragItemContent2);
  //   dragItem2.current = null;
  //   dragOverItem2.current = null;
  //   setItinerary(copyListItems2);
  // };
  ///////

  const handleAddRemove = (tag: string, method: string, i: number) => {
    let arr: any = [];
    if (tag == "hotels") {
      arr = [...hotels];
      if (method == "add") {
        arr.push({ city: "", hotelNames: "" });
      } else {
        arr.splice(i, 1);
      }
      setHotels(arr);
    } else if (tag == "includes") {
      arr = [...includes];
      if (method == "add") {
        arr.push({});
      } else {
        arr.splice(i, 1);
      }
      setIncludes(arr);
    } else if (tag == "excludes") {
      arr = [...excludes];
      if (method == "add") {
        arr.push({});
      } else {
        arr.splice(i, 1);
      }
      setExcludes(arr);
    } else if (tag == "notes") {
      arr = [...notes];
      if (method == "add") {
        arr.push({});
      } else {
        arr.splice(i, 1);
      }
      setNotes(arr);
    }
  };

  const handleItemChange = (tag: string, e: any, i: number) => {
    const { name, value } = e?.target;

    let arr: any = [];
    if (tag == "hotels") {
      arr = [...hotels];

      arr[i][name] = value;
      setHotels(arr);
    } else if (tag == "includes") {
      arr = [...includes];
      arr[i][name] = value;
      setIncludes(arr);
    } else if (tag == "excludes") {
      arr = [...excludes];
      arr[i][name] = value;
      setExcludes(arr);
    } else if (tag == "notes") {
      arr = [...notes];
      arr[i][name] = value;
      setNotes(arr);
    }
  };

  useEffect(() => {
    daysCount(days);
  }, [days]);

  useEffect(() => {
    // days reset
    setPlanDay();
  }, [daysArray]);

  //local storage set
  useEffect(() => {
    let tourData: TourInterface = { ...tour };
    let tourPlanData: TourPlanInterface = {};
    let itineraryData: any = [...itinerary];

    tourPlanData = { itinerary: itineraryData };
    tourData = { ...tour, tourPlan: tourPlanData };

    localStorage.setItem("itineraryData", JSON.stringify(itineraryData));
    localStorage.setItem("tourData", JSON.stringify(tourData));
  }, [itinerary, tour]);

  return (
    <>
      <Formik
        initialValues={{
          title: "",
          tourType: "",
          price: NaN,
          duration: { days: NaN, nights: NaN },
          tourDesc: "",
          maxPersons: NaN,
          featured: false,
          tourPlan: {
            itinerary: [
              {
                day: NaN,
                planTitle: "",
                planDesc: "",
                meals: {
                  breakfast: false,
                  lunch: false,
                  dinner: false,
                },
              },
            ],
            hotels: [
              {
                city: "",
                hotelNames: "",
              },
            ],
          },
        }}
        validationSchema={tourSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);

          return;
          let tourData: TourInterface = {};
          let tourPlanData: TourPlanInterface = {};
          let itinareryData: any = [];

          for (let obj of itinerary) {
            const dayplan = {
              day: NaN,
              planTitle: "",
              planDesc: "",
              meals: {},
            };
            Object.entries(obj).forEach(([key, value]) => {
              if (key.includes("planTitle")) {
                dayplan.planTitle = value;
              } else if (key.includes("planDesc")) {
                dayplan.planDesc = value;
              } else if (key.includes("meals")) {
                dayplan.meals = value;
              } else {
                dayplan.day = value;
              }
            });
            itinareryData = [...itinareryData, dayplan];
          }

          tourPlanData = { itinerary: itinareryData };
          tourData = { ...tour, tourPlan: tourPlanData };

          // setTour({...tour, tourPlan.itinerary:itinareryData})

          // values.tourPlan && (values.tourPlan.itinerary = itinareryData as any);
          console.log(tourData);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Container>
                <Images setImages={setImages} imgs={images} />

                {/* //Basic tour plan */}
                <Accordion defaultExpanded sx={{ marginBottom: 1 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Basic Tour Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid
                      container
                      spacing={2}
                      sx={{ justifyContent: "center" }}
                    >
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          type="text"
                          size="small"
                          name="title"
                          label="Tour Title"
                          value={values?.title}
                          onChange={(e: any) => {
                            handleChange(e);
                            handleTour(e);
                          }}
                          autoComplete="title"
                          autoFocus
                          onBlur={handleBlur}
                          error={touched.title && errors.title ? true : false}
                          helperText={
                            touched.title && errors.title ? errors.title : ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl size="small" fullWidth>
                          <InputLabel
                            size="small"
                            id="demo-simple-select-label"
                          >
                            Tour Type
                          </InputLabel>
                          <Select
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values?.tourType}
                            label="Tour Type"
                            name="tourType"
                            onChange={(e: any) => {
                              handleChange(e);
                              handleTour(e);
                            }}
                            autoComplete="tourType"
                            autoFocus
                            onBlur={handleBlur}
                            error={
                              touched.tourType && errors.tourType ? true : false
                            }
                          >
                            {tourTypes.map((v, i) => (
                              <MenuItem key={v + i} value={v}>
                                {v}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {touched.tourType && errors.tourType
                              ? errors.tourType
                              : ""}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          type="number"
                          size="small"
                          name="price"
                          label="Price"
                          value={values?.price}
                          onChange={(e: any) => {
                            handleChange(e);
                            handleTour(e);
                          }}
                          autoComplete="price"
                          autoFocus
                          onBlur={handleBlur}
                          error={touched.price && errors.price ? true : false}
                          helperText={
                            touched.price && errors.price ? errors.price : ""
                          }
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          type="text"
                          size="small"
                          name="duration.days"
                          label="Days"
                          value={values?.duration?.days}
                          onChange={(e: any) => {
                            handleChange(e);
                            setDays(Number(e?.target?.value));
                            handleTour(e);
                          }}
                          autoComplete="duration.days"
                          autoFocus
                          onBlur={handleBlur}
                          error={
                            touched.duration?.days && errors.duration?.days
                              ? true
                              : false
                          }
                          helperText={
                            touched.duration?.days && errors.duration?.days
                              ? errors.duration.days
                              : ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl size="small" fullWidth>
                          <InputLabel
                            size="small"
                            id="demo-simple-select-label"
                          >
                            Featured
                          </InputLabel>
                          <Select
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values?.featured}
                            label="Featured"
                            name="featured"
                            onChange={(e: any) => {
                              handleChange(e);
                              handleTour(e);
                            }}
                            autoComplete="featured"
                            autoFocus
                            onBlur={handleBlur}
                            error={
                              touched.featured && errors.featured ? true : false
                            }
                          >
                            <MenuItem value="true">Yes</MenuItem>
                            <MenuItem value="false">No</MenuItem>
                          </Select>
                          <FormHelperText>
                            {touched.featured && errors.featured
                              ? errors.featured
                              : ""}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          type="number"
                          size="small"
                          name="maxPersons"
                          label="Seats"
                          value={values?.maxPersons}
                          onChange={(e: any) => {
                            handleChange(e);
                            handleTour(e);
                          }}
                          autoComplete="maxPersons"
                          autoFocus
                          onBlur={handleBlur}
                          error={
                            touched.maxPersons && errors.maxPersons
                              ? true
                              : false
                          }
                          helperText={
                            touched.maxPersons && errors.maxPersons
                              ? errors.maxPersons
                              : ""
                          }
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          minRows={5}
                          type="text"
                          name="tourDesc"
                          label="Tour Description"
                          value={values?.tourDesc}
                          onChange={(e: any) => {
                            handleChange(e);
                            handleTour(e);
                          }}
                          autoComplete="tourDesc"
                          autoFocus
                          onBlur={handleBlur}
                          error={
                            touched.tourDesc && errors.tourDesc ? true : false
                          }
                          helperText={
                            touched.tourDesc && errors.tourDesc
                              ? errors.tourDesc
                              : ""
                          }
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                {/* Tour Plan Day by day */}
                <Accordion defaultExpanded sx={{ marginBottom: 1 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Daywise Tour Plan</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid
                      container
                      spacing={1}
                      sx={{
                        justifyContent: "center",
                      }}
                    >
                      {/* {daysArray.map((v, i) => (
                        <Accordion sx={{ width: "100%" }} key={v}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>{`Day-${i + 1} Plan`}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid container spacing={2}>
                              <Grid
                                item
                                xs={12}
                                key={v}
                                draggable
                                onDragStart={(e) => dragStart(e, i)}
                                onDragEnter={(e) => dragEnter(e, i)}
                                onDragEnd={drop}
                                onDragOver={(e) => e.preventDefault()}
                              >
                                <Typography>Day : {i + 1} </Typography>
                                <TextField
                                  type="text"
                                  size="small"
                                  name={`planTitle/${v}`}
                                  label="Plan Title"
                                  //   value={values?.tourPlan?.itinerary?.planTitle}
                                  onChange={handleItinerary}
                                />
                                <TextField
                                  fullWidth
                                  multiline
                                  minRows={5}
                                  type="text"
                                  name={`planDesc/${v}`}
                                  label="Plan Description"
                                  //   value={values?.tourPlan?.itinerary?.planDesc}
                                  onChange={handleItinerary}
                                />
                                <FormGroup
                                  row
                                  onClick={(e: any) => handleItinerary(e, v)}
                                >
                                  <FormControlLabel
                                    control={<Checkbox name="breakfast" />}
                                    label="Breakfast"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox name="lunch" />}
                                    label="Lunch"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox name="dinner" />}
                                    label="Dinner"
                                  />
                                </FormGroup>
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      ))} */}

                      {/* tabs */}

                      {/* <Box sx={{ width: "100%" }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <Tabs
                            value={tabvalue}
                            onChange={handleTabChange}
                            aria-label="basic tabs example"
                          >
                            {daysArray.map((v, i) => (
                              <Tab
                                key={v + i}
                                label={`Day-${i + 1}`}
                                {...a11yProps(i)}
                              />
                            ))}
                          </Tabs>
                        </Box>
                        {daysArray.map((v, i) => (
                          <TabPanel value={tabvalue} index={i}>
                            <Grid container spacing={2}>
                              <Grid
                                item
                                xs={12}
                                key={v + i}
                                draggable
                                onDragStart={(e) => dragStart(e, i)}
                                onDragEnter={(e) => dragEnter(e, i)}
                                onDragEnd={drop}
                                onDragOver={(e) => e.preventDefault()}
                              >
                                <Typography>Day : {i + 1} </Typography>
                                <TextField
                                  type="text"
                                  size="small"
                                  margin="normal"
                                  name={`planTitle/${v}`}
                                  label="Plan Title"
                                  value={itinerary[i].planTitle}
                                  onChange={(e: any) => {
                                    handleChange(e);
                                    handleItinerary(e);
                                  }}
                                />
                                <TextField
                                  fullWidth
                                  margin="normal"
                                  multiline
                                  minRows={2}
                                  type="text"
                                  name={`planDesc/${v}`}
                                  label="Plan Description"
                                  value={itinerary[i].planDesc}
                                  onChange={(e: any) => {
                                    handleChange(e);
                                    handleItinerary(e);
                                  }}
                                />
                                <FormGroup
                                  row
                                  onClick={(e: any) => handleItinerary(e, v)}
                                >
                                  <FormControlLabel
                                    control={<Checkbox name="breakfast" />}
                                    label="Breakfast"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox name="lunch" />}
                                    label="Lunch"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox name="dinner" />}
                                    label="Dinner"
                                  />
                                </FormGroup>
                              </Grid>
                            </Grid>
                          </TabPanel>
                        ))}
                      </Box> */}
                      {/* cards */}
                      {daysArray.map((v, i) => (
                        <Grid
                          item
                          xs={12}
                          md={4}
                          sx={{ margin: 2 }}
                          key={v}
                          draggable
                          onDragStart={(e) => dragStart(e, i)}
                          onDragEnter={(e) => dragEnter(e, i)}
                          onDragEnd={(e) =>
                            drop(
                              e,
                              daysArray,
                              setDaysArray,
                              itinerary,
                              setItinerary
                            )
                          }
                          onDragOver={(e) => e.preventDefault()}
                        >
                          <Grid container>
                            <Paper variant="elevation">
                              <Grid item sx={{ padding: 2 }} xs={12}>
                                <Typography>Day : {i + 1} </Typography>
                                <TextField
                                  type="text"
                                  size="small"
                                  margin="normal"
                                  name={`planTitle/${v}`}
                                  label="Plan Title"
                                  //   value={values?.tourPlan?.itinerary?.planTitle}
                                  onChange={handleItinerary}
                                  autoComplete={`planTitle/${v}`}
                                  autoFocus
                                  onBlur={handleBlur}
                                />
                                <TextField
                                  fullWidth
                                  multiline
                                  margin="normal"
                                  minRows={2}
                                  type="text"
                                  name={`planDesc/${v}`}
                                  label="Plan Description"
                                  //   value={values?.tourPlan?.itinerary?.planDesc}
                                  onChange={handleItinerary}
                                />
                                <FormGroup
                                  row
                                  onClick={(e: any) => handleItinerary(e, v)}
                                >
                                  <FormControlLabel
                                    control={<Checkbox name="breakfast" />}
                                    label="Breakfast"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox name="lunch" />}
                                    label="Lunch"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox name="dinner" />}
                                    label="Dinner"
                                  />
                                </FormGroup>
                              </Grid>
                            </Paper>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                {/* hotels */}

                <Accordion sx={{ marginBottom: 1 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Hotels</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <>
                        {Array.isArray(hotels) &&
                          hotels?.map((hotel, index) => (
                            <React.Fragment key={index}>
                              <Grid item xs={12} md={5}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  name="city"
                                  id="hotels.city"
                                  label="City"
                                  value={hotel?.city}
                                  onChange={(e: any) =>
                                    handleItemChange("hotels", e, index)
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} md={5}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  name="hotelNames"
                                  id="hotels.hotelNames"
                                  label="Hotels"
                                  value={hotel?.hotelNames}
                                  onChange={(e: any) =>
                                    handleItemChange("hotels", e, index)
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} md={2}>
                                <Grid container justifyContent="space-around">
                                  <Grid item xs={12} md={5}>
                                    <Button
                                      fullWidth
                                      variant="contained"
                                      color="primary"
                                      onClick={() =>
                                        // push({ city: "", hotelNames: "" })
                                        handleAddRemove("hotels", "add", index)
                                      }
                                    >
                                      Add
                                    </Button>
                                  </Grid>
                                  <Grid item xs={12} md={5}>
                                    <Button
                                      fullWidth
                                      color="warning"
                                      variant="contained"
                                      onClick={() =>
                                        handleAddRemove(
                                          "hotels",
                                          "remove",
                                          index
                                        )
                                      }
                                    >
                                      Remove
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </React.Fragment>
                          ))}
                      </>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                {/* Includes */}

                <Accordion sx={{ marginBottom: 1 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Included</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <>
                        {Array.isArray(includes) &&
                          includes?.map((include, index) => (
                            <React.Fragment key={index}>
                              <Grid item xs={12} md={10}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  name="include"
                                  id="include"
                                  label="Include"
                                  multiline
                                  value={include.include}
                                  onChange={(e: any) =>
                                    handleItemChange("includes", e, index)
                                  }
                                />
                              </Grid>

                              <Grid item xs={12} md={2}>
                                <Grid container justifyContent="space-around">
                                  <Grid item xs={12} md={5}>
                                    <Button
                                      fullWidth
                                      variant="contained"
                                      color="primary"
                                      onClick={() =>
                                        // push({ city: "", hotelNames: "" })
                                        handleAddRemove(
                                          "includes",
                                          "add",
                                          index
                                        )
                                      }
                                    >
                                      Add
                                    </Button>
                                  </Grid>
                                  <Grid item xs={12} md={5}>
                                    <Button
                                      fullWidth
                                      variant="contained"
                                      color="warning"
                                      onClick={() =>
                                        handleAddRemove(
                                          "includes",
                                          "remove",
                                          index
                                        )
                                      }
                                    >
                                      Remove
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </React.Fragment>
                          ))}
                      </>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                {/* Exclues */}

                <Accordion sx={{ marginBottom: 1 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Excluded</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <>
                        {Array.isArray(excludes) &&
                          excludes?.map((exclude, index) => (
                            <React.Fragment key={index}>
                              <Grid item xs={12} md={10}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  name="exclude"
                                  id="exclude"
                                  label="Exclude"
                                  multiline
                                  value={exclude.exclude}
                                  onChange={(e: any) =>
                                    handleItemChange("excludes", e, index)
                                  }
                                />
                              </Grid>

                              <Grid item xs={12} md={2}>
                                <Grid container justifyContent="space-around">
                                  <Grid item xs={12} md={5}>
                                    <Button
                                      fullWidth
                                      variant="contained"
                                      color="primary"
                                      onClick={() =>
                                        handleAddRemove(
                                          "excludes",
                                          "add",
                                          index
                                        )
                                      }
                                    >
                                      Add
                                    </Button>
                                  </Grid>
                                  <Grid item xs={12} md={5}>
                                    <Button
                                      fullWidth
                                      variant="contained"
                                      color="warning"
                                      onClick={() =>
                                        handleAddRemove(
                                          "excludes",
                                          "remove",
                                          index
                                        )
                                      }
                                    >
                                      Remove
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </React.Fragment>
                          ))}
                      </>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                {/* Notes */}

                <Accordion sx={{ marginBottom: 1 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Notes</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <>
                        {Array.isArray(notes) &&
                          notes?.map((note, index) => (
                            <React.Fragment key={index}>
                              <Grid item xs={12} md={10}>
                                <TextField
                                  fullWidth
                                  size="small"
                                  name="note"
                                  id="note"
                                  label="Note"
                                  multiline
                                  value={note.note}
                                  onChange={(e: any) =>
                                    handleItemChange("notes", e, index)
                                  }
                                />
                              </Grid>

                              <Grid item xs={12} md={2}>
                                <Grid container justifyContent="space-around">
                                  <Grid item xs={12} md={5}>
                                    <Button
                                      fullWidth
                                      variant="contained"
                                      color="primary"
                                      onClick={() =>
                                        handleAddRemove("notes", "add", index)
                                      }
                                    >
                                      Add
                                    </Button>
                                  </Grid>
                                  <Grid item xs={12} md={5}>
                                    <Button
                                      fullWidth
                                      variant="contained"
                                      color="warning"
                                      onClick={() =>
                                        handleAddRemove(
                                          "notes",
                                          "remove",
                                          index
                                        )
                                      }
                                    >
                                      Remove
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </React.Fragment>
                          ))}
                      </>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Grid>
                  <Button variant="outlined" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Container>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default PackageForm;
