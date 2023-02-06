import * as React from "react";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import styled from "@emotion/styled";

import { Formik, Form, FormikProps } from "formik";

import * as Yup from "yup";
import { margin } from "@mui/system";

const TextFieldDesign = styled(TextField)({
  margin: "10px",
  width: "300px",
});

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
    <Grid
      container
      sx={{
        d: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "50px 0",
      }}
    >
      <Box sx={{ marginBottom: "30px" }}>
        <Typography
          variant="h5"
          sx={{
            color: "#27488D",
            fontFamily: "Sans-serif",
            fontSize: " 22px",
            fontWeight: "750",
            height: "30px",
            margin: "10px 0",
            textAlign: "center",
          }}
        >
          Job Application Form
        </Typography>
        <Typography
          sx={{
            color: "#27488D",
            fontFamily: "Sans-serif",

            height: "30px",
          }}
        >
          Please Fill Out the Form Below to Submit Your Job Application!
        </Typography>
      </Box>
      <Formik
        initialValues={{
          lastName: "",
          firstName: "",
          mobile: "",
          email: "",

          age: "",
          gender: "",
          uploadResume: "",
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        {({ values, handleSubmit, handleChange }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Grid sx={{ margin: { xs: "auto" } }}>
                <Grid item sx={{ m: 2 }}>
                  <TextFieldDesign
                    name="lastName"
                    id="lastName"
                    type="text"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                  />
                  <TextFieldDesign
                    name="firstName"
                    id="firstName"
                    type="text"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item sx={{ m: 2 }}>
                  <TextFieldDesign
                    name="mobile"
                    id="mobile"
                    type="text"
                    label="Mobile Number"
                    value={values.mobile}
                    onChange={handleChange}
                  />
                  <TextFieldDesign
                    name="email"
                    id="email"
                    type="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item sx={{ m: 2 }}>
                  <TextFieldDesign
                    name="age"
                    id="age"
                    type="number"
                    label="Age"
                    value={values.age}
                    onChange={handleChange}
                  />

                  <FormControl sx={{ m: 2 }}>
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

                <Grid
                  item
                  sx={{
                    m: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      marginLeft: " 10px",
                      alignItems: "center",
                      margin: "auto",
                      color: "#7A7A7A",
                    }}
                  >
                    Upload Resume
                  </Typography>
                  <TextFieldDesign
                    name="uploadResume"
                    id="uploadResume"
                    type="file"
                    value={values.uploadResume}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid container sx={{ marginTop: "50px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      margin: "auto",

                      backgroundColor: "#27488D",
                      "&:hover": { backgroundColor: "#27488D" },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Grid>
  );
};

export default CareerForm;
