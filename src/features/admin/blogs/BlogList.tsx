import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import BlogService from "../../../services/BlogService";
import BlogModel from "../../../shared/models/blogModel";
import EditIcon from "@mui/icons-material/Edit";
import AddToQueueRoundedIcon from "@mui/icons-material/AddToQueueRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

interface IBlogsProps {}

const BlogList: React.FunctionComponent<IBlogsProps> = (props) => {
  const [blogs, setBlogs] = useState<BlogModel[]>([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // handle add
  const handleAdd = () => {
    navigate(`${pathname}/add-edit/0/add/admin`);
  };
  // handle edit
  const handleEdit = (id: string) => {
    navigate(`${pathname}/add-edit/${id}/edit/admin`);
  };

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
            // Navigate(``);
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
          const blog: BlogModel = blogs[index];
          return (
            <Box sx={{ display: "flex" }}>
              <IconButton onClick={() => handleEdit(blog?._id as string)}>
                <EditIcon style={{ color: "#444" }} />
              </IconButton>
              <IconButton onClick={() => handleDelete(blog?._id as string)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          );
        },
      },
    },
  ];

  const options: object = {
    filterType: "dropdown",
    responsive: "standard",
    enableNestedDataAccess: ".",

    customToolbar: () => {
      return (
        <>
          <Tooltip title={`Add ${title.split(" ")[0]}`} placement="top">
            <IconButton onClick={() => handleAdd()}>
              <AddToQueueRoundedIcon
                sx={{ color: "#ff9800" }}
                fontSize="large"
              />
            </IconButton>
          </Tooltip>
        </>
      );
    },
  };
  return (
    <>
      {/* <h1>Blogs</h1> */}
      {/* <CustomTitle title="Blogs" /> */}
      <MUIDataTable
        title={title}
        columns={columns}
        data={blogs}
        options={options}
      />

      <Outlet />
    </>
  );
};

export default BlogList;
