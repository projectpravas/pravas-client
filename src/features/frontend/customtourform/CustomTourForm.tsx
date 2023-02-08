import * as React from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import TextField from "@mui/material/TextField";
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
  meals: Array<string>;
  anythingElse: string;
}

const CustomTourForm: React.FunctionComponent<ICustomTourFormProps> = (
  props
) => {
  const { control, handleSubmit, register } = useForm<IFormInput>({
    defaultValues: {
      destinations: [{ place: "" }],
      travelDates: {
        from: undefined,
        to: undefined,
      },
      travelDuration: undefined,
      participants: [{ name: "", age: 0 }],
      hotelCategory: "",
      rooms: 1,
      meals: [],
      anythingElse: "",
    },
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
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="place"
                        key={field.id} // important to include key with field's id
                        {...register(`destinations.${index}.place` as const)}
                      />
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={5}>
                          <Button
                            fullWidth
                            variant="contained"
                            onClick={() => destinationsFa.append({ place: "" })}
                          >
                            Add
                          </Button>
                        </Grid>
                        <Grid item xs={12} md={5}>
                          <Button
                            fullWidth
                            variant="contained"
                            color="warning"
                            onClick={() => destinationsFa.remove(index)}
                          >
                            Remove
                          </Button>
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
                      {...field}
                    />
                  )}
                />
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
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={5}>
                          <Button
                            fullWidth
                            variant="contained"
                            onClick={() =>
                              participantsFa.append({ name: "", age: 0 })
                            }
                          >
                            Add
                          </Button>
                        </Grid>
                        <Grid item xs={12} md={5}>
                          <Button
                            fullWidth
                            variant="contained"
                            color="warning"
                            onClick={() => participantsFa.remove(index)}
                          >
                            Remove
                          </Button>
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
                <Controller
                  name="meals"
                  control={control}
                  render={({ field }) => (
                    <FormGroup {...field}>
                      <FormLabel id="demo-radio-buttons-group-label">
                        Meals
                      </FormLabel>
                      <FormControlLabel
                        {...register("meals")}
                        value="breakfast"
                        control={<Checkbox />}
                        label="Breakfast"
                      />
                      <FormControlLabel
                        {...register("meals")}
                        value="lunch"
                        control={<Checkbox name="meals.lunch" />}
                        label="Lunch"
                      />
                      <FormControlLabel
                        {...register("meals")}
                        value="dinner"
                        control={<Checkbox name="meals.dinner" />}
                        label="Dinner"
                      />
                    </FormGroup>
                  )}
                />
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
