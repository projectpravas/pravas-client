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
import { Formik } from "formik";

interface IAddBlogProps {}

const AddBlog: React.FunctionComponent<IAddBlogProps> = (props) => {
  // Image State
  const [product, setProduct] = React.useState("");
  const [previewImage, setPreviewImage] = React.useState("");

  // Tags State
  const [item, setItem] = React.useState<string>("");
  const [chipValue, setChipValue] = React.useState<string[]>([]);
  // Rich Text Editor State
  const [cat, setCat] = useState("");
  const [showCategory, setShowCategory] = useState([
    "Destination",
    "Place To Visit",
    "Best Time To Travel",
    "Experiance",
  ]);

  // Form Data
  const [formData, setFormData] = React.useState({
    title: "",
    richText: "",
    seoTitle: "",
    metaDescription: "",
    focusKeyphrases: "",
    slug: "",
    categories: [] as string[],
    tags: [] as string[],
    image: "",
  });
  // React.ChangeEvent<HTMLInputElement>
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e?.target;

    if (name == "tags") {
      setItem(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCategory = (e: any) => {
    const { name, checked } = e?.target;

    const catArr = formData?.categories;

    if (checked) {
      !catArr.includes(name as string) && catArr.push(name as string);
    } else {
      const index = catArr.findIndex((val) => val == name);

      index >= 0 && Array.isArray(catArr) && catArr.splice(index, 1);
    }
    setFormData({ ...formData, categories: catArr });
  };

  const addCategory = () => {
    const value: string = cat;
    const catArr = showCategory;

    const flag = catArr
      .filter((v) => v.toLowerCase())
      .includes(value.toLowerCase());

    if (!flag) {
      setShowCategory([...showCategory, value]);
    }
    setCat("");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    formData.tags = chipValue;
    formData.image = previewImage;

    console.log("formData: ", formData);
  };

  // chip Add method
  const additem = () => {
    if (
      !chipValue
        .filter((value) => value.toLowerCase())
        .includes(item.toLowerCase())
    )
      if (item) setChipValue([...chipValue, item.toLowerCase()]);
    setItem("");
  };

  // chip delete method
  const handleDelete = (chip: any) => {
    setChipValue(chipValue.filter((list) => list !== chip));
  };
  // Image method
  const handleImageChange = (e: any) => {
    const file = e?.target?.files[0];
    setProduct(file);
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

        {/* <Formik
          initialValues={{}}
          validationSchema={{}}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
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
              <form>
                

              </form>
            );
          }}
          
        </Formik> */}
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
                    // value={formData?.title}
                    name="title"
                    size="medium"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <RichTextEditor
                      setValue={setFormData}
                      formData={formData}
                    />
                  </div>
                  <div
                  // dangerouslySetInnerHTML={{ __html: formData?.richText }}
                  />
                  {/* <div>{value}</div> */}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="seoTitle"
                    variant="outlined"
                    type="text"
                    label="SEO Title"
                    fullWidth
                    // value={formData?.seoTitle}
                    name="seoTitle"
                    size="medium"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="metaDescription"
                    variant="outlined"
                    type="text"
                    label="meta Description"
                    fullWidth
                    // value={formData?.metaDescription}
                    name="metaDescription"
                    size="medium"
                    multiline
                    rows={2}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="focusKeyphrases"
                    variant="outlined"
                    type="text"
                    label="Focus KeyPhrases"
                    fullWidth
                    // value={formData?.focusKeyphrases}
                    name="focusKeyphrases"
                    size="medium"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="slug"
                    variant="outlined"
                    type="text"
                    label="Slug"
                    fullWidth
                    // value={formData?.slug}
                    name="slug"
                    size="medium"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* --------------------------------right section-------------------------- */}
            <Grid item xs={12} md={4}>
              <Grid container spacing={2}>
                {/* Category */}
                <Grid item xs={12} sm={6} md={12}>
                  <Paper
                    elevation={1}
                    sx={{
                      borderRadius: 4,
                      "&:hover": {
                        boxShadow: "0px 0px 20px -5px rgb(0 0 0 / 50%)",
                      },
                    }}
                  >
                    <Grid
                      container
                      sx={{
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        p: 2,
                      }}
                      spacing={1}
                    >
                      <Grid item xs={12}>
                        <Grid container spacing={1}>
                          <Grid item xs={9}>
                            <TextField
                              id="categoryAd"
                              variant="outlined"
                              type="text"
                              label="Add Category"
                              name="addCat"
                              value={cat}
                              size="small"
                              onChange={(e) => setCat(e?.target?.value)}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: "#27488d" }}
                              onClick={addCategory}
                            >
                              Add
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} alignSelf="start">
                        <FormControl
                          // sx={{ m: 2 }}
                          component="fieldset"
                          variant="standard"
                        >
                          <FormLabel
                            component="legend"
                            sx={{
                              fontSize: "1.25rem",
                              fontWeight: 500,
                            }}
                          >
                            Category
                          </FormLabel>
                          <FormGroup
                            onClick={(e) => {
                              handleCategory(e);
                            }}
                          >
                            {Array.isArray(showCategory) &&
                              showCategory.map((cat, i) => {
                                return (
                                  <FormControlLabel
                                    key={cat + "" + i}
                                    control={<Checkbox name={`${cat}`} />}
                                    label={cat}
                                    sx={{
                                      textTransform: "capitalize",
                                    }}
                                  />
                                );
                              })}
                          </FormGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                {/* Tags */}
                <Grid item xs={12} sm={6} md={12}>
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
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={3} md={3}>
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
                {/* Image */}
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
              onClick={handleSubmit}
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
