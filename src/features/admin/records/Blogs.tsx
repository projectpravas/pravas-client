import { Box, IconButton } from "@mui/material";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BlogService from "../../../services/BlogService";
import BlogModel from "../../../shared/models/blogModel";
import CustomTitle from "../../../ui/title/CustomTitle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

interface IBlogsProps {}

const Blogs: React.FunctionComponent<IBlogsProps> = (props) => {
  const [blogs, setBlogs] = useState<BlogModel[]>([]);

  const navigate = useNavigate();

  //handle delete
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result?.isConfirmed) {
        BlogService.deleteBlog(id)
          .then((res) => {
            Swal.fire("Deleted!", "Deleted successfully...", "success");
            loadBlogs();
            navigate(``);
          })
          .catch((err) => {
            console.error(err);
            const msg = err?.response?.data?.message || "Coudn't delete...";
            Swal.fire(
              "Coudn't Deleted!",
              "Couldn't Deleted successfully...",
              "error"
            );
          });
      }
    });
  };

  const loadBlogs = () => {
    BlogService.fetchAllBlogs()
      .then((res) => setBlogs(res?.data?.data))
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  console.log(blogs);

  const title = "Blogs";
  const columns = [
    {
      label: "Sr No",
      name: "blogId",
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (index: any) => index + 1,
      },
    },
    {
      label: "Title",
      name: "title",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: "Categories",
      name: "categories",
      options: {
        filter: true,
        sort: true,
        // customBodyRenderLite: () => {
        //   const value = blogs && blogs?.categories;
        //   return value;
        // },
      },
    },
    {
      label: "Actions",
      name: "actions",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (index: number) => {
          const tour: BlogModel = blogs[index];
          return (
            <Box sx={{ display: "flex" }}>
              <IconButton
              // onClick={() =>
              //   handleEdit(blog?._id as string, blog?.category || "")
              // }
              >
                <EditIcon style={{ color: "#444" }} />
              </IconButton>
              <IconButton onClick={() => handleDelete(tour?._id as string)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          );
        },
      },
    },
  ];
  return (
    <>
      {/* <h1>Blogs</h1> */}
      <CustomTitle title="Blogs" />
      <MUIDataTable title={title} columns={columns} data={blogs} />

      <Outlet />
    </>
  );
};

export default Blogs;
