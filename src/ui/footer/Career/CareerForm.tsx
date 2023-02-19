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

import * as yup from "yup";
import { margin } from "@mui/system";

const TextFieldDesign = styled(TextField)({
  margin: "10px",
  width: "300px",
});

// ************validation of application form*****************

const validationAppSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .matches(/^[A-Za-z ]*$/, "enter  only Alphabates")
    .required("First Name is required"),
  lastName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .matches(/^[A-Za-z ]*$/, "enter the only Alphabates")
    .required("LastName is required"),
  email: yup
    .string()
    .email("Invalid email")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/, "Enter valid Email Address")
    .required("Required"),
  mobile: yup
    .string()
    .min(10, "too short")
    .max(10, "too long")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Enter Valid Mobile number"
    )
    .required("Required"),

  age: yup.number().required("required"),
});

interface MyFormValues {
  firstName: string;
  lastName: string;
  email: string;

  mobile: string;
  age: string;
}

const CareerForm: React.FunctionComponent<{}> = () => {
  const [fomrData, setFormData] = React.useState([]);

  const initialValues: MyFormValues = {
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",

    age: "",
  };

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
        initialValues={initialValues}
        validationSchema={validationAppSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("values:", values);

          resetForm({ values: initialValues });
        }}
      >
        {({
          values,
          touched,
          errors,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Grid sx={{ margin: { xs: "auto" } }}>
                <Grid item sx={{ m: 2 }}>
                  <TextFieldDesign
                    name="firstName"
                    id="firstName"
                    type="text"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched?.firstName && errors?.firstName ? true : false
                    }
                    helperText={
                      touched?.firstName && errors?.firstName
                        ? errors?.firstName
                        : ""
                    }
                  />
                  <TextFieldDesign
                    name="lastName"
                    id="lastName"
                    type="text"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched?.lastName && errors?.lastName ? true : false}
                    helperText={
                      touched?.firstName && errors?.firstName
                        ? errors?.firstName
                        : ""
                    }
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
                    onBlur={handleBlur}
                    error={touched?.mobile && errors?.mobile ? true : false}
                    helperText={
                      touched?.mobile && errors?.mobile ? errors?.mobile : ""
                    }
                  />
                  <TextFieldDesign
                    name="email"
                    id="email"
                    type="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched?.email && errors?.email ? true : false}
                    helperText={
                      touched?.email && errors?.email ? errors?.email : ""
                    }
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
                    onBlur={handleBlur}
                    error={touched?.age && errors?.age ? true : false}
                    helperText={touched?.age && errors?.age ? errors?.age : ""}
                  />
                  <FormControl
                    sx={{
                      m: 1.5,
                      border: "1px solid #c4c4c4",
                      paddingLeft: "2px",
                      width: "295px",
                      borderRadius: "5px",
                    }}
                  >
                    <FormLabel id="gender" sx={{ color: "#919191", m: 1 }}>
                      Gender
                    </FormLabel>
                    <RadioGroup row name="gender" sx={{ ml: 1 }}>
                      <FormControlLabel
                        sx={{ color: "#919191" }}
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        sx={{ color: "#919191" }}
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        sx={{ color: "#919191" }}
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>

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
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Grid>
  );
};

export default CareerForm;
