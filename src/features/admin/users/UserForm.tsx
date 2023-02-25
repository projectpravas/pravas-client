import React, { useEffect, useState } from "react";
import { sendOTP, verifyOTP } from "../../../shared/firebase/firebaseConfig";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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
import { useLocation, useNavigate } from "react-router-dom";
import { createFD } from "./createFormData";
import getAge from "../../../shared/user-utilities/age-calculation";
import CustomTitle from "../../../ui/title/CustomTitle";

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
  const { pathname } = useLocation();
  const isAddingCustomer = pathname.split("/").includes("add");

  // yup schema and initial user
  const commonRequiredFields = {
    hasFirst: true,
    hasLast: true,
    hasMobile: true,
    hasEmail: true,
    hasDob: true,
    hasGender: true,
    hasDesignation: roleProps != "customer" ? true : false,
  };

  let initialUserObj = defineInitialUser({
    ...commonRequiredFields,
    hasStreet: true,
    hasCountry: true,
    hasState: true,
    hasCity: true,
    hasPincode: true,
    hasAvatar: true,
    hasStatus: true,
    hasRole: true,
  });

  const userValidationSchema = defineYupSchema({
    ...commonRequiredFields,
  });

  //states
  const [profilePic, setProfilePic] = useState<string>("");
  const [initialUser, setInitialUser] = useState<User>(initialUserObj);
  const [userStatus, setUserStatus] = useState(initialUserObj?.status);

  const [editMode, setEditMode] = useState(false);
  const [activeElementId, setActiveElementId] = useState("");
  const [age, setAge] = useState<Date | string | number>("");

  //mobile OTP timer
  const [OTPStatus, setOTPStatus] = useState({
    OTP: "",
    showOTP: false,
    sendOTP: false,
  });
  const [mobNumber, setMobNumber] = useState("");
  const [alternativeMobNumber, setAlternativeMobNumber] = useState("");
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

  const updateUser = (id: string, fd: FormData, resetForm: any) => {
    UserService.updateUser(id, fd)
      .then((res) => {
        const msg = res?.data?.message || "Updated successfully...";
        successToast(msg, 3000);
        setEditMode(false);
        type == "edit" && loadUser(id);
        resetForm();
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
        const msg = err?.response?.data?.message || "Couldn't updated..";
        errorToast(msg, 5000);
      });
  };

  const addUser = (fd: FormData, resetForm: any) => {
    UserService.createUser(fd)
      .then((res) => {
        const { _id, role } = res?.data?.data;
        const msg = res?.data?.message || "Created successfully...";
        successToast(msg, 3000);
        setEditMode(false);
        resetForm();
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
          if (i == key) {
            if (key == "mobile") {
              initialUserObj[key as keyof typeof currentUser] = value[0];
            } else {
              initialUserObj[key as keyof typeof currentUser] = value;
            }
          }
        });
      }
      // set Initial user as current user
      setInitialUser(initialUserObj);
      // setProfilePic and user status
      setUserStatus(currentUser?.status);
      setProfilePic(currentUser?.avatar as string);
      currentUser?.mobile && setMobNumber(currentUser?.mobile[0]);
      currentUser?.mobile && setAlternativeMobNumber(currentUser?.mobile[1]);
      currentUser?.mobile && setCheckMob(currentUser?.mobile[0]);
      setAge(getAge(initialUserObj?.dob as Date));
    } else {
      setInitialUser(initialUserObj);
      setUserStatus("active");
      setEditMode(true);
      setVerifiedStatus(true);
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
        <CustomTitle
          title={`${
            type == "profile"
              ? "My Profile"
              : type == "add"
              ? `Add ${roleProps == "admin" ? "Admin" : "Customer"}`
              : `${roleProps == "admin" ? "Admin" : "Customer"} Profile`
          }`}
        />
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
            const finalValues: any = values;
            if (finalValues?.role == "") finalValues.role = roleProps;
            if (finalValues?.mobile) {
              if (alternativeMobNumber) {
                finalValues.mobile &&
                  (finalValues.mobile = [mobNumber, alternativeMobNumber]);
              } else {
                finalValues.mobile && (finalValues.mobile = [mobNumber]);
              }
            }
            if (userStatus)
              finalValues?.status && (finalValues.status = userStatus);

            // console.log(finalValues);

            //create FormData
            const fd = createFD(finalValues);

            if (type == "edit" || type == "profile") {
              if (
                currentUser?.name?.first == finalValues?.name?.first &&
                currentUser?.name?.last == finalValues?.name?.last &&
                currentUser?.mobile == finalValues?.mobile &&
                currentUser?.email == finalValues?.email &&
                currentUser?.address?.street == finalValues?.address?.street &&
                currentUser?.address?.city == finalValues?.address?.city &&
                currentUser?.address?.state == finalValues?.address?.state &&
                currentUser?.address?.country ==
                  finalValues?.address?.country &&
                currentUser?.address?.pincode ==
                  finalValues?.address?.pincode &&
                currentUser?.dob == finalValues?.dob &&
                currentUser?.status == finalValues?.status &&
                currentUser?.avatar == finalValues?.avatar
              ) {
                successToast("Data have saved already", 3000);
                return;
              }
              {
                updateUser(currentUser?._id as string, fd, resetForm);
              }
            } else {
              values?.password &&
                fd.append("password", values?.password as string);

              addUser(fd, resetForm);
            }
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
                          {type == "add" ? (
                            ""
                          ) : (
                            <>
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
                            </>
                          )}
                        </Box>
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
                            readOnly: !editMode
                              ? true
                              : isAddingCustomer
                              ? false
                              : verifiedStatus,
                            startAdornment: !isAddingCustomer && (
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

                      {/* alternative mobile */}
                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="mobile"
                          size="small"
                          fullWidth
                          id="altMob"
                          label="Alternative Mobile"
                          InputLabelProps={{
                            shrink: alternativeMobNumber ? true : false,
                          }}
                          name="altMob"
                          value={alternativeMobNumber}
                          onBlur={handleBlur}
                          onChange={(e: any) =>
                            setAlternativeMobNumber(e?.target?.value)
                          }
                          InputProps={{
                            readOnly: !editMode,
                          }}
                        />
                      </Grid>

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

                      {roleProps != "customer" ? (
                        <Grid item xs={12} md={6}>
                          <TextField
                            autoComplete="designation"
                            size="small"
                            name="designation"
                            required
                            fullWidth
                            id="designation"
                            label="Designation"
                            InputProps={{
                              readOnly: !editMode,
                            }}
                            value={values?.designation}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              touched?.designation && errors?.designation
                                ? true
                                : false
                            }
                            helperText={
                              touched?.designation && errors?.designation
                                ? errors?.designation
                                : ""
                            }
                          />
                        </Grid>
                      ) : null}

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
                          onChange={(e: any) => {
                            handleChange(e);
                            setAge(getAge(e?.target?.value));
                          }}
                          error={touched?.dob && errors?.dob ? true : false}
                          helperText={
                            touched?.dob && errors?.dob ? errors?.dob : ""
                          }
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="age"
                          size="small"
                          name="age"
                          InputProps={{
                            readOnly: true,
                          }}
                          fullWidth
                          id="age"
                          label="Age"
                          value={age}
                        />
                      </Grid>

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
                        <Typography component="h5" sx={{ m: "16px 0px" }}>
                          Address:
                        </Typography>
                        <TextField
                          autoComplete="street"
                          size="small"
                          name="address.street"
                          fullWidth
                          id="street"
                          label="Street"
                          InputProps={{
                            readOnly: !editMode,
                          }}
                          value={values?.address?.street}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          autoComplete="city"
                          size="small"
                          name="address.city"
                          fullWidth
                          id="city"
                          label="City"
                          InputProps={{
                            readOnly: !editMode,
                          }}
                          value={values?.address?.city}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          autoComplete="state"
                          size="small"
                          name="address.state"
                          fullWidth
                          id="state"
                          label="State"
                          InputProps={{
                            readOnly: !editMode,
                          }}
                          value={values?.address?.state}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          autoComplete="country"
                          size="small"
                          name="address.country"
                          fullWidth
                          id="country"
                          label="Country"
                          InputProps={{
                            readOnly: !editMode,
                          }}
                          value={values?.address?.country}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          autoComplete="pin"
                          size="small"
                          name="address.pincode"
                          fullWidth
                          id="pin"
                          label="Pin"
                          InputProps={{
                            readOnly: !editMode,
                          }}
                          value={values?.address?.pincode}
                          onBlur={handleBlur}
                          onChange={handleChange}
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
                          ? isAddingCustomer
                            ? !dirty
                            : false
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
