import BolgModel from "../../models/blogModel";

const defineInitialBlog = ({
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
  const initialBlog: BolgModel = {};

  if (has_id) initialBlog._id = "";
  if (hasBlogId) initialBlog.blogId = NaN;
  if (hasTitle) initialBlog.title = "";
  if (hasRichText) initialBlog.richText = "";
  if (hasSeoTitle) initialBlog.seoTitle = "";
  if (hasMetaDescription) initialBlog.metaDescription = "";
  if (hasFocusKeyphrases) initialBlog.focusKeyphrases = "";
  if (hasSlug) initialBlog.slug = "";
  if (hasCategories) initialBlog.categories = [""];
  if (hasTags) initialBlog.tags = [""];
  if (hasImage) initialBlog.image = "";
  if (hasBlogStatus) initialBlog.blogStatus = false;

  return initialBlog;
};

export default defineInitialBlog;
