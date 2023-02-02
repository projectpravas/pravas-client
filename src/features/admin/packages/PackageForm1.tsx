import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import {
  Formik,
  FormikValues,
  useFormik,
  FieldArray,
  Field,
  FormikProvider,
} from "formik";

interface IPackageFormProps {}

interface Values {
  title: string;
  tourId: string;
  category: string;
  tourType: string;
  price: number;
  duration: { days: number; nights: number };
  tourDesc: string;
  maxPersons: number;
  featured: boolean;
  tourPlan: [
    {
      itinerary: [
        {
          day: number;
          planTitle: string;
          planDesc: string;
          meals: Array<string>;
        }
      ];
    }
  ];
}

const initialValues = {
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
};

const tourTypes = ["Adventure", "Group", "Honeymoon", "Trek", "Customize"];
const PackageForm1: React.FunctionComponent<IPackageFormProps> = (props) => {
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isValid,
  } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Container>
            <Typography>Basic Tour Details</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  type="text"
                  size="small"
                  name="title"
                  label="Tour Title"
                  value={values.title}
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
                  onChange={handleChange}
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
              <FieldArray name="tourPlan.itinerary">
                {({ insert, remove, push }) => {
                  return (
                    <Grid item>
                      {Array.isArray(values.tourPlan.itinerary) &&
                        values.tourPlan.itinerary.map((o, i) => (
                          <Grid key={i}>
                            <Typography>Day-{i + 1}</Typography>
                            <TextField
                              type="text"
                              size="small"
                              name={`itinery.${i}.planTitle`}
                              label="Plan Title"
                              // value={values?.tourPlan?.itinerary?.planTitle}
                              onChange={handleChange}
                            />

                            <TextField
                              fullWidth
                              multiline
                              minRows={5}
                              type="text"
                              name={`itinery.${i}.planDesc`}
                              label="Plan Description"
                              //   value={values?.tourPlan?.itinerary?.planDesc}
                              onChange={handleChange}
                            />
                          </Grid>
                        ))}
                      <Button
                        variant="contained"
                        disabled={
                          values.duration.days ==
                          values.tourPlan.itinerary.length
                        }
                        onClick={() => {
                          push({
                            planTitle: "",
                            planDesc: "",
                            meals: [],
                          });
                        }}
                      >
                        Next Day
                      </Button>
                    </Grid>
                  );
                }}
              </FieldArray>
            </Grid>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </Container>
        </form>
      </FormikProvider>
    </>
  );
};

export default PackageForm1;
