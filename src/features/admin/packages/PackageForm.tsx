import {
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
import { Formik } from "formik";

interface IPackageFormProps {}
interface obj {
  title?: string;
  desc?: string;
}

const tourTypes = ["Adventure", "Group", "Honeymoon", "Trek", "Customize"];
const PackageForm: React.FunctionComponent<IPackageFormProps> = (props) => {
  const [days, setDays] = React.useState(NaN);
  const [daysArray, setDaysArray] = React.useState([NaN]);
  const [itinerary, setItinerary] = React.useState<Array<obj>>([
    {
      title: "",
      desc: "",
    },
  ]);

  const daysCount = (day: number) => {
    const arr = [];
    const dataArr = [];

    for (let i = 0; i < day; i++) {
      arr.push(i + 1);
      const title = `planTitle/${i}`;
      const desc = `planDesc/${i}`;
      dataArr.push({ [title]: "", [desc]: "" });
    }

    setDaysArray(arr);
    setItinerary(dataArr);
  };

  const handleItinerary = (e: any) => {
    const { name, value } = e?.target;

    const arr = [...itinerary];

    const index = arr.findIndex(
      (obj) => obj?.title?.split("/")[1] == name?.split("/")[1]
    );

    arr.splice(index, 1, { [name]: value });

    setItinerary([...arr]);

    // console.log(e?.target?.value);
  };

  React.useEffect(() => {
    setDaysArray(daysArray);
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
          price: NaN,
          duration: { days: NaN, nights: NaN },
          tourDesc: "",
          maxPersons: NaN,
          featured: false,
          tourPlan: [
            {
              itinerary: { day: NaN, planTitle: "", planDesc: "", meals: [] },
            },
          ],
        }}
        onSubmit={() => {}}
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
                      //   setDays(values?.duration?.days);
                    }}
                    onBlur={() => setDays(values?.duration?.days)}
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
                  <Grid item>
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
                  </Grid>
                ))}
              </Grid>
            </Container>
          );
        }}
      </Formik>
    </>
  );
};

export default PackageForm;
