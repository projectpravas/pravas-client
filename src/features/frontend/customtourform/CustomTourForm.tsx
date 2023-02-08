import * as React from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
  useFormState,
} from "react-hook-form";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { Accordion } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { Typography } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    destinations: yup.array().of(
      yup.object().shape({
        place: yup
          .string()
          .required("Place is required")
          .min(3, "min 3 characters required"),
      })
    ),
    travelDates: yup.object().shape({
      from: yup.date(),
      to: yup.date().min(yup.ref("from"), "Nashedi ho kya?"),
    }),

    travelDuration: yup
      .number()
      .typeError("Days must be a number")
      .required("Days are required")
      .min(1, "min 1 day required "),

    participants: yup.array().of(
      yup.object().shape({
        name: yup
          .string()
          .required("Name is required")
          .min(3, "min 3 characters required"),
        age: yup
          .number()
          .typeError("Age must be a number")
          .required("Age is required")
          .min(1, "min value of age is 1 "),
      })
    ),

    rooms: yup
      .number()
      .typeError("Rooms must be a number")
      .min(1, "min value of room is 1"),
    anythingElse: yup
      .string()
      .min(3, "min 3 characters required")
      .max(45, "max 45 characters allowed"),
  })
  .required();

interface ICustomTourFormProps {}

interface IFormInput {
  destinations: {
    place: string;
  }[];
  travelDates: {
    from: string;
    to: string;
  };
  travelDuration: number;
  participants: {
    name: string;
    age: number;
  }[];
  hotelCategory: "";
  rooms: number;
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  anythingElse: string;
}

const CustomTourForm: React.FunctionComponent<ICustomTourFormProps> = (
  props
) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: {
      destinations: [{ place: "" }],
      travelDates: {
        from: new Date().toISOString().slice(0, 10),
        to: new Date().toISOString().slice(0, 10),
      },
      travelDuration: 0,
      participants: [{ name: "", age: 0 }],
      hotelCategory: "",
      rooms: 1,
      meals: {
        breakfast: false,
        lunch: false,
        dinner: false,
      },
      anythingElse: "",
    },
  });

  const { touchedFields } = useFormState({
    control,
  });
  //   { fields, append, prepend, remove, swap, move, insert }
  const destinationsFa = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "destinations", // unique name for your Field Array
  });

  const participantsFa = useFieldArray({
    control,
    name: "participants",
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
  return (
    <>
      <h2>Custom Tour</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Destinations */}
        <Accordion defaultExpanded sx={{ marginBottom: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Destinations</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {destinationsFa.fields.map((field, index) => (
                  <Grid container spacing={2} key={field.id} marginBottom={2}>
                    <Grid item xs={12} md={2}>
                      <Controller
                        name="destinations"
                        control={control}
                        render={() => (
                          <TextField
                            {...field}
                            fullWidth
                            size="small"
                            placeholder="place"
                            label="Place"
                            {...register(
                              `destinations.${index}.place` as const
                            )}
                            error={
                              touchedFields?.destinations?.[index]?.place &&
                              errors?.destinations?.[index]?.place?.message
                                ? true
                                : false
                            }
                            helperText={
                              touchedFields?.destinations?.[index]?.place &&
                              errors?.destinations?.[index]?.place?.message
                                ? errors?.destinations?.[index]?.place?.message
                                : ""
                            }
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={2}>
                          <IconButton
                            disabled={destinationsFa.fields.length == 1}
                            onClick={() => destinationsFa.remove(index)}
                          >
                            <ClearIcon />
                          </IconButton>
                        </Grid>
                        <Grid item xs={6} md={2}>
                          {destinationsFa.fields.length == index + 1 && (
                            <IconButton
                              color="primary"
                              onClick={() =>
                                destinationsFa.append({ place: "" })
                              }
                            >
                              <AddIcon />
                            </IconButton>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* duration */}
        <Accordion defaultExpanded sx={{ marginBottom: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Dates/Duration</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Controller
                  name="travelDates.from"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      margin="normal"
                      size="small"
                      type="date"
                      label="From"
                      {...field}
                      InputLabelProps={{ shrink: true }}
                      error={
                        touchedFields?.travelDates?.from &&
                        errors?.travelDates?.from?.message
                          ? true
                          : false
                      }
                      helperText={
                        touchedFields?.travelDates?.from &&
                        errors?.travelDates?.from?.message
                          ? errors?.travelDates?.from?.message
                          : ""
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="travelDates.to"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      margin="normal"
                      size="small"
                      type="date"
                      label="To"
                      InputLabelProps={{ shrink: true }}
                      {...field}
                      error={
                        touchedFields?.travelDates?.to &&
                        errors?.travelDates?.to?.message
                          ? true
                          : false
                      }
                      helperText={
                        touchedFields?.travelDates?.to &&
                        errors?.travelDates?.to?.message
                          ? errors?.travelDates?.to?.message
                          : ""
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>OR</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="travelDuration"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      margin="normal"
                      size="small"
                      type="text"
                      label="Days"
                      {...field}
                      error={
                        touchedFields?.travelDuration &&
                        errors?.travelDuration?.message
                          ? true
                          : false
                      }
                      helperText={
                        touchedFields?.travelDuration &&
                        errors?.travelDuration?.message
                          ? errors?.travelDuration?.message
                          : ""
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* participants */}
        <Accordion defaultExpanded sx={{ marginBottom: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> Participants</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                {participantsFa.fields.map((field, index) => (
                  <Grid
                    container
                    spacing={2}
                    key={field.id}
                    sx={{ marginBottom: 2 }}
                  >
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Name"
                        placeholder="Name"
                        // important to include key with field's id
                        {...register(`participants.${index}.name` as const)}
                        error={
                          touchedFields?.participants?.[index]?.name &&
                          errors?.participants?.[index]?.name?.message
                            ? true
                            : false
                        }
                        helperText={
                          touchedFields?.participants?.[index]?.name &&
                          errors?.participants?.[index]?.name?.message
                            ? errors?.participants?.[index]?.name?.message
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Age"
                        placeholder="Age"
                        // important to include key with field's id
                        {...register(`participants.${index}.age` as const)}
                        error={
                          touchedFields?.participants?.[index]?.age &&
                          errors?.participants?.[index]?.age?.message
                            ? true
                            : false
                        }
                        helperText={
                          touchedFields?.participants?.[index]?.age &&
                          errors?.participants?.[index]?.age?.message
                            ? errors?.participants?.[index]?.age?.message
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={2}>
                          <IconButton
                            disabled={participantsFa.fields.length == 1}
                            onClick={() => participantsFa.remove(index)}
                          >
                            <ClearIcon />
                          </IconButton>
                        </Grid>
                        <Grid item xs={6} md={2}>
                          {participantsFa.fields.length == index + 1 && (
                            <IconButton
                              color="primary"
                              onClick={() =>
                                participantsFa.append({ name: "", age: 0 })
                              }
                            >
                              <AddIcon />
                            </IconButton>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* hotel Category */}
        <Accordion defaultExpanded sx={{ marginBottom: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Hotel Category</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Controller
                  name="hotelCategory"
                  control={control}
                  render={({ field }) => (
                    <>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Hotel
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        {...field}
                      >
                        <FormControlLabel
                          value="3 star"
                          control={<Radio />}
                          label="3 star"
                        />
                        <FormControlLabel
                          value="4 star"
                          control={<Radio />}
                          label="4 star"
                        />
                        <FormControlLabel
                          value="5 star"
                          control={<Radio />}
                          label="5 star"
                        />
                      </RadioGroup>
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormGroup>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Meals
                  </FormLabel>
                  <Controller
                    name="meals.breakfast"
                    control={control}
                    render={({ field }) => (
                      <>
                        <FormControlLabel
                          {...field}
                          control={<Checkbox />}
                          label="Breakfast"
                        />
                      </>
                    )}
                  />
                  <Controller
                    name="meals.lunch"
                    control={control}
                    render={({ field }) => (
                      <>
                        <FormControlLabel
                          {...field}
                          control={<Checkbox />}
                          label="Lunch"
                        />
                      </>
                    )}
                  />
                  <Controller
                    name="meals.dinner"
                    control={control}
                    render={({ field }) => (
                      <>
                        <FormControlLabel
                          {...field}
                          control={<Checkbox />}
                          label="Dinner"
                        />
                      </>
                    )}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="rooms"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      margin="normal"
                      size="small"
                      type="text"
                      label="Rooms"
                      {...field}
                      error={
                        touchedFields?.rooms && errors?.rooms?.message
                          ? true
                          : false
                      }
                      helperText={
                        touchedFields?.rooms && errors?.rooms?.message
                          ? errors?.rooms?.message
                          : ""
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Anything Else */}

        <Accordion defaultExpanded sx={{ marginBottom: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Anything Else</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="anythingElse"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      multiline
                      minRows={5}
                      margin="normal"
                      type="text"
                      label="Anything Else"
                      {...field}
                      error={
                        touchedFields?.anythingElse &&
                        errors?.anythingElse?.message
                          ? true
                          : false
                      }
                      helperText={
                        touchedFields?.anythingElse &&
                        errors?.anythingElse?.message
                          ? errors?.anythingElse?.message
                          : ""
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </>
  );
};

export default CustomTourForm;

{
  /* <TextField
  {...field}
  fullWidth
  size="small"
  placeholder="place"
  error={!!errors?.destinations}
  helperText={errors?.destinations && `${errors.destinations?.message}`}
  key={field.id} // important to include key with field's id
  {...register(`destinations.${index}.place` as const)}
/>; */
}
