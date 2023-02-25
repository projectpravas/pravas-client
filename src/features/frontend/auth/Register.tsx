import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink as NLink, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Formik } from "formik";
import defineUserYupValidation from "../../../shared/yup-validations/user-validation/usersYupValidation";
import defineInitialUser from "../../../shared/yup-validations/user-validation/initialUser";
import Visibility from "@mui/icons-material/Visibility";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Verified from "@mui/icons-material/VerifiedRounded";
import { sendOTP, verifyOTP } from "../../../shared/firebase/firebaseConfig";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import UserService from "../../../services/UserService";
import { errorToast, successToast } from "../../../ui/toast/Toast";
import TourService from "../../../services/TourService";
import { Helmet } from "react-helmet-async";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const Link = styled(NLink)({
  textDecoration: "none",
});

const combineFields = {
  hasFirst: true,
  hasLast: true,
  hasMobile: true,
  hasEmail: true,
  hasPassword: true,
  hasDob: true,
  hasGender: true,
};

const signupInitialUser = defineInitialUser({ ...combineFields });

const signupValidation = defineUserYupValidation({ ...combineFields });

const theme = createTheme();

const Register = () => {
  const [OTPStatus, setOTPStatus] = useState({
    OTP: "",
    showOTP: false,
    sendOTP: false,
  });
  const [mobNumber, setMobNumber] = useState("");
  const [verifiedStatus, setVerifiedStatus] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(NaN);
  const [activeElementId, setActiveElementId] = useState("");
  const [signUpCheckbox, setSignUpCheckbox] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    TourService.fetchAllTours().then((res) => {
      const arr: any = [];
      const imgs = res?.data?.data?.forEach((v: any, i: any) =>
        arr.push(...v.images)
      );
      setImages(arr);
    });
  }, []);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const initialStateReset = () => {
    setVerifiedStatus(true);
    setOTPStatus({ ...OTPStatus, showOTP: false });
    setTimer(0);
    setTimerId(NaN);
    clearInterval(timerId);
  };

  const handleOTPCode = (e: any) => {
    const { value } = e.target;
    if (value.length == 6) setOTPStatus({ ...OTPStatus, OTP: value });
  };

  const CDTimer = () => {
    setTimerId(
      Number(
        setInterval(() => {
          setTimer((timer) => timer - 1);
        }, 1000)
      )
    );
  };

  const stopTimer = () => {
    clearInterval(timerId);
    setTimer(0);
  };

  useEffect(() => {
    setTimer(timer);
    if (timer == 60) CDTimer();
    else if (timer == 0) {
      clearInterval(timerId);
      setOTPStatus({ ...OTPStatus, sendOTP: false, showOTP: false });
    }
  }, [timer, OTPStatus.sendOTP]);

  return (
    <>
      <Helmet>
        <title>Register To Pravas Tourism</title>
        <meta name="description" content="Register to Pravas Tourism" />
        <meta name="keywords" content="Register to Pravas Tourism" />
        <link rel="canonical" href="/register" />
      </Helmet>
      <ThemeProvider theme={theme}>
        <Grid container component="main">
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(http://localhost:9999/${
                images[Math.floor(Math.random() * images.length)]
              })`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>

              <Formik
                initialValues={signupInitialUser}
                enableReinitialize
                validationSchema={signupValidation}
                onSubmit={(values, { resetForm }) => {
                  UserService.createUser({
                    ...values,
                    status: "active",
                    role: "customer",
                  })
                    .then((res) => {
                      const msg =
                        res?.data?.message || "User created successfully...";
                      successToast(msg, 3000);
                      setVerifiedStatus(false);
                      setSignUpCheckbox(false);
                      resetForm({});
                      navigate("/login");
                      // console.log(res?.data?.message);
                    })
                    .catch((err) => {
                      const msg =
                        err?.response?.data?.message ||
                        "User couldn't created...";
                      errorToast(msg, 5000);
                      console.error(err);
                    });
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
                  const touchedName: any = touched?.name;
                  const errorsName: any = errors?.name;

                  return (
                    <form onSubmit={handleSubmit}>
                      <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              autoComplete="firstName"
                              required
                              fullWidth
                              id="firstName"
                              label="First Name"
                              autoFocus
                              size="small"
                              name="name.first"
                              value={values?.name?.first}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                touchedName?.first && errorsName?.first
                                  ? true
                                  : false
                              }
                              helperText={
                                touchedName?.first && errorsName?.first
                                  ? errorsName?.first
                                  : ""
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              required
                              fullWidth
                              id="lastName"
                              label="Last Name"
                              name="name.last"
                              autoComplete="family-name"
                              size="small"
                              value={values?.name?.last}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                touchedName?.last && errorsName?.last
                                  ? true
                                  : false
                              }
                              helperText={
                                touchedName?.last && errorsName?.last
                                  ? errorsName?.last
                                  : ""
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              id="mobile"
                              label="Mobile"
                              name="mobile"
                              size="small"
                              autoComplete="mobile"
                              value={values?.mobile}
                              disabled={verifiedStatus}
                              InputLabelProps={{
                                shrink:
                                  activeElementId == "mobile"
                                    ? true
                                    : values?.mobile?.length != 0
                                    ? true
                                    : false,
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment
                                    position="end"
                                    sx={{ order: 2, mr: "0.5em" }}
                                  >
                                    {verifiedStatus ? (
                                      <Verified color="primary" />
                                    ) : values?.mobile?.length == 10 &&
                                      !OTPStatus.sendOTP &&
                                      !errors.mobile &&
                                      !verifiedStatus ? (
                                      <Button
                                        type="button"
                                        onClick={() => {
                                          setOTPStatus({
                                            ...OTPStatus,
                                            showOTP: true,
                                            sendOTP: true,
                                          });
                                          sendOTP(setVerifiedStatus, mobNumber);
                                          setTimer(60);
                                        }}
                                      >
                                        Send OTP
                                      </Button>
                                    ) : (
                                      ""
                                    )}
                                  </InputAdornment>
                                ),
                              }}
                              onBlur={(e) => {
                                handleBlur(e);
                                setActiveElementId("");
                              }}
                              onChange={(e) => {
                                handleChange(e);
                                setMobNumber(e.target.value);
                                stopTimer();
                              }}
                              onFocus={() => setActiveElementId("mobile")}
                              error={
                                touched?.mobile && errors?.mobile ? true : false
                              }
                              helperText={
                                touched?.mobile && errors?.mobile
                                  ? errors?.mobile
                                  : ""
                              }
                            />
                            {timer > 0 && (
                              <span style={{ fontSize: "0.8em" }}>
                                {`Resend OTP in ${timer} seconds..`}
                              </span>
                            )}
                          </Grid>
                          {values?.mobile?.length == 10 &&
                            OTPStatus.showOTP && (
                              <Grid
                                sx={{
                                  flexWrap: "nowrap",
                                  justifyContent: "center",
                                  m: "1em",
                                  // mt: "1em",
                                }}
                              >
                                <TextField
                                  type="text"
                                  id="otpInput"
                                  placeholder="Enter Your Code here"
                                  sx={{ width: "50%", fontSize: "0.5em" }}
                                  inputProps={{
                                    style: {
                                      padding: "0.4em",
                                    },
                                  }}
                                  onChange={handleOTPCode}
                                  size="small"
                                />
                                <Button
                                  variant="contained"
                                  color="primary"
                                  id="otpverifybtn"
                                  disabled={
                                    OTPStatus.OTP.length == 6 ? false : true
                                  }
                                  sx={{
                                    display: "inline-block",
                                    ml: "0.5em",
                                    lineHeight: "0.8em",
                                    verticalAlign: "-webkit-baseline-middle",
                                  }}
                                  onClick={() =>
                                    verifyOTP(
                                      OTPStatus.OTP,
                                      mobNumber,
                                      initialStateReset
                                    )
                                  }
                                >
                                  verify Number
                                </Button>
                              </Grid>
                            )}
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              autoComplete="email"
                              size="small"
                              value={values?.email}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={
                                touched?.email && errors?.email ? true : false
                              }
                              helperText={
                                touched?.email && errors?.email
                                  ? errors?.email
                                  : ""
                              }
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <TextField
                              type="date"
                              autoComplete="dob"
                              size="small"
                              name="dob"
                              required
                              fullWidth
                              id="dob"
                              label="Date of Birth"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={values?.dob?.toString().split("T")[0]}
                              onBlur={handleBlur}
                              onChange={(e: any) => {
                                handleChange(e);
                              }}
                              error={touched?.dob && errors?.dob ? true : false}
                              helperText={
                                touched?.dob && errors?.dob ? errors?.dob : ""
                              }
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <FormControl
                              size="small"
                              fullWidth
                              required
                              error={
                                touched?.gender && errors?.gender ? true : false
                              }
                            >
                              <FormLabel id="gender">Gender</FormLabel>
                              <RadioGroup
                                row
                                aria-labelledby="gender-radio-buttons-group-label"
                                name="gender"
                                value={values?.gender}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              >
                                <FormControlLabel
                                  value="male"
                                  control={<Radio size="small" />}
                                  label="Male"
                                />
                                <FormControlLabel
                                  value="female"
                                  control={<Radio size="small" />}
                                  label="Female"
                                />
                                <FormControlLabel
                                  value="other"
                                  control={<Radio size="small" />}
                                  label="Other"
                                />
                              </RadioGroup>

                              <FormHelperText>
                                {touched?.gender && errors?.gender
                                  ? errors?.gender
                                  : ""}
                              </FormHelperText>
                            </FormControl>
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              // type="password"
                              id="password"
                              size="small"
                              autoComplete="new-password"
                              value={values?.password}
                              onChange={handleChange}
                              onFocus={() => setActiveElementId("password")}
                              onBlur={(e) => {
                                handleBlur(e);
                                setActiveElementId("");
                              }}
                              type={showPassword ? "text" : "password"}
                              InputLabelProps={{
                                shrink:
                                  activeElementId == "password"
                                    ? true
                                    : values?.password?.length != 0
                                    ? true
                                    : false,
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment
                                    position="end"
                                    sx={{ order: 2, mr: "1em" }}
                                  >
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {showPassword ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              error={
                                touched?.password && errors?.password
                                  ? true
                                  : false
                              }
                              helperText={
                                touched?.password && errors?.password
                                  ? errors?.password
                                  : ""
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  color="primary"
                                  id="signUpCheckbox"
                                  name="signUpCheckbox"
                                  value={signUpCheckbox}
                                  onBlur={handleBlur}
                                  onChange={() =>
                                    setSignUpCheckbox(!signUpCheckbox)
                                  }
                                  checked={signUpCheckbox}
                                />
                              }
                              label="I have provided valid Mobile number and Email to contact me"
                            />
                          </Grid>
                        </Grid>
                        <Button
                          type="submit"
                          fullWidth
                          id="sign-in-button"
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          disabled={verifiedStatus && isValid ? false : true}
                        >
                          Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                          <Grid item>
                            <Link to="/login">
                              Already have an account? Sign in
                            </Link>
                          </Grid>
                        </Grid>
                      </Box>
                    </form>
                  );
                }}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};
export default Register;
