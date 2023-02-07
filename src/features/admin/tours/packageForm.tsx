import React, { useEffect, useState, useMemo } from "react";
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
import IconButton from "@mui/material/IconButton";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import useDnD from "../../../shared/draganddrop/useDnD";

import { Formik } from "formik";
import defineInitialTour from "../../../shared/yup-validations/tour-validation/initialTour";
import defineTourYupSchema from "../../../shared/yup-validations/tour-validation/tourYupValidation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import { Theme, useTheme } from "@mui/material/styles";
import Images from "./TourImages";
import { SelectChangeEvent } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import TourService from "../../../services/TourService";
import { errorToast, successToast } from "../../../ui/toast/Toast";
import { createFD } from "./tourFormData";

const tourTypes = ["Adventure", "Group", "Honeymoon", "Trek", "Customize"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, type: readonly string[], theme: Theme) {
  return {
    fontWeight:
      type?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface IPackageFormProps {}

interface TourInterface {
  title?: string;
  tourType?: string[];
  price?: string;
  duration?: { days: string; nights: string };
  tourDesc?: string;
  maxPersons?: string;
  featured?: Boolean;
}

interface ItineraryObj {
  touched?: { title: boolean; desc: boolean };
  day?: number;
  planTitle?: string;
  planDesc?: string;
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
}

interface IhotelsInterface {
  touched: { city: boolean; hotels: boolean };
  city: string;
  hotelNames: string;
}

const commnObj = {
  hasTitle: true,
  hasPrice: true,
  hasDays: true,
  hasFeatured: true,
  hasMaxPersons: true,
  hasTourDesc: true,
  hasCity: true,
  hasHotelNames: true,
  hasIncludes: true,
  hasExcludes: true,
  hasTourNotes: true,
};

const initialTour = defineInitialTour({
  ...commnObj,
  hasCategory: true,
  hasDay: true,
  hasPlanTitle: true,
  hasPlanDesc: true,
  hasMeals: true,
  hasHotels: true,
});

const tourYupSchema = defineTourYupSchema({
  ...commnObj,
});

const itineraryItemObj = {
  touched: { title: false, desc: false },
  day: 0,
  planTitle: "",
  planDesc: "",
  meals: { breakfast: false, dinner: false, lunch: false },
};

const hotelItemObj = {
  touched: { city: false, hotels: false },
  city: "",
  hotelNames: "",
};

const includesItemObj = { touched: false, include: "" };
const excludesItemObj = { touched: false, exclude: "" };
const notesItemObj = { touched: false, note: "" };

const tourItemObj = {
  title: "",
  tourType: [],
  price: "",
  duration: { days: "", nights: "" },
  tourDesc: "",
  maxPersons: "",
  featured: false,
};

const PackageForm: React.FunctionComponent<IPackageFormProps> = (props) => {
  const { dragEnter, dragStart, drop } = useDnD();
  const [days, setDays] = useState(0);
  const [daysArray, setDaysArray] = useState<Array<number>>([]);
  const [dayPlanItems, setDayPlanItems] = useState([itineraryItemObj]);
  const [itinerary, setItinerary] = useState<Array<ItineraryObj>>([
    itineraryItemObj,
  ]);
  const [images, setImages] = useState<string[] | any>([]);
  const [hotels, setHotels] = useState<Array<IhotelsInterface>>([hotelItemObj]);
  const [includes, setIncludes] = useState([includesItemObj]);
  const [excludes, setExcludes] = useState([excludesItemObj]);
  const [tourNotes, setTourNotes] = useState([notesItemObj]);
  const [tour, setTour] = useState<TourInterface>(tourItemObj);

  const theme = useTheme();

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
      if (i < 30) arr.push(i + 1);
      const title = `planTitle/${i + 1}`;
      const desc = `planDesc/${i + 1}`;
      if (i < 30)
        dataArr.push({
          touched: { title: false, desc: false },
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
      localStorage.setItem("daywisePlan", JSON.stringify(arr));
    }

    if (name?.includes("planTitle") || name?.includes("planDesc")) {
      const index = arr?.findIndex((obj) => obj?.hasOwnProperty(name));

      if (index > -1) arr.splice(index, 1, { ...arr[index], [name]: value });

      setItinerary([...arr]);
      localStorage.setItem("daywisePlan", JSON.stringify(arr));
    }
  };

  const handleTour = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]>
  ) => {
    const { name, value } = e?.target;

    if (name == "duration.days") {
      setTour({
        ...tour,
        duration: { days: value as string, nights: String(Number(value) - 1) },
      });
    } else if (name == "tourType") {
      setTour({
        ...tour,
        [name]: typeof value === "string" ? value.split(",") : value,
      });
    } else {
      setTour({ ...tour, [name]: value });
    }
  };

  const handleAddRemove = (tag: string, method: string, i: number) => {
    let arr: any = [];
    if (tag == "hotels") {
      arr = [...hotels];
      if (method == "add") {
        arr.push({
          touched: { city: false, hotels: false },
          city: "",
          hotelNames: "",
        });
      } else {
        arr.splice(i, 1);
      }
      setHotels(arr);
    } else if (tag == "includes") {
      arr = [...includes];
      if (method == "add") {
        arr.push({ touched: false, include: "" });
      } else {
        arr.splice(i, 1);
      }
      setIncludes(arr);
    } else if (tag == "excludes") {
      arr = [...excludes];
      if (method == "add") {
        arr.push({ touched: false, exclude: "" });
      } else {
        arr.splice(i, 1);
      }
      setExcludes(arr);
    } else if (tag == "tourNotes") {
      arr = [...tourNotes];
      if (method == "add") {
        arr.push({ touched: false, note: "" });
      } else {
        arr.splice(i, 1);
      }
      setTourNotes(arr);
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
    } else if (tag == "tourNotes") {
      arr = [...tourNotes];
      arr[i][name] = value;
      setTourNotes(arr);
    }
  };

  const cleanItineraryData = () => {
    let result: any = [];
    let itineraryData: any = JSON.parse(
      localStorage.getItem("itineraryData") as any
    );

    for (let obj of itineraryData) {
      const dayplan: any = {};
      Object.entries(obj).forEach(([key, value]) => {
        if (key.includes("planTitle")) {
          dayplan.planTitle = value as string;
        } else if (key.includes("planDesc")) {
          dayplan.planDesc = value as string;
        } else if (key.includes("meals")) {
          dayplan.meals = value as string;
        } else if (key.includes("day")) {
          dayplan.day = value as number;
        } else {
          dayplan.touched = value as any;
        }
      });
      result = [...result, dayplan];
    }
    return result;
  };

  const handleDraft = () => {
    let basicTourData = JSON.parse(
      localStorage.getItem("basicTourData") as any
    );
    let itineraryData = JSON.parse(localStorage.getItem("daywisePlan") as any);
    let hotelsData = JSON.parse(localStorage.getItem("hotelsData") as any);
    let includesData = JSON.parse(localStorage.getItem("includesData") as any);
    let excludesData = JSON.parse(localStorage.getItem("excludesData") as any);
    let notesData = JSON.parse(localStorage.getItem("notesData") as any);

    setTour(basicTourData);
    setItinerary(itineraryData);
    setHotels(hotelsData);
    setIncludes(includesData);
    setExcludes(excludesData);
    setTourNotes(notesData);
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
    let basicTourData: TourInterface = { ...tour };
    let itineraryData: Array<ItineraryObj> = [...itinerary];
    let hotelsData: Array<IhotelsInterface> = [...hotels];
    let includesData: Array<Object> = [...includes];
    let excludesData: Array<Object> = [...excludes];
    let notesData: Array<Object> = [...tourNotes];

    const basicTourDataString = JSON.stringify(basicTourData);
    const itineraryDataString = JSON.stringify(itineraryData);
    const hotelsDataString = JSON.stringify(hotelsData);
    const includesDataString = JSON.stringify(includesData);
    const excludesDataString = JSON.stringify(excludesData);
    const notesDataString = JSON.stringify(notesData);

    if (JSON.stringify(tourItemObj) != basicTourDataString)
      localStorage.setItem("basicTourData", basicTourDataString);
    if (JSON.stringify(itineraryItemObj) != itineraryDataString)
      localStorage.setItem("itineraryData", itineraryDataString);
    if (JSON.stringify(hotelItemObj) != hotelsDataString)
      localStorage.setItem("hotelsData", hotelsDataString);
    if (JSON.stringify(includesItemObj) != includesDataString)
      localStorage.setItem("includesData", includesDataString);
    if (JSON.stringify(excludesItemObj) != excludesDataString)
      localStorage.setItem("excludesData", excludesDataString);
    if (JSON.stringify(notesItemObj) != notesDataString)
      localStorage.setItem("notesData", notesDataString);
  }, [tour, itinerary, hotels, includes, excludes, tourNotes]);

  useEffect(() => {
    const result = cleanItineraryData();
    setDayPlanItems(result);
  }, [itinerary]);

  return (
    <>
      <Formik
        initialValues={initialTour}
        validationSchema={tourYupSchema}
        onSubmit={(values, { resetForm }) => {
          const tourObj = createFD(images);

          TourService.createTour(tourObj)
            .then((res) => {
              const msg = res?.data?.message || "Package created successfully";
              successToast(msg, 3000);
            })
            .catch((err) => {
              console.error(err);
              const msg =
                err?.response?.data?.message ||
                "Package couldn't created successfully";
              errorToast(msg);
            });
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
          const durationTouched: any = touched?.duration;
          const durationErrors: any = errors?.duration;

          return (
            <form onSubmit={handleSubmit}>
              <Container>
                <Grid container justifyContent="end">
                  <Grid>
                    <Button variant="contained" onClick={handleDraft}>
                      Fill Saved Draft
                    </Button>
                  </Grid>
                </Grid>
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
                          required
                          type="text"
                          size="small"
                          name="title"
                          label="Tour Title"
                          value={tour?.title}
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
                        <FormControl
                          size="small"
                          required
                          fullWidth
                          error={
                            touched?.tourType &&
                            tour?.tourType &&
                            tour?.tourType?.length <= 0
                              ? true
                              : false
                          }
                        >
                          <InputLabel size="small" id="multiple-chip-label">
                            Type
                          </InputLabel>
                          <Select
                            required
                            size="small"
                            labelId="multiple-chip-label"
                            id="TourType"
                            name="tourType"
                            multiple
                            value={tour?.tourType || []}
                            onBlur={handleBlur}
                            onChange={(e: any) => {
                              handleChange(e);
                              handleTour(e);
                            }}
                            input={
                              <OutlinedInput
                                id="select-multiple-chip"
                                label="Chip"
                                size="small"
                              />
                            }
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => (
                                  <Chip
                                    size="small"
                                    key={value}
                                    label={value}
                                  />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                          >
                            {tourTypes.map((type) => (
                              <MenuItem
                                key={type}
                                value={type}
                                style={getStyles(
                                  type,
                                  tour?.tourType as string[],
                                  theme
                                )}
                              >
                                {type}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {touched?.tourType &&
                            tour?.tourType &&
                            tour?.tourType?.length <= 0
                              ? "Tour type can't be empty"
                              : ""}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          required
                          type="text"
                          size="small"
                          name="price"
                          label="Price"
                          value={tour?.price || ""}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleChange(e);
                            handleTour(e);
                          }}
                          autoComplete="price"
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
                          required
                          type="text"
                          size="small"
                          name="duration.days"
                          label="Days"
                          value={tour?.duration?.days || ""}
                          inputProps={{ max: 30, min: 0 }}
                          onChange={(e: any) => {
                            handleChange(e);
                            setDays(Number(e?.target?.value));
                            handleTour(e);
                          }}
                          autoComplete="duration.days"
                          onBlur={handleBlur}
                          error={
                            durationTouched?.days && durationErrors?.days
                              ? true
                              : false
                          }
                          helperText={
                            durationTouched?.days && durationErrors?.days
                              ? durationErrors.days
                              : ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl required size="small" fullWidth>
                          <InputLabel
                            size="small"
                            id="demo-simple-select-label"
                          >
                            Featured
                          </InputLabel>
                          <Select
                            required
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tour?.featured}
                            label="Featured"
                            name="featured"
                            onChange={(e: any) => {
                              handleChange(e);
                              handleTour(e);
                            }}
                            autoComplete="featured"
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
                          required
                          type="text"
                          size="small"
                          name="maxPersons"
                          label="Seats"
                          value={tour?.maxPersons || ""}
                          onChange={(e: any) => {
                            handleChange(e);
                            handleTour(e);
                          }}
                          autoComplete="maxPersons"
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
                          required
                          multiline
                          minRows={5}
                          type="text"
                          name="tourDesc"
                          label="Tour Description"
                          value={tour?.tourDesc}
                          onChange={(e: any) => {
                            handleChange(e);
                            handleTour(e);
                          }}
                          autoComplete="tourDesc"
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
                              <Grid
                                item
                                sx={{ padding: 2, cursor: "grab" }}
                                xs={12}
                              >
                                <Grid container justifyContent="space-between">
                                  <Typography>Day : {i + 1} </Typography>
                                  <Tooltip
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                    title="Drag to change the card.."
                                    placement="top"
                                  >
                                    <DragIndicatorIcon />
                                  </Tooltip>
                                </Grid>
                                <TextField
                                  fullWidth
                                  required
                                  type="text"
                                  size="small"
                                  margin="normal"
                                  name={`planTitle/${v}`}
                                  label="Plan Title"
                                  value={dayPlanItems[i]?.planTitle}
                                  onChange={handleItinerary}
                                  autoComplete={`planTitle/${i}`}
                                  onBlur={(e) => {
                                    if (!itinerary[v - 1].touched?.title) {
                                      const arr: any = [...itinerary];
                                      arr[v - 1].touched.title = true;
                                      setItinerary([...arr]);
                                    }
                                    handleBlur(e);
                                  }}
                                  error={
                                    !dayPlanItems[i]?.planTitle &&
                                    dayPlanItems[i]?.touched?.title
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    !dayPlanItems[i]?.planTitle &&
                                    dayPlanItems[i]?.touched?.title
                                      ? `Plan Title is required`
                                      : ""
                                  }
                                />

                                <TextField
                                  fullWidth
                                  required
                                  multiline
                                  margin="normal"
                                  minRows={2}
                                  type="text"
                                  name={`planDesc/${v}`}
                                  label="Plan Description"
                                  value={dayPlanItems[i]?.planDesc}
                                  onChange={handleItinerary}
                                  onBlur={(e) => {
                                    if (!itinerary[v - 1].touched?.desc) {
                                      const arr: any = [...itinerary];
                                      arr[v - 1].touched.desc = true;
                                      setItinerary([...arr]);
                                    }
                                    handleBlur(e);
                                  }}
                                  error={
                                    !dayPlanItems[i]?.planDesc &&
                                    dayPlanItems[i]?.touched?.desc
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    !dayPlanItems[i]?.planDesc &&
                                    dayPlanItems[i]?.touched?.desc
                                      ? `Plan Description is required`
                                      : ""
                                  }
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
                              <Grid item xs={12} md={3}>
                                <TextField
                                  fullWidth
                                  required
                                  size="small"
                                  name="city"
                                  id={`hotels.city${index}`}
                                  label="City"
                                  value={hotel?.city}
                                  onChange={(e: any) =>
                                    handleItemChange("hotels", e, index)
                                  }
                                  onBlur={() => {
                                    if (!hotel?.touched?.city) {
                                      const arr: any = [...hotels];
                                      arr[index].touched.city = true;
                                      setHotels(arr);
                                    }
                                  }}
                                  error={
                                    hotel?.touched?.city && !hotel?.city
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    hotel?.touched?.city && !hotel?.city
                                      ? "Please fill city"
                                      : ""
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} md={7}>
                                <TextField
                                  fullWidth
                                  required
                                  size="small"
                                  name="hotelNames"
                                  id="hotels.hotelNames"
                                  label="Hotels"
                                  value={hotel?.hotelNames}
                                  onChange={(e: any) =>
                                    handleItemChange("hotels", e, index)
                                  }
                                  onBlur={() => {
                                    if (!hotel?.touched?.hotels) {
                                      const arr: any = [...hotels];
                                      arr[index].touched.hotels = true;
                                      setHotels(arr);
                                    }
                                  }}
                                  error={
                                    hotel?.touched?.hotels && !hotel?.hotelNames
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    hotel?.touched?.hotels && !hotel?.hotelNames
                                      ? "Please fill Hotel Names"
                                      : ""
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} md={2}>
                                <Grid
                                  container
                                  justifyContent={
                                    hotels?.length == index + 1
                                      ? "space-around"
                                      : "start"
                                  }
                                >
                                  {hotels?.length == index + 1 && (
                                    <Grid
                                      item
                                      xs={12}
                                      md={5}
                                      sx={{ textAlign: "center" }}
                                    >
                                      <IconButton
                                        color="primary"
                                        onClick={() =>
                                          handleAddRemove(
                                            "hotels",
                                            "add",
                                            index
                                          )
                                        }
                                      >
                                        <AddIcon />
                                      </IconButton>
                                    </Grid>
                                  )}
                                  <Grid
                                    item
                                    xs={12}
                                    md={5}
                                    sx={{
                                      textAlign:
                                        index + 1 < hotels?.length
                                          ? "center"
                                          : "start",
                                    }}
                                  >
                                    <IconButton
                                      color="warning"
                                      disabled={hotels?.length == 1}
                                      onClick={() =>
                                        handleAddRemove(
                                          "hotels",
                                          "remove",
                                          index
                                        )
                                      }
                                    >
                                      <ClearIcon />
                                    </IconButton>
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
                                  required
                                  size="small"
                                  name="include"
                                  id="include"
                                  label="Include"
                                  multiline
                                  value={include.include}
                                  onChange={(e: any) =>
                                    handleItemChange("includes", e, index)
                                  }
                                  onBlur={() => {
                                    if (!include?.touched) {
                                      const arr: any = [...includes];
                                      arr[index].touched = true;
                                      setIncludes(arr);
                                    }
                                  }}
                                  error={
                                    include?.touched && !include?.include
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    include?.touched && !include?.include
                                      ? "Please fill include field "
                                      : ""
                                  }
                                />
                              </Grid>

                              <Grid item xs={12} md={2}>
                                <Grid
                                  container
                                  justifyContent={
                                    includes?.length == index + 1
                                      ? "space-around"
                                      : "start"
                                  }
                                >
                                  {includes?.length == index + 1 && (
                                    <Grid
                                      item
                                      xs={12}
                                      md={5}
                                      sx={{ textAlign: "center" }}
                                    >
                                      <IconButton
                                        color="primary"
                                        onClick={() =>
                                          handleAddRemove(
                                            "includes",
                                            "add",
                                            index
                                          )
                                        }
                                      >
                                        <AddIcon />
                                      </IconButton>
                                    </Grid>
                                  )}
                                  <Grid
                                    item
                                    xs={12}
                                    md={5}
                                    sx={{
                                      textAlign:
                                        index + 1 < includes?.length
                                          ? "center"
                                          : "start",
                                    }}
                                  >
                                    <IconButton
                                      color="warning"
                                      disabled={includes?.length == 1}
                                      onClick={() =>
                                        handleAddRemove(
                                          "includes",
                                          "remove",
                                          index
                                        )
                                      }
                                    >
                                      <ClearIcon />
                                    </IconButton>
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
                                  required
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
                                  onBlur={() => {
                                    if (!exclude?.touched) {
                                      const arr: any = [...excludes];
                                      arr[index].touched = true;
                                      setExcludes(arr);
                                    }
                                  }}
                                  error={
                                    exclude?.touched && !exclude?.exclude
                                      ? true
                                      : false
                                  }
                                  helperText={
                                    exclude?.touched && !exclude?.exclude
                                      ? "Please fill exclude field "
                                      : ""
                                  }
                                />
                              </Grid>

                              <Grid item xs={12} md={2}>
                                <Grid
                                  container
                                  justifyContent={
                                    excludes?.length == index + 1
                                      ? "space-around"
                                      : "start"
                                  }
                                >
                                  {excludes?.length == index + 1 && (
                                    <Grid
                                      item
                                      xs={12}
                                      md={5}
                                      sx={{ textAlign: "center" }}
                                    >
                                      <IconButton
                                        color="primary"
                                        onClick={() =>
                                          handleAddRemove(
                                            "excludes",
                                            "add",
                                            index
                                          )
                                        }
                                      >
                                        <AddIcon />
                                      </IconButton>
                                    </Grid>
                                  )}
                                  <Grid
                                    item
                                    xs={12}
                                    md={5}
                                    sx={{
                                      textAlign:
                                        index + 1 < excludes?.length
                                          ? "center"
                                          : "start",
                                    }}
                                  >
                                    <IconButton
                                      color="warning"
                                      disabled={excludes?.length == 1}
                                      onClick={() =>
                                        handleAddRemove(
                                          "excludes",
                                          "remove",
                                          index
                                        )
                                      }
                                    >
                                      <ClearIcon />
                                    </IconButton>
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
                        {Array.isArray(tourNotes) &&
                          tourNotes?.map((note, index) => (
                            <React.Fragment key={index}>
                              <Grid item xs={12} md={10}>
                                <TextField
                                  required
                                  fullWidth
                                  size="small"
                                  name="note"
                                  id="note"
                                  label="Note"
                                  multiline
                                  value={note.note}
                                  onChange={(e: any) =>
                                    handleItemChange("tourNotes", e, index)
                                  }
                                  onBlur={() => {
                                    if (!note?.touched) {
                                      const arr: any = [...tourNotes];
                                      arr[index].touched = true;
                                      setTourNotes(arr);
                                    }
                                  }}
                                  error={
                                    note?.touched && !note?.note ? true : false
                                  }
                                  helperText={
                                    note?.touched && !note?.note
                                      ? "Please fill note"
                                      : ""
                                  }
                                />
                              </Grid>

                              <Grid item xs={12} md={2}>
                                <Grid
                                  container
                                  justifyContent={
                                    tourNotes?.length == index + 1
                                      ? "space-around"
                                      : "start"
                                  }
                                >
                                  {tourNotes?.length == index + 1 && (
                                    <Grid
                                      item
                                      xs={12}
                                      md={5}
                                      sx={{ textAlign: "center" }}
                                    >
                                      <IconButton
                                        color="primary"
                                        onClick={() =>
                                          handleAddRemove(
                                            "tourNotes",
                                            "add",
                                            index
                                          )
                                        }
                                      >
                                        <AddIcon />
                                      </IconButton>
                                    </Grid>
                                  )}
                                  <Grid
                                    item
                                    xs={12}
                                    md={5}
                                    sx={{
                                      textAlign:
                                        index + 1 < tourNotes?.length
                                          ? "center"
                                          : "start",
                                    }}
                                  >
                                    <IconButton
                                      color="warning"
                                      disabled={tourNotes?.length == 1}
                                      onClick={() =>
                                        handleAddRemove(
                                          "tourNotes",
                                          "remove",
                                          index
                                        )
                                      }
                                    >
                                      <ClearIcon />
                                    </IconButton>
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
