import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import RichTextEditor from "./RichTextEditor";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

interface IAddBlogProps {}

const AddBlog: React.FunctionComponent<IAddBlogProps> = (props) => {
  // Image State
  const [product, setProduct] = React.useState({});
  const [previewImage, setPreviewImage] = React.useState("");
  // Tags State
  const [item, setItem] = React.useState<string>("");
  const [chipValue, setChipValue] = React.useState(["Pravas"]);
  // Rich Text Editor State
  const [value, setValue] = useState("");

  const additem = () => {
    setChipValue([...chipValue, item]);
    setItem("");
    console.log("ChipValue: ", chipValue);
  };

  const handleItem = (event: any) => {
    setItem(event.target.value);
  };

  const handleDelete = (chip: any) => {
    setChipValue(chipValue.filter((list) => list !== chip));
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
    // convert image to base64
    const render = new FileReader();

    render.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        setPreviewImage(render.result as string);
      },
      false
    );

    if (file) {
      render.readAsDataURL(file);
    }
  };

  return (
    <>
      <Container sx={{ my: 3 }}>
        <Grid container spacing={2} sx={{ pb: 2 }}>
          <Grid item>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              Post
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained">Add New</Button>
          </Grid>
        </Grid>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={4}>
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
                  <div>
                    <RichTextEditor setValue={setValue} />
                  </div>
                  {/* <div dangerouslySetInnerHTML={{ __html: value }} /> */}
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
                    elevation={1}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      borderRadius: 4,
                      "&:hover": {
                        boxShadow: "0px 0px 20px -5px rgb(0 0 0 / 50%)",
                      },
                    }}
                  >
                    <FormControl
                      sx={{ m: 3 }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormLabel
                        component="legend"
                        sx={{ fontSize: "1.25rem", fontWeight: 500 }}
                      >
                        Category
                      </FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox name="gilad" />}
                          label="Destination"
                        />
                        <FormControlLabel
                          control={<Checkbox name="jason" />}
                          label="Place To Visit"
                        />
                        <FormControlLabel
                          control={<Checkbox name="antoine" />}
                          label="Best Time To Travel"
                        />
                        <FormControlLabel
                          control={<Checkbox name="antoine" />}
                          label="Experiance"
                        />
                      </FormGroup>
                    </FormControl>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    elevation={1}
                    sx={{
                      borderRadius: 4,
                      "&:hover": {
                        boxShadow: "0px 0px 20px -5px rgb(0 0 0 / 50%)",
                      },
                    }}
                  >
                    <Box sx={{ p: 3 }}>
                      <Grid container spacing={1}>
                        <Grid item xs={9} md={9}>
                          <TextField
                            id="tags"
                            variant="outlined"
                            type="text"
                            label="Tags"
                            name="tags"
                            size="small"
                            value={item}
                            onChange={handleItem}
                          />
                        </Grid>
                        <Grid item xs={2} md={2}>
                          <Button
                            variant="contained"
                            onClick={additem}
                            sx={{ backgroundColor: "#27488d" }}
                          >
                            Add
                          </Button>
                        </Grid>
                      </Grid>
                      <Box>
                        {chipValue.map((chip, i) => {
                          return (
                            <Chip
                              sx={{
                                m: 1,
                                mx: "5px",
                                backgroundColor: "#f7a61e40",
                                color: "#9b3600",
                              }}
                              key={chip + i}
                              label={chip}
                              onDelete={(e) => handleDelete(chip)}
                            />
                          );
                        })}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    elevation={1}
                    sx={{
                      borderRadius: 4,
                      "&:hover": {
                        boxShadow: "0px 0px 20px -5px rgb(0 0 0 / 50%)",
                      },
                    }}
                  >
                    <Grid container sx={{ p: 3 }}>
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          textAlign="left"
                          sx={{ mb: 2 }}
                        >
                          Featured Image
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            position: "relative",
                            // height: 250,
                          }}
                        >
                          <img
                            style={{
                              width: "100%",
                              // height: "180px",
                              border: "1px solid #ececec",
                              borderRadius: 10,
                            }}
                            src={
                              previewImage ? previewImage : "./image-thumb.jpeg"
                            }
                          />
                          <label htmlFor="image">
                            <span
                              style={{
                                cursor: "pointer",
                                padding: "0px 5px",
                                position: "absolute",
                                top: 10,
                                right: 3,
                              }}
                            >
                              <FileUploadOutlinedIcon
                                sx={{
                                  borderRadius: "30%",
                                  color: "#fff",
                                  backgroundColor: "#27488d",
                                  p: "5px",
                                }}
                              />
                            </span>
                          </label>

                          <input
                            type="file"
                            id="image"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              type="submit"
              size="large"
              endIcon={<OpenInBrowserIcon />}
              sx={{ backgroundColor: "#27488d", mx: 2 }}
            >
              Publish
            </Button>
            <Button
              variant="contained"
              size="large"
              endIcon={<TimerOutlinedIcon />}
              sx={{ backgroundColor: "#f7a71e" }}
            >
              Schedule
            </Button>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default AddBlog;
