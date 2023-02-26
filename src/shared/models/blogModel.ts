interface BlogModel {
  _id?: string;
  blogId?: Number;
  title?: String;
  richText?: String;
  seoTitle?: String;
  metaDescription?: String;
  focusKeyphrases?: String;
  slug?: String;
  categories?: string[];
  tags?: string[];
  image?: string | File;
  blogStatus?: Boolean;
  creationDate?: Date | String;
}

export default BlogModel;
