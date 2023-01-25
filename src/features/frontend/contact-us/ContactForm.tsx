import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Formik } from "formik";
import defineUserYupValidation from "../../../shared/yup-validations/user-validation/usersYupValidation";

interface IContactFormProps {}

const initialUser = {
  name: "",
  mobile: "",
  email: "",
  subject: "",
  message: "",
};

const userValidationSchema = defineUserYupValidation({
  hasMobile: true,
  hasEmail: true,
});

const ContactForm: React.FunctionComponent<IContactFormProps> = (props) => {
  return (
    <>
      <Formik
        initialValues={initialUser}
        enableReinitialize
        validationSchema={userValidationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
        }}
      >
        {({
          values,
          errors,
          isValid,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="name"
                    label="Your Name"
                    variant="outlined"
                    type="text"
                    fullWidth
                    name="name"
                    required
                    autoFocus
                    value={values?.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched?.name && values?.name == "" ? true : false}
                    helperText={
                      touched?.name && values?.name == ""
                        ? "Name is required"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="email"
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    fullWidth
                    required
                    name="email"
                    value={values?.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched?.email && errors?.email ? true : false}
                    helperText={
                      touched?.email && errors?.email ? errors?.email : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="mobile"
                    label="Mobile"
                    variant="outlined"
                    sx={{ bgcolor: "faf5ee" }}
                    type="tel"
                    fullWidth
                    required
                    name="mobile"
                    value={values?.mobile}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched?.mobile && errors?.mobile ? true : false}
                    helperText={
                      touched?.mobile && errors?.mobile ? errors?.mobile : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="subject"
                    label="Subject"
                    variant="outlined"
                    type="text"
                    fullWidth
                    required
                    name="subject"
                    value={values?.subject}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={
                      touched?.subject && values?.subject == "" ? true : false
                    }
                    helperText={
                      touched?.subject && values?.subject == ""
                        ? "Write your Subject"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="message"
                    label="Write Message"
                    variant="outlined"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    required
                    name="message"
                    value={values?.message}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={
                      touched?.message && values?.message == "" ? true : false
                    }
                    helperText={
                      touched?.message && values?.message == ""
                        ? "Write your Message"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    id="contact-button"
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon />}
                    disabled={
                      values?.name &&
                      values?.subject &&
                      values?.message &&
                      isValid
                        ? false
                        : true
                    }
                  >
                    SEND A MESSAGE
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default ContactForm;
