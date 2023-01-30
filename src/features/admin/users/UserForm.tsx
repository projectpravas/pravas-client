import React, { useEffect, useState } from "react";
import { sendOTP, verifyOTP } from "../../../shared/firebase/firebaseConfig";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import UserCountryState from "./CountryState";
import User from "../../../shared/models/userModel";
import { Formik } from "formik";
import defineYupSchema from "../../../shared/yup-validations/user-validation/usersYupValidation";
import defineInitialUser from "../../../shared/yup-validations/user-validation/initialUser";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { styled } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import UserService from "../../../services/UserService";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import UnverifiedUserIcon from "@mui/icons-material/GppBad";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Verified from "@mui/icons-material/VerifiedRounded";
import { errorToast, successToast } from "../../../ui/toast/Toast";
import { endPoints } from "../../../api";
import { useNavigate } from "react-router-dom";
import { createFD } from "./createFormData";

interface IUserFormProps {
  currentUser: User;
  type: string;
  roleProps: string;
  loadUser: Function;
}

const UserForm: React.FunctionComponent<IUserFormProps> = ({
  currentUser,
  type,
  roleProps,
  loadUser,
}) => {
  // yup schema and initial user
  const commonRequiredFields = {
    hasFirst: true,
    hasLast: true,
    hasMobile: true,
    hasEmail: true,
    hasStreet: true,
    hasPincode: true,
    hasDob: true,
    hasGender: true,
    hasPassword: type == "add" ? true : false,
  };

  let initialUserObj = defineInitialUser({
    ...commonRequiredFields,
    hasCountry: true,
    hasState: true,
    hasCity: true,
    hasAvatar: true,
    hasStatus: true,
    hasRole: true,
  });

  const userValidationSchema = defineYupSchema({
    ...commonRequiredFields,
  });

  //states
  const [countyVal, setCountryVal] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [cityVal, setCityVal] = useState("");
  const [profilePic, setProfilePic] = useState<string>("");
  const [initialUser, setInitialUser] = useState<User>(initialUserObj);
  const [userStatus, setUserStatus] = useState(initialUserObj?.status);

  const [editMode, setEditMode] = useState(false);
  const [activeElementId, setActiveElementId] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  //mobile OTP timer
  const [OTPStatus, setOTPStatus] = useState({
    OTP: "",
    showOTP: false,
    sendOTP: false,
  });
  const [mobNumber, setMobNumber] = useState("");
  const [verifiedStatus, setVerifiedStatus] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerId, setTimerId] = useState(NaN);
  const [checkMob, setCheckMob] = useState("");

  const navigate = useNavigate();

  // Edit Switch
  const EditSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&:before, &:after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&:after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  // getData from CountryStateCity comp
  function getAddressData(type: string, val: string) {
    if (val) {
      type == "country" && setCountryVal(val);
      type == "state" && setStateVal(val);
      type == "city" && setCityVal(val);
    }
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files && e?.target?.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      setProfilePic(reader?.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUserStatus = (e: any, value: string) => {
    setUserStatus(value == "active" ? "active" : "inactive");
  };

  const updateUser = (id: string, fd: FormData) => {
    UserService.updateUser(id, fd)
      .then((res) => {
        const msg = res?.data?.message || "Updated successfully...";
        successToast(msg, 3000);
        setEditMode(false);
        type == "edit" && loadUser(id);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
        const msg = err?.response?.data?.message || "Couldn't updated..";
        errorToast(msg, 5000);
      });
  };

  const addUser = (fd: FormData) => {
    UserService.createUser(fd)
      .then((res) => {
        const { _id, role } = res?.data?.data;
        const msg = res?.data?.message || "Created successfully...";
        successToast(msg, 3000);
        setEditMode(false);
        _id && role && navigate(`/secured/add-edit/${_id}/edit/${role}`);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
        const msg = err?.response?.data?.message || "Couldn't created..";
        errorToast(msg, 5000);
      });
  };

  useEffect(() => {
    if (type != "add") {
      const keyValuesInitial = Object.keys(initialUserObj);

      for (let i of keyValuesInitial) {
        Object.entries(currentUser).forEach(([key, value], index) => {
          if (i == key) initialUserObj[key as keyof typeof currentUser] = value;
        });
      }
      // set Initial user as current user
      setInitialUser(initialUserObj);

      // setProfilePic and user status
      setUserStatus(currentUser?.status);
      setProfilePic(currentUser?.avatar as string);
      // setVerifiedStatus(true);
      currentUser?.mobile && setMobNumber(currentUser?.mobile);
      currentUser?.mobile && setCheckMob(currentUser?.mobile);
    } else {
      setInitialUser(initialUserObj);
      setUserStatus("active");
      setEditMode(true);
    }
  }, [type, currentUser]);

  //Timer OTP setup

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
    // setVerifiedStatus(verifiedStatus);
    if (timer == 60) CDTimer();
    else if (timer == 0) {
      clearInterval(timerId);
      setOTPStatus({ ...OTPStatus, sendOTP: false, showOTP: false });
    }
  }, [timer, OTPStatus.sendOTP]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="h5">{`${
          type == "profile"
            ? "My Profile"
            : type == "add"
            ? `Add ${roleProps == "admin" ? "Admin" : "Customer"}`
            : `${roleProps == "admin" ? "Admin" : "Customer"} Profile`
        }`}</Typography>
        <IconButton
          size="small"
          style={{ color: "#000" }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNewIcon color="inherit" />
          Back
        </IconButton>
      </Box>
      <Paper
        sx={{
          p: 2,
          // #fcfbfb
          backgroundColor: userStatus == "active" ? "#d8f3d887" : "#fcf1f1",
          transition: `1s ease-in-out`,
        }}
      >
        <Formik
          initialValues={initialUser}
          enableReinitialize
          validationSchema={userValidationSchema}
          onSubmit={(values, { resetForm }) => {
            if (countyVal)
              values?.address && (values.address.country = countyVal);
            if (stateVal) values?.address && (values.address.state = stateVal);
            if (cityVal) values?.address && (values.address.city = cityVal);
            if (values?.role == "") values.role = roleProps;
            if (userStatus) values?.status && (values.status = userStatus);

            // console.log(values);
            // return;

            //create FormData
            const fd = createFD(values);

            if (type == "edit" || type == "profile") {
              if (
                currentUser?.name?.first == values?.name?.first &&
                currentUser?.name?.last == values?.name?.last &&
                currentUser?.mobile == values?.mobile &&
                currentUser?.email == values?.email &&
                currentUser?.address?.street == values?.address?.street &&
                currentUser?.address?.city == values?.address?.city &&
                currentUser?.address?.state == values?.address?.state &&
                currentUser?.address?.country == values?.address?.country &&
                currentUser?.address?.pincode == values?.address?.pincode &&
                currentUser?.dob == values?.dob &&
                currentUser?.status == values?.status &&
                currentUser?.avatar == values?.avatar
              ) {
                successToast("Data have saved already", 3000);
                return;
              }
              {
                updateUser(currentUser?._id as string, fd);
              }
            } else {
              values?.password &&
                fd.append("password", values?.password as string);

              addUser(fd);
            }
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
            const touchedValue: any = touched;
            const errorsValue: any = errors;

            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <Box>
                      <Card
                        variant="elevation"
                        sx={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          width: 150,
                          height: 150,
                          m: "auto",
                          mb: 3,
                          borderRadius: "10%",
                          backgroundColor: "#f1eaea",
                        }}
                      >
                        <img
                          id="user-avatar"
                          src={
                            profilePic == "" || profilePic == undefined
                              ? "/images/profile-picture-avatar-png-green.png"
                              : profilePic?.includes("user-profile")
                              ? `${endPoints.serverBaseURL}/${profilePic}`
                              : profilePic
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                            padding: "0.25em",
                            borderRadius: "50%",
                            // objectFit: "contain",
                          }}
                          alt="user-avatar"
                        />
                        <FormLabel
                          sx={{ position: "absolute", top: 0, right: 0 }}
                          htmlFor="avatar-select"
                        >
                          <CameraAltIcon />
                        </FormLabel>
                        <input
                          style={{ display: "none" }}
                          id="avatar-select"
                          type="file"
                          accept=".jpeg,.jpg,.png"
                          disabled={!editMode}
                          onChange={(e) => {
                            handlePicChange(e);
                            const file = e?.target?.files
                              ? e?.target?.files[0]
                              : "";
                            values.avatar = file;
                          }}
                        />
                      </Card>
                    </Box>
                    {type != "profile" && (
                      <Box
                        sx={{
                          mt: 4,
                          display: "flex",
                          flexDirection: "column",
                          width: "fit-content",
                          alignItems: "center",
                          mx: "auto",
                        }}
                      >
                        <Tooltip
                          title={userStatus == "active" ? "active" : "inactive"}
                          placement="left"
                          arrow
                        >
                          <Chip
                            disabled={!editMode}
                            label="Status"
                            sx={{
                              order: 2,
                              mt: 1,
                              fontWeight: "600",
                            }}
                            style={{
                              backgroundColor:
                                userStatus == "active" ? "#8cda8c" : "#e09494",
                            }}
                            onClick={(e) =>
                              handleUserStatus(
                                e,
                                userStatus == "active" ? "inactive" : "active"
                              )
                            }
                          />
                        </Tooltip>
                        <ToggleButtonGroup
                          value={userStatus}
                          disabled={!editMode}
                          exclusive
                          id="status"
                          aria-label="status-button-group"
                          onChange={handleUserStatus}
                        >
                          <ToggleButton
                            value="active"
                            aria-label="active"
                            style={{
                              borderRadius: "1em",
                              backgroundColor:
                                userStatus == "active" ? "#8cda8c" : "#e09494",
                            }}
                          >
                            {userStatus == "active" ? (
                              <PersonAddAlt1Icon
                                style={{
                                  opacity: userStatus == "active" ? 1 : 0.3,
                                  color:
                                    userStatus == "active"
                                      ? "#000"
                                      : userStatus == "inactive"
                                      ? "initial"
                                      : "",
                                }}
                              />
                            ) : (
                              <PersonAddDisabledIcon
                                style={{
                                  opacity: userStatus == "active" ? 0.3 : 1,
                                  color:
                                    userStatus == "active"
                                      ? "initial"
                                      : userStatus == "inactive"
                                      ? "#000"
                                      : "",
                                }}
                              />
                            )}
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12} md={9}>
                    {/* nested Container */}
                    <Grid container spacing={2}>
                      {/* <Grid item xs={12} > */}
                      <Grid
                        sx={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between",
                          paddingTop: 2,
                          paddingLeft: 2,
                          paddingRight: 1,
                          paddingBottom: 1,
                        }}
                      >
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 600, fontSize: "1.2em" }}
                          >
                            Edit
                          </Typography>
                          <EditSwitch
                            sx={{
                              transition: "2s ease-in-out",
                            }}
                            checked={editMode}
                            aria-label="edit-switch"
                            color="warning"
                            onChange={() => setEditMode(!editMode)}
                          />
                        </Box>
                        {/* <Box sx={{ marginTop: "5px" }}>
                          <Chip
                            disabled={!editMode}
                            size="small"
                            label={userVerification ? "verified" : "unverified"}
                            color={userVerification ? "primary" : "default"}
                            onClick={(e) =>
                              type != "profile" &&
                              handleUserVerification(
                                e,
                                userVerification ? false : true
                              )
                            }
                          />
                          <ToggleButtonGroup
                            value={userVerification}
                            disabled={!editMode}
                            exclusive
                            id="verification"
                            aria-label="verification-button-group"
                            onChange={
                              type != "profile"
                                ? handleUserVerification
                                : () => null
                            }
                            sx={{ verticalAlign: "middle" }}
                          >
                            <ToggleButton
                              value={true}
                              aria-label="verified"
                              style={{
                                display: "span",
                                padding: 0,
                                border: "none",
                                backgroundColor: "inherit",
                              }}
                            >
                              {userVerification ? (
                                <VerifiedUserIcon
                                  sx={{ color: "blue", width: "100%" }}
                                />
                              ) : (
                                <UnverifiedUserIcon
                                  sx={{ color: "black", width: "100%" }}
                                />
                              )}
                            </ToggleButton>
                          </ToggleButtonGroup>
                          {type != "profile" && (
                            <FormHelperText sx={{ fontSize: "0.5em" }}>
                              &nbsp; *click to change
                            </FormHelperText>
                          )}
                        </Box> */}
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="given-name"
                          size="small"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          name="name.first"
                          autoFocus={values?.name?.first ? false : true}
                          value={values?.name?.first}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            readOnly: !editMode,
                          }}
                          error={
                            touchedValue?.name?.first &&
                            errorsValue?.name?.first
                              ? true
                              : false
                          }
                          helperText={
                            touchedValue?.name?.first &&
                            errorsValue?.name?.first
                              ? errorsValue?.name?.first
                              : ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="given-name"
                          size="small"
                          name="name.last"
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          InputProps={{
                            readOnly: !editMode,
                          }}
                          value={values?.name?.last}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            touchedValue?.name?.last && errorsValue?.name?.last
                              ? true
                              : false
                          }
                          helperText={
                            touchedValue?.name?.last && errorsValue?.name?.last
                              ? errorsValue?.name?.last
                              : ""
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="mobile"
                          size="small"
                          name="mobile"
                          required
                          fullWidth
                          id="mobile"
                          label="Mobile"
                          // disabled={verifiedStatus && !editMode}
                          InputLabelProps={{
                            shrink:
                              activeElementId == "mobile"
                                ? true
                                : values?.mobile?.length != 0
                                ? true
                                : false,
                          }}
                          value={values?.mobile}
                          InputProps={{
                            readOnly: !editMode ? true : verifiedStatus,
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
                                  !verifiedStatus &&
                                  values?.mobile != checkMob ? (
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
                      {values?.mobile?.length == 10 && OTPStatus.showOTP && (
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
                            disabled={OTPStatus.OTP.length == 6 ? false : true}
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

                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="email"
                          size="small"
                          name="email"
                          required
                          fullWidth
                          id="email"
                          label="Email"
                          InputProps={{
                            readOnly: !editMode,
                          }}
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
                          type="date"
                          autoComplete="dob"
                          size="small"
                          name="dob"
                          required
                          fullWidth
                          disabled={!editMode}
                          id="dob"
                          label="Date of Birth"
                          InputProps={{
                            readOnly: !editMode,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={values?.dob?.toString().split("T")[0]}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={touched?.dob && errors?.dob ? true : false}
                          helperText={
                            touched?.dob && errors?.dob ? errors?.dob : ""
                          }
                        />
                      </Grid>

                      {type == "add" && (
                        <Grid item xs={12} md={6}>
                          <TextField
                            autoComplete="password"
                            size="small"
                            name="password"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            value={values?.password}
                            onFocus={() => setActiveElementId("password")}
                            onChange={handleChange}
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
                              readOnly: !editMode,
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
                      )}
                      <Grid item xs={12}>
                        <FormControl
                          fullWidth
                          required
                          disabled={!editMode}
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
                              control={
                                <Radio size="small" readOnly={!editMode} />
                              }
                              label="Female"
                            />
                            <FormControlLabel
                              value="other"
                              control={
                                <Radio size="small" readOnly={!editMode} />
                              }
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

                      {/* /// Address */}
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="street"
                          size="small"
                          name="address.street"
                          required
                          fullWidth
                          id="street"
                          label="Street"
                          InputProps={{
                            readOnly: !editMode,
                          }}
                          value={values?.address?.street}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            touchedValue?.address?.street &&
                            errorsValue?.address?.street
                              ? true
                              : false
                          }
                          helperText={
                            touchedValue?.address?.street &&
                            errorsValue?.address?.street
                              ? errorsValue?.address?.street
                              : ""
                          }
                        />
                      </Grid>

                      {/* // Address CountyStateCity.in */}
                      {/* <UserCountryState
                        values={values}
                        sendValues={getAddressData}
                        editMode={editMode}
                      /> */}

                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="pin"
                          size="small"
                          name="address.pincode"
                          required
                          fullWidth
                          id="pin"
                          label="Pin"
                          InputProps={{
                            readOnly: !editMode,
                          }}
                          value={values?.address?.pincode}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={
                            touchedValue?.address?.pincode &&
                            errorsValue?.address?.pincode
                              ? true
                              : false
                          }
                          helperText={
                            touchedValue?.address?.pincode &&
                            errorsValue?.address?.pincode
                              ? errorsValue?.address?.pincode
                              : ""
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* fullWidth item */}
                  <Grid
                    sx={{ display: "flex", justifyContent: "center" }}
                    item
                    xs={12}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={
                        !editMode
                          ? true
                          : values?.mobile == checkMob && isValid
                          ? false
                          : verifiedStatus && isValid
                          ? false
                          : true
                      }
                    >
                      {`${type == "add" ? "Add" : "Edit"} 
                      ${
                        type == "profile"
                          ? ""
                          : `${roleProps == "admin" ? "Admin" : "Customer"}`
                      }`}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Paper>
    </>
  );
};

export default UserForm;
