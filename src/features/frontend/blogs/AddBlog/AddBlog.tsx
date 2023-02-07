import {
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import * as React from "react";

interface IAddBlogProps {}

const AddBlog: React.FunctionComponent<IAddBlogProps> = (props) => {
  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {/* --------------------------------left section-------------------------- */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="title"
                  variant="outlined"
                  type="text"
                  label="Title"
                  fullWidth
                  name="title"
                  size="medium"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  variant="outlined"
                  type="text"
                  label="Description"
                  fullWidth
                  name="description"
                  size="medium"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="seoTitle"
                  variant="outlined"
                  type="text"
                  label="SEO Title"
                  fullWidth
                  name="seoTitle"
                  size="medium"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="metaDescription"
                  variant="outlined"
                  type="text"
                  label="meta Description"
                  fullWidth
                  name="metaDescription"
                  size="medium"
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="focus Keyphrases"
                  variant="outlined"
                  type="text"
                  label="Focus KeyPhrases"
                  fullWidth
                  name="focus Keyphrases"
                  size="medium"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="slug"
                  variant="outlined"
                  type="text"
                  label="Slug"
                  fullWidth
                  name="slug"
                  size="medium"
                />
              </Grid>
            </Grid>
          </Grid>
          {/* --------------------------------right section-------------------------- */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper
                  elevation={2}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <FormControl
                    sx={{ m: 2 }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">Category</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox name="gilad" />}
                        label="Gilad Gray"
                      />
                      <FormControlLabel
                        control={<Checkbox name="jason" />}
                        label="Jason Killian"
                      />
                      <FormControlLabel
                        control={<Checkbox name="antoine" />}
                        label="Antoine Llorca"
                      />
                    </FormGroup>
                  </FormControl>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={1}>
                  <TextField
                    id="tags"
                    variant="outlined"
                    type="text"
                    label="Tags"
                    fullWidth
                    name="tags"
                    size="medium"
                  />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={1}>
                  <TextField
                    id="image"
                    variant="outlined"
                    type="text"
                    label="Image"
                    fullWidth
                    name="image"
                    size="medium"
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AddBlog;
