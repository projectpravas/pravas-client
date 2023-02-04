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
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  gender: string;
}

const CareerForm: React.FunctionComponent<ICareerFormProps> = (props) => {
  return (
    <div>
      <Formik
        initialValues={{
          lastName: "",
          firstName: "",
          middleName: "",
          email: "",
          password: "",
          confirmPassword: "",
          age: "",
          gender: "",
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        {({ values, handleSubmit, handleChange }) => {
          return (
            <Form onSubmit={handleSubmit}>
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
              <TextField
                name="middleName"
                id="middleName"
                type="text"
                label="Middle Name"
                value={values.middleName}
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
              <TextField
                name="password"
                id="password"
                type="password"
                label="Password"
                value={values.password}
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
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CareerForm;
