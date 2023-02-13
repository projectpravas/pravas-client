import * as yup from "yup";
import BolgModel from "../../models/blogModel";

const defineBlogYupSchema = ({
  has_id = false,
  hasBlogId = false,
  hasTitle = false,
  hasRichText = false,
  hasSeoTitle = false,
  hasMetaDescription = false,
  hasFocusKeyphrases = false,
  hasSlug = false,
  hasCategories = false,
  hasTags = false,
  hasImage = false,
  hasBlogStatus = false,
}) => {
  const initialBlog: any = {};

  if (hasBlogId)
    initialBlog.blogId = yup.number().required("Blob-Id is required");
  if (hasTitle) initialBlog.title = yup.string().required("Title is required");
  if (hasRichText)
    initialBlog.richText = yup.string().required("Rich-text is required");
  if (hasSeoTitle)
    initialBlog.seoTitle = yup.string().required("SEO title is required");
  if (hasMetaDescription)
    initialBlog.metaDescription = yup
      .string()
      .required("Meta-Description is required");
  if (hasFocusKeyphrases)
    initialBlog.focusKeyphrases = yup
      .string()
      .required("Focus-key-phrases is required");
  if (hasSlug) initialBlog.slug = yup.string().required("Slug is required");
  if (hasCategories)
    initialBlog.categories = yup.array().required("Categories are required");
  if (hasTags) initialBlog.tags = yup.array().required("Tags are required");
  if (hasImage) initialBlog.image = yup.string().required("Image is required");
  if (hasBlogStatus)
    initialBlog.blogStatus = yup.string().required("BlogStatus is required");

  return yup.object().shape(initialBlog);
};

export default defineBlogYupSchema;
