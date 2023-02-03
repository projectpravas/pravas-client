import * as React from "react";
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Grid,
  Container,
  Button,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
interface ICareerFormProps {
  //   lastName: string;
  //   firstName: string;
  //   middleName: string;
  //   email: string;
  //   password: string;
  //   confirmPassword: string;
  //   age: number;
  //   gender: string;
}

const CareerForm: React.FunctionComponent<ICareerFormProps> = (props) => {
  return (
    <div>
      <Formik
        initialValues={{
          lastName: "",
          firstName: "",
          mobile: "",
          email: "",
          applicationPosition: "",
          age: "",
          gender: "",
          resumeUpload: "",
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        {({ values, handleSubmit, handleChange }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Grid item>
                <TextField
                  name="lastName"
                  id="lastName"
                  type="text"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                />
                <TextField
                  name="firstName"
                  id="firstName"
                  type="text"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  name="mobile"
                  id="mobile"
                  type="text"
                  label="Mobile Number"
                  value={values.mobile}
                  onChange={handleChange}
                />
                <TextField
                  name="email"
                  id="email"
                  type="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid>
                <TextField
                  name="applicationPosition"
                  id="applicationPosition"
                  type="text"
                  label="Application position"
                  value={values.applicationPosition}
                  onChange={handleChange}
                />
                <TextField
                  name="age"
                  id="age"
                  type="number"
                  label="Age"
                  value={values.age}
                  onChange={handleChange}
                />
              </Grid>
              <Grid>
                <FormControl>
                  <FormLabel id="gender">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="gender"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="female"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="other"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CareerForm;
