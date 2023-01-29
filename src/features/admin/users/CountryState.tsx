import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import User from "../../../shared/models/userModel";
import FormHelperText from "@mui/material/FormHelperText";
// import CountryService from "../../../services/CountryStateService";
import { Formik } from "formik";
import * as yup from "yup";

interface IUserCountryStateProps {
  values: any;
  sendValues: any;
  editMode: boolean;
}

const addressYupValidationSchema = yup.object().shape({
  country: yup.string(),
  state: yup.string(),
  city: yup.string(),
});

interface CountryStateObj {
  iso2?: string;
  name?: string;
}

const countryStateInitialValues = {
  iso2: "",
  name: "",
};

const UserCountryState: React.FunctionComponent<IUserCountryStateProps> = ({
  values,
  sendValues,
  editMode,
}) => {
  //fetched values
  const [countries, setCountries] = useState([countryStateInitialValues]);
  const [states, setStates] = useState([countryStateInitialValues]);
  const [cities, setCities] = useState([{ name: "" }]);

  // user input values
  const [userCountry, setUserCountry] = useState("");
  const [userState, setUserState] = useState("");
  const [userCity, setUserCity] = useState("");

  // const loadCountryStateCity = async () => {
  //   //load Countries
  //   const countries = await CountryService.getAllCountries().then(
  //     (res) => res?.data
  //   );
  //   setCountries(countries);

  //   if (userCountry) {
  //     //load States
  //     const states = await CountryService.getAllStates(userCountry).then(
  //       (res) => res?.data
  //     );
  //     setStates(states);
  //   }

  //   if (userCountry && userState) {
  //     //load Cities
  //     const cities = await CountryService.getAllCities(
  //       userCountry,
  //       userState
  //     ).then((res) => res?.data);
  //     setCities(cities);
  //   }
  // };

  useEffect(() => {
    values?.address?.country && setUserCountry(values?.address?.country);
    values?.address?.state && setUserState(values?.address?.state);
    values?.address?.city && setUserCity(values?.address?.city);
  }, [values]);

  useEffect(() => {
    // loadCountryStateCity();
  }, [userCountry, userState, userCity]);

  return (
    <>
      <Formik
        initialValues={{
          country: userCountry,
          state: userState,
          city: userCity,
        }}
        validationSchema={addressYupValidationSchema}
        onSubmit={() => {}}
      >
        {({ touched, handleBlur }) => {
          return (
            <React.Fragment>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  required
                  error={touched?.country && !userCountry ? true : false}
                >
                  <InputLabel id="country-select-label" size="small">
                    Country
                  </InputLabel>

                  <Select
                    labelId="country-select-label"
                    id="country-select"
                    value={userCountry}
                    label="Country"
                    size="small"
                    name="country"
                    inputProps={{ readOnly: !editMode }}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setUserCountry(e?.target?.value);
                      sendValues("country", e?.target?.value);
                    }}
                  >
                    {/* // add Country */}

                    <MenuItem value={""}>None</MenuItem>
                    {Array.isArray(countries) &&
                      countries.map((country) => {
                        return (
                          <MenuItem key={country?.iso2} value={country?.iso2}>
                            {country?.name}
                          </MenuItem>
                        );
                      })}
                  </Select>

                  <FormHelperText>
                    {touched?.country && !userCountry
                      ? "Country is required"
                      : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  required
                  error={touched?.state && !userState ? true : false}
                >
                  <InputLabel id="state-select-label" size="small">
                    State
                  </InputLabel>
                  <Select
                    labelId="state-select-label"
                    id="state-select"
                    value={userState}
                    label="State"
                    name="state"
                    size="small"
                    inputProps={{ readOnly: !editMode }}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setUserState(e?.target?.value);
                      sendValues("state", e?.target?.value);
                    }}
                  >
                    {/* // add State */}
                    <MenuItem value={""}>None</MenuItem>
                    {Array.isArray(states) &&
                      states.map((state) => {
                        return (
                          <MenuItem key={state?.iso2} value={state?.iso2}>
                            {state?.name}
                          </MenuItem>
                        );
                      })}
                  </Select>

                  <FormHelperText>
                    {touched?.state && !userState ? "State is required" : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  required
                  error={touched?.city && !userCity ? true : false}
                >
                  <InputLabel id="city-select-label" size="small">
                    City
                  </InputLabel>
                  <Select
                    labelId="city-select-label"
                    id="city-select"
                    value={userCity}
                    label="City"
                    name="city"
                    size="small"
                    inputProps={{ readOnly: !editMode }}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setUserCity(e?.target?.value);
                      sendValues("city", e?.target?.value);
                    }}
                  >
                    {/* // add State */}
                    <MenuItem value={""}>None</MenuItem>
                    {Array.isArray(cities) &&
                      cities.map((city, i) => {
                        return (
                          <MenuItem
                            key={city?.name + "-" + i}
                            value={city?.name}
                          >
                            {city?.name}
                          </MenuItem>
                        );
                      })}
                  </Select>

                  <FormHelperText>
                    {touched?.city && !userCity ? "City is required" : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </React.Fragment>
          );
        }}
      </Formik>
    </>
  );
};

export default UserCountryState;
