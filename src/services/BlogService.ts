import { AxiosResponse } from "axios";
import "../api/index";
import { API, endPoints } from "../api/index";
import BlogModel from "../shared/models/blogModel";

class BlogService {
  static createBlog(blog: FormData | BlogModel): Promise<AxiosResponse> {
    return API.post(endPoints.api.blog.create, blog);
  } //createBlog

  static updateBlog(
    id: string,
    blog: FormData | BlogModel
  ): Promise<AxiosResponse> {
    return API.put(endPoints.api.blog.update + id, blog);
  } //updateBlog

  static deleteBlog(id: string): Promise<AxiosResponse> {
    return API.delete(endPoints.api.blog.delete + id);
  } //deleteBlog

  static fetchOneBlog(id: string): Promise<AxiosResponse> {
    return API.get(endPoints.api.blog.getOne + id);
  } //fetchOneBlog

  static fetchAllBlogs(query = ""): Promise<AxiosResponse> {
    return API.get(endPoints.api.blog.getAll);
  } //fetchAllBlogs
}
export default BlogService;
