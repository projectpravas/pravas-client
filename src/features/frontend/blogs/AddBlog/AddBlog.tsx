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
import defineInitialBlog from "../../../../shared/yup-validations/blog-validation/initialBlog";
import defineBlogYupSchema from "../../../../shared/yup-validations/blog-validation/blogYupValidation";
import BolgModel from "../../../../shared/models/blogModel";
import { errorToast, successToast } from "../../../../ui/toast/Toast";
import BlogService from "../../../../services/BlogService";

interface IAddBlogProps {}

interface customTouchedInterface {
  category?: boolean;
  keyPhases?: boolean;
  tags?: boolean;
}

const commonObj = {
  hasTitle: true,
  hasSeoTitle: true,
  hasMetaDescription: true,
  hasSlug: true,
};

const initialBlog = defineInitialBlog({
  ...commonObj,
  hasFocusKeyphrases: true,
  hasRichText: true,
  hasCategories: true,
  hasTags: true,
  hasImage: true,
});
const blogSchema = defineBlogYupSchema({ ...commonObj });

const AddBlog: React.FunctionComponent<IAddBlogProps> = (props) => {
  //  touched state
  const [customTouched, setCustomTouched] = useState<customTouchedInterface>({
    category: false,
    keyPhases: false,
    tags: false,
  });

  //  touched state
  const [customErrors, setCustomErrors] = useState<customTouchedInterface>({
    category: false,
    keyPhases: false,
    tags: false,
  });

  // Image State
  const [product, setProduct] = React.useState("");
  const [previewImage, setPreviewImage] = React.useState("");

  // Tags State
  const [item, setItem] = React.useState<string>("");
  const [chipValue, setChipValue] = React.useState<string[]>([]);

  // KeyPhrases
  const [keyPhrase, setKeyPhrase] = React.useState<string>("");
  const [keyPhraseChipValue, setKeyPhraseChipValue] = React.useState<string[]>(
    []
  );

  // Rich Text Editor State
  const [cat, setCat] = useState("");
  const [showCategory, setShowCategory] = useState([
    "Destination",
    "Place To Visit",
    "Best Time To Travel",
    "Experiance",
  ]);

  // Form Data
  const [formData, setFormData] = React.useState<BolgModel>({
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

  const customHandleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e?.target;

    if (name == "tags") {
      setItem(value);
    } else if (name == "focusKeyphrases") {
      setKeyPhrase(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Catrgory
  const handleCategory = (e: any) => {
    const { name, checked } = e?.target;

    const catArr: any = formData?.categories;

    if (checked) {
      !catArr.includes(name as string) && catArr.push(name as string);
    } else {
      const index = catArr.findIndex((val: any) => val == name);

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

  // chip Add and keyPhrase chip Add method
  const additem = (label: string) => {
    let chipValueArr: string[] = [];
    let chipVal = "";

    if (label == "tag") {
      chipValueArr = chipValue;
      chipVal = item;
    } else if (label == "focusKeyphrases") {
      chipValueArr = keyPhraseChipValue;
      chipVal = keyPhrase;
    }

    if (chipVal == "") return;
    let newArr: any[] = [];

    if (
      !chipValueArr
        .filter((value) => value.toLowerCase())
        .includes(chipVal.toLowerCase())
    )
      newArr = [...chipValueArr, chipVal.toLowerCase()];
    else newArr = chipValueArr;

    if (label == "tag") {
      setChipValue(newArr);
      setItem("");
    } else if (label == "focusKeyphrases") {
      setKeyPhraseChipValue(newArr);
      setKeyPhrase("");
    }
  };

  // chip delete method
  const handleTagChipDelete = (chip: any) => {
    setChipValue(chipValue.filter((list) => list !== chip));
  };

  // keyPhrase chip delete method
  const handleKeyPhraseChipDelete = (chip: any) => {
    setKeyPhraseChipValue(keyPhraseChipValue.filter((list) => list !== chip));
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

  const customHandleBlur = (label: "category" | "keyPhases" | "tags") => {
    if (!customTouched[label]) {
      setCustomTouched({
        ...customTouched,
        [label]: true,
      });
      setCustomErrors({
        ...customErrors,
        [label]: true,
      });
    } else {
      setCustomErrors({
        ...customErrors,
        [label]: false,
      });
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

        <Formik
          initialValues={initialBlog}
          enableReinitialize
          validationSchema={blogSchema}
          onSubmit={(values, { resetForm }) => {
            formData.tags = chipValue;
            formData.focusKeyphrases = keyPhraseChipValue?.join(", ");

            const fd = new FormData();

            if (formData?.title) fd.append("title", formData?.title as string);
            if (formData?.richText)
              fd.append("richText", formData?.richText as string);
            if (formData?.seoTitle)
              fd.append("seoTitle", formData?.seoTitle as string);
            if (formData?.metaDescription)
              fd.append("metaDescription", formData?.metaDescription as string);
            if (formData?.focusKeyphrases)
              fd.append("focusKeyphrases", formData?.focusKeyphrases as string);
            if (formData?.slug) fd.append("slug", formData?.slug as string);
            if (formData?.categories)
              fd.append("categories", JSON.stringify(formData?.categories));
            if (formData?.tags)
              fd.append("tags", JSON.stringify(formData?.tags));
            if (formData?.image) fd.append("image", formData?.image as string);

            BlogService.createBlog(fd)
              .then((res) => {
                const msg = res?.data?.message || "Blog created successfully..";
                successToast(msg, 3000);
                resetForm(initialBlog as any);
              })
              .catch((err) => {
                console.error(err);
                const msg =
                  err?.response?.data?.message || "Blog couldn't created..";
                errorToast(msg, 5000);
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
            return (
              <form onSubmit={handleSubmit}>
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
                            autoFocus
                            value={formData?.title}
                            name="title"
                            size="small"
                            required
                            onChange={(e) => {
                              handleChange(e);
                              customHandleChange(e);
                            }}
                            onBlur={handleBlur}
                            error={
                              touched?.title && errors?.title ? true : false
                            }
                            helperText={
                              touched?.title && errors?.title
                                ? errors?.title
                                : ""
                            }
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
                            value={formData?.seoTitle}
                            name="seoTitle"
                            size="small"
                            required
                            onChange={(e) => {
                              handleChange(e);
                              customHandleChange(e);
                            }}
                            onBlur={handleBlur}
                            error={
                              touched?.seoTitle && errors?.seoTitle
                                ? true
                                : false
                            }
                            helperText={
                              touched?.seoTitle && errors?.seoTitle
                                ? errors?.seoTitle
                                : ""
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="metaDescription"
                            variant="outlined"
                            type="text"
                            label="meta Description"
                            fullWidth
                            value={formData?.metaDescription}
                            name="metaDescription"
                            size="small"
                            required
                            multiline
                            rows={2}
                            onChange={(e) => {
                              handleChange(e);
                              customHandleChange(e);
                            }}
                            onBlur={handleBlur}
                            error={
                              touched?.metaDescription &&
                              errors?.metaDescription
                                ? true
                                : false
                            }
                            helperText={
                              touched?.metaDescription &&
                              errors?.metaDescription
                                ? errors?.metaDescription
                                : ""
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={10} md={10}>
                              <TextField
                                id="focusKeyphrases"
                                variant="outlined"
                                type="text"
                                fullWidth
                                label="Focus KeyPhrases"
                                name="focusKeyphrases"
                                size="small"
                                value={keyPhrase}
                                onChange={(e) => {
                                  handleChange(e);
                                  customHandleChange(e);
                                }}
                                onBlur={() =>
                                  keyPhraseChipValue?.length <= 0 &&
                                  keyPhrase == "" &&
                                  customHandleBlur("keyPhases")
                                }
                                error={
                                  customTouched?.keyPhases &&
                                  keyPhraseChipValue?.length <= 0
                                    ? true
                                    : false
                                }
                                helperText={
                                  keyPhraseChipValue?.length <= 0 &&
                                  customErrors?.keyPhases
                                    ? "Focus-key-phrase required"
                                    : ""
                                }
                              />
                            </Grid>
                            <Grid item xs={2} md={2} textAlign="center">
                              <Button
                                variant="contained"
                                onClick={() => additem("focusKeyphrases")}
                                sx={{ backgroundColor: "#27488d" }}
                              >
                                Add
                              </Button>
                            </Grid>
                          </Grid>

                          <Box>
                            {keyPhraseChipValue.map((chip, i) => {
                              return (
                                <Chip
                                  sx={{
                                    m: 1,
                                    mx: "5px",
                                    backgroundColor: "#b3e4e4",
                                    // backgroundColor: "#f7a61e40",
                                    color: "#000",
                                    // color: "#9b3600",
                                  }}
                                  key={chip + i}
                                  label={chip}
                                  onDelete={(e) =>
                                    handleKeyPhraseChipDelete(chip)
                                  }
                                />
                              );
                            })}
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="slug"
                            variant="outlined"
                            type="text"
                            label="Slug"
                            fullWidth
                            value={formData?.slug}
                            name="slug"
                            size="small"
                            required
                            onChange={(e) => {
                              handleChange(e);
                              customHandleChange(e);
                            }}
                            onBlur={handleBlur}
                            error={touched?.slug && errors?.slug ? true : false}
                            helperText={
                              touched?.slug && errors?.slug ? errors?.slug : ""
                            }
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
                                      onBlur={() =>
                                        formData?.categories &&
                                        formData?.categories.length <= 0 &&
                                        customHandleBlur("category")
                                      }
                                      error={
                                        customTouched?.category &&
                                        formData?.categories &&
                                        formData?.categories.length <= 0
                                          ? true
                                          : false
                                      }
                                      helperText={
                                        formData?.categories &&
                                        formData?.categories.length <= 0 &&
                                        customErrors?.category
                                          ? "Categories are required"
                                          : ""
                                      }
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
                                            control={
                                              <Checkbox name={`${cat}`} />
                                            }
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
                                    onChange={(e) => {
                                      handleChange(e);
                                      customHandleChange(e);
                                    }}
                                    onBlur={() =>
                                      chipValue?.length <= 0 &&
                                      item == "" &&
                                      customHandleBlur("tags")
                                    }
                                    error={
                                      customTouched?.tags &&
                                      chipValue?.length <= 0
                                        ? true
                                        : false
                                    }
                                    helperText={
                                      chipValue?.length <= 0 &&
                                      customTouched?.tags
                                        ? "Tags are required"
                                        : ""
                                    }
                                  />
                                </Grid>
                                <Grid item xs={3} md={3}>
                                  <Button
                                    variant="contained"
                                    onClick={() => additem("tag")}
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
                                        backgroundColor: "#b3e4e4",
                                        // backgroundColor: "#f7a61e40",
                                        color: "#000",
                                        // color: "#9b3600",
                                      }}
                                      key={chip + i}
                                      label={chip}
                                      onDelete={(e) =>
                                        handleTagChipDelete(chip)
                                      }
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
                                  }}
                                >
                                  <img
                                    style={{
                                      width: "100%",
                                      border: "1px solid #ececec",
                                      borderRadius: 10,
                                    }}
                                    src={
                                      previewImage
                                        ? previewImage
                                        : "./image-thumb.jpeg"
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
                                    onChange={(e) => {
                                      handleImageChange(e);
                                      const file = e?.target?.files
                                        ? e?.target?.files[0]
                                        : "";
                                      formData.image = file;
                                    }}
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
                    <span
                      style={{
                        cursor:
                          formData?.title != "" &&
                          keyPhraseChipValue?.length >= 0 &&
                          formData?.categories &&
                          formData?.categories?.length >= 0 &&
                          chipValue?.length >= 0 &&
                          formData?.image != "" &&
                          formData?.richText != ""
                            ? isValid
                              ? "not-allowed"
                              : "default"
                            : "default",
                      }}
                    >
                      <Button
                        variant="contained"
                        type="submit"
                        size="large"
                        disabled={
                          formData?.title != "" &&
                          keyPhraseChipValue?.length >= 0 &&
                          formData?.categories &&
                          formData?.categories?.length >= 0 &&
                          chipValue?.length >= 0 &&
                          formData?.image != "" &&
                          formData?.richText != ""
                            ? isValid
                              ? false
                              : true
                            : true
                        }
                        endIcon={<OpenInBrowserIcon />}
                        sx={{ backgroundColor: "#27488d", mx: 2 }}
                      >
                        Publish
                      </Button>
                      {/* <Button
                        variant="contained"
                        type="submit"
                        size="large"
                        disabled={
                          formData?.title != "" &&
                          keyPhraseChipValue?.length >= 0 &&
                          formData?.categories &&
                          formData?.categories?.length >= 0 &&
                          chipValue?.length >= 0 &&
                          formData?.image != "" &&
                          formData?.richText != ""
                            ? isValid
                              ? false
                              : true
                            : true
                        }
                        endIcon={<TimerOutlinedIcon />}
                        sx={{ backgroundColor: "#f7a71e" }}
                      >
                        Schedule
                      </Button> */}
                    </span>
                  </Grid>
                </Paper>
              </form>
            );
          }}
        </Formik>
      </Container>
    </>
  );
};

export default AddBlog;
