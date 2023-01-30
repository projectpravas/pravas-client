import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import LockResetIcon from "@mui/icons-material/LockReset";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink as NLink, useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AuthService from "../../../services/AuthService";
import { errorToast, successToast } from "../../../ui/toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import defineYupSchema from "../../../shared/yup-validations/user-validation/usersYupValidation";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import {
  resetLoggedUser,
  selectLoggedUser,
} from "../../../app/slices/AuthSlice";
import User from "../../../shared/models/userModel";

interface IChangePasswordProps {}

interface intialVlauesInterface {
  oldPassword?: string;
  password: string;
  confirmPassword?: string;
}

const passwordValidationSchema = defineYupSchema({
  hasPassword: true,
});
const initialValues: intialVlauesInterface = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

const NavLink = styled(NLink)({
  textDecoration: "none",
});

const theme = createTheme();

const ChangePassword: React.FunctionComponent<IChangePasswordProps> = (
  action
) => {
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeElementId, setActiveElementId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [tokenConsumed, setTokenConsumed] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { token } = useParams();
  const currentLoggedUser: User = useSelector(selectLoggedUser);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickEyeIcon = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const destroySession = () => {
    sessionStorage.clear();
    dispatch(resetLoggedUser());
  };

  const checkTokenValidity = () => {
    // const pathToken = token;
    if (currentLoggedUser?._id)
      token = sessionStorage.getItem("aToken") as string;

    AuthService.validateToken(token as string)
      .then((res) => {
        if (!currentLoggedUser?._id) {
          if (
            res?.data?.data?.userActivityDetails?.passwordTimeStamp >
            res?.data?.data?.userActivityDetails?.sentEmailTimeStamp
          ) {
            setTokenConsumed(true);
          } else setTokenConsumed(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setSessionExpired(true);
        destroySession();
      });
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Formik
          initialValues={initialValues}
          validationSchema={passwordValidationSchema}
          onSubmit={(values, { resetForm }) => {
            delete values?.confirmPassword;

            checkTokenValidity();

            const passwordTimeStamp = Date.now();

            const prePassword = currentLoggedUser?._id
              ? oldPassword
              : undefined;

            !sessionExpired &&
              AuthService.resetPassword(
                values.password,
                token as string,
                passwordTimeStamp,
                prePassword
              )
                .then((res) => {
                  const msg = res?.data?.message || "Successfully changed ....";
                  successToast(msg, 3000);
                  resetForm({ values: initialValues });
                  destroySession();
                  !currentLoggedUser?._id
                    ? navigate("/login")
                    : navigate("login");
                })
                .catch((err) => {
                  console.error(err);
                  resetForm({ values: initialValues });
                  setConfirmPassword("");
                  setOldPassword("");
                  const msg =
                    err?.response.data?.message ||
                    "Couldn't changed Successfully....";
                  errorToast(msg);
                });
          }}
        >
          {({
            values,
            errors,
            isValid,
            dirty,
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

                    {sessionExpired ? (
                      <>
                        <Typography component="p" variant="caption">
                          <b>This link has been expired... </b>
                        </Typography>
                        <br />

                        <Button
                          type="button"
                          variant="contained"
                          onClick={() => navigate("/reset-password")}
                        >
                          Resend Link
                        </Button>
                      </>
                    ) : tokenConsumed ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            textAlign: "center",
                            flexDirection: "column",
                          }}
                        >
                          <Typography component="p" variant="caption">
                            <b>This was One Time Password reset Link </b>
                          </Typography>
                          <br />
                          <Typography
                            component="p"
                            variant="caption"
                            color="red"
                          >
                            <i>
                              <b>You Already have Changed Password..</b>
                            </i>
                          </Typography>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Typography component="p" variant="caption">
                          Set <b>New Password</b> and click on button
                        </Typography>

                        {!currentLoggedUser._id && (
                          <Box
                            sx={{
                              display: "flex",
                              textAlign: "center",
                              p: 0,
                              m: 0,
                            }}
                          >
                            <Typography component="p" variant="caption">
                              <label style={{ display: "block", color: "red" }}>
                                Be Careful !!..
                              </label>
                              <b>
                                You can Change your Password After
                                <em> few minutes </em>, Once you changed it.....
                              </b>
                            </Typography>
                          </Box>
                        )}
                        <Box
                          // component="form"
                          // onSubmit={handleSubmit}
                          sx={{ mt: 1 }}
                        >
                          {currentLoggedUser?._id && (
                            <>
                              <TextField
                                sx={{ mb: 3 }}
                                margin="normal"
                                required
                                fullWidth
                                id="old-password"
                                label="Old Password"
                                name="oldPassword"
                                value={oldPassword}
                                autoComplete="password"
                                autoFocus
                                onBlur={handleBlur}
                                type="password"
                                onChange={(e) => {
                                  setOldPassword(e?.target?.value);
                                }}
                                error={
                                  touched?.oldPassword && oldPassword == ""
                                    ? true
                                    : false
                                }
                                helperText={
                                  touched?.oldPassword && oldPassword == ""
                                    ? "password required"
                                    : ""
                                }
                              />
                            </>
                          )}

                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="New Password"
                            name="password"
                            value={values?.password}
                            autoComplete="password"
                            onChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            onBlur={(e) => {
                              handleBlur(e);
                              setActiveElementId("");
                            }}
                            onFocus={() => setActiveElementId("password")}
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
                                    onClick={handleShowPassword}
                                    onMouseDown={handleClickEyeIcon}
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
                                : values?.password == oldPassword &&
                                  oldPassword != ""
                                ? true
                                : false
                            }
                            helperText={
                              touched?.password && errors?.password
                                ? errors?.password
                                : values?.password == oldPassword &&
                                  oldPassword != ""
                                ? "Can't be Old Password"
                                : ""
                            }
                          />
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="confirm-password"
                            label="Confirm Password"
                            name="confirmPassword"
                            value={confirmPassword}
                            autoComplete="password"
                            onBlur={handleBlur}
                            type="password"
                            disabled={
                              !values?.password || !confirmPassword
                                ? false
                                : values?.password != confirmPassword
                                ? false
                                : true
                            }
                            onChange={(e) => {
                              setConfirmPassword(e?.target?.value);
                            }}
                            error={
                              touched?.confirmPassword &&
                              values?.password != confirmPassword
                                ? true
                                : false
                            }
                            helperText={
                              touched?.confirmPassword &&
                              values?.password != confirmPassword
                                ? "incorrect password"
                                : ""
                            }
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
                            disabled={
                              currentLoggedUser?._id
                                ? //reset password
                                  isValid &&
                                  oldPassword != (values?.password || "") &&
                                  values?.password != "" &&
                                  values?.password == confirmPassword
                                  ? false
                                  : true
                                : //change password
                                isValid &&
                                  values?.password != "" &&
                                  confirmPassword == values?.password
                                ? false
                                : true
                            }
                          >
                            Change Password
                          </Button>
                        </Box>
                      </>
                    )}
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

export default ChangePassword;
