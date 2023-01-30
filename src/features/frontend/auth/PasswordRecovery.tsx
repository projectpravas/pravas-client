import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import LockResetIcon from "@mui/icons-material/LockReset";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink as NLink, useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AuthService from "../../../services/AuthService";
import {
  errorToast,
  promiseToast,
  successToast,
} from "../../../ui/toast/Toast";
import { Formik } from "formik";
import defineYupSchema from "../../../shared/yup-validations/user-validation/usersYupValidation";
import ChangePassword from "./ChangePassword";
interface IPasswordRecoveryProps {}

const emailValidationSchema = defineYupSchema({
  hasEmail: true,
});
const initialValues = {
  email: "",
};

const NavLink = styled(NLink)({
  textDecoration: "none",
});

const theme = createTheme();

const PasswordRecovery: React.FunctionComponent<IPasswordRecoveryProps> = (
  action
) => {
  const [loginChkBox, setLoginChkBox] = useState(false);
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Formik
          initialValues={initialValues}
          validationSchema={emailValidationSchema}
          onSubmit={(values, { resetForm }) => {
            promiseToast(
              AuthService.sendPasswordResetLink(values.email)
                .then((res) => {
                  // console.log("res : ", res);
                  const successMsg =
                    res.data.message || `Check your ${values.email} address.. `;
                  successToast(successMsg, 8000);
                  resetForm({ values: initialValues });
                  setLoginChkBox(false);
                  navigate(`/login`);
                })
                .catch((err) => {
                  console.error("err :", err);
                  setLoginChkBox(false);
                  const errorMsg =
                    err.response.data.message || "Invalid email address";
                  errorToast(errorMsg, 5000);
                }),
              {
                pending: "Please wait....",
              }
            );
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
                <Card variant="elevation" sx={{ p: 3, pt: 0 }}>
                  <Box
                    sx={{
                      marginTop: 6,
                      marginBottom: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                      <LockResetIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Change Password
                    </Typography>
                    <br />
                    <Typography component="p" variant="caption">
                      Enter your registered <b>Email Address</b> and click on
                      button
                    </Typography>

                    <Box
                      // component="form"
                      // onSubmit={handleSubmit}
                      sx={{ mt: 1 }}
                    >
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={values?.email}
                        autoComplete="email"
                        autoFocus
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={touched?.email && errors?.email ? true : false}
                        helperText={
                          touched?.email && errors?.email ? errors?.email : ""
                        }
                        disabled={loginChkBox && !errors.email}
                      />

                      <FormControlLabel
                        control={
                          <Checkbox
                            value="remember"
                            color="primary"
                            onChange={() => setLoginChkBox(!loginChkBox)}
                            checked={values?.email ? loginChkBox : false}
                          />
                        }
                        label="Allow us to send mail.."
                      />

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                        }}
                        // disabled={isValid}
                        disabled={isValid && loginChkBox ? false : true}
                      >
                        Send Link
                      </Button>
                    </Box>
                  </Box>
                </Card>
              </form>
            );
          }}
        </Formik>
      </Container>
    </ThemeProvider>
  );
};

export default PasswordRecovery;
