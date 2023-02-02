import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { Formik } from "formik";
// import defineInitialTour from "../../../shared/yup-validations/tour-validation/initialTour";
// import defineTourYupSchema from "../../../shared/yup-validations/tour-validation/tourYupValidation";
import { Button } from "@mui/material";
import TourService from "../../../services/TourService";

interface IPackageFormProps {}

interface obj {
  day?: number;
  title?: string;
  desc?: string;
  meals?: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
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
  const [days, setDays] = useState(0);
  const [daysArray, setDaysArray] = useState<Array<number>>([]);
  const [itinerary, setItinerary] = useState<Array<obj>>([
    {
      day: NaN,
      title: "",
      desc: "",
      meals: {
        breakfast: false,
        lunch: false,
        dinner: false,
      },
    },
  ]);

  const dayPlanTitleKeys: Array<string> = [];
  const dayPlanDescKeys: Array<string> = [];

  const daysCount = (day: number) => {
    const arr = [];
    const dataArr = [];

    for (let i = 0; i < day; i++) {
      arr.push(i + 1);
      const title = `planTitle/${i + 1}`;
      const desc = `planDesc/${i + 1}`;
      dayPlanTitleKeys.push(title);
      dayPlanDescKeys.push(desc);
      dataArr.push({
        day: NaN,
        [title]: "",
        [desc]: "",
        meals: { breakfast: false, lunch: false, dinner: false },
      });
    }

    setDaysArray(arr);
    setItinerary(dataArr);
  };

  const handleItinerary = (e: any, day = 0) => {
    const { name, value } = e?.target;

    const arr = [...itinerary];
    // if (day > -1) {
    //   if (name == "breakfast") {
    //     arr[day].meals.breakfast = value;
    //   } else if (name == "lunch") {
    //     arr[day].meals.lunch = value;
    //   } else if (name == "dinner") {
    //     arr[day].meals.dinner = value;
    //   }
    // }

    const index = arr.findIndex((obj: any) => obj.hasOwnProperty(name));

    if (index > -1) arr.splice(index, 1, { ...arr[index], [name]: value });

    setItinerary([...arr]);
  };

  useEffect(() => {
    daysCount(days);
  }, [days]);

  return (
    <>
      <Formik
        initialValues={{
          title: "",
          tourId: "",
          category: "",
          tourType: "",
          price: "",
          duration: { days: NaN, nights: "" },
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
        }}
        // validationSchema={tourYupSchema}
        onSubmit={(values, { resetForm }) => {
          let itinareryData: any = [];

          for (let obj of itinerary) {
            const dayplan = {
              day: NaN,
              planTitle: "",
              planDesc: "",
              meals: {},
            };
            Object.entries(obj).find(([key, value]) => {
              if (key.includes("planTitle")) {
                dayplan.planTitle = value;
              } else if (key.includes("planDesc")) {
                dayplan.planDesc = value;
              } else if (key.includes("meals")) {
                dayplan.meals = value;
              } else {
                dayplan.day = value;
              }
              itinareryData = [...itinareryData, dayplan];
            });
          }

          values.tourPlan && (values.tourPlan.itinerary = itinareryData as any);
          console.log(values);
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
                <Typography>Basic Tour Details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      type="text"
                      size="small"
                      name="title"
                      label="Tour Title"
                      value={values?.title}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl size="small" fullWidth>
                      <InputLabel size="small" id="demo-simple-select-label">
                        Tour Type
                      </InputLabel>
                      <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values?.tourType}
                        label="Tour Type"
                        name="tourType"
                        onChange={handleChange}
                      >
                        {tourTypes.map((v, i) => (
                          <MenuItem key={v + i} value={v}>
                            {v}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      type="number"
                      size="small"
                      name="price"
                      label="Price"
                      value={values?.price}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      type="number"
                      size="small"
                      name="duration.days"
                      label="Days"
                      value={values?.duration?.days}
                      onChange={(e) => {
                        handleChange(e);
                        setDays(Number(e?.target?.value));
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl size="small" fullWidth>
                      <InputLabel size="small" id="demo-simple-select-label">
                        Featured
                      </InputLabel>
                      <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values?.featured}
                        label="Featured"
                        name="featured"
                        onChange={handleChange}
                      >
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      type="number"
                      size="small"
                      name="maxPersons"
                      label="Seats"
                      value={values?.maxPersons}
                      onChange={handleChange}
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
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Typography>Tour Plan</Typography>
                <Grid container spacing={2}>
                  {daysArray.map((v, i) => (
                    <Grid key={v + "-" + i} item>
                      <Typography>Day {v}- </Typography>
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
                      <FormGroup onChange={(e) => handleItinerary(e, v)}>
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
                  ))}
                </Grid>
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
